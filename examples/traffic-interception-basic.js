// Prerequisites:
//   1. Create a package manifest and run: npm install playwright
//   2. Start Obscura separately: obscura serve --port 9222
// Setup: TARGET_URL must be authorized. Events are bounded to its origin and XHR/fetch.

import { chromium } from "playwright";

function parseUrl(value, base) {
  try {
    return new URL(value, base);
  } catch (error) {
    throw new Error(`Invalid URL: ${value}`, { cause: error });
  }
}

const target = parseUrl(process.env.TARGET_URL ?? "https://example.com");
const browser = await chromium.connectOverCDP("ws://127.0.0.1:9222");
const context = browser.contexts()[0] ?? (await browser.newContext());
const page = context.pages()[0] ?? (await context.newPage());
const observations = [];
const secretHeaders = new Set([
  "authorization",
  "cookie",
  "proxy-authorization",
]);

function endpointShape(rawUrl) {
  const url = parseUrl(rawUrl);
  return {
    origin: url.origin,
    path: url.pathname,
    queryKeys: [...url.searchParams.keys()].sort(),
  };
}

function bodyShape(value, depth = 0) {
  if (depth > 2) return typeof value;
  if (Array.isArray(value))
    return {
      type: "array",
      length: value.length,
      item: value.length ? bodyShape(value[0], depth + 1) : null,
    };
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .slice(0, 30)
        .map(([key, item]) => [key, bodyShape(item, depth + 1)]),
    );
  }
  return value === null ? "null" : typeof value;
}

page.on("request", (request) => {
  const url = parseUrl(request.url());
  if (
    url.origin !== target.origin ||
    !["xhr", "fetch"].includes(request.resourceType())
  )
    return;
  const headers = request.headers();
  observations.push({
    event: "request",
    method: request.method(),
    ...endpointShape(request.url()),
    authPresent: Boolean(headers.authorization || headers.cookie),
    headerNames: Object.keys(headers)
      .map((name) => (secretHeaders.has(name) ? `${name}:redacted` : name))
      .sort(),
  });
});

page.on("response", async (response) => {
  const request = response.request();
  const url = parseUrl(response.url());
  if (
    url.origin !== target.origin ||
    !["xhr", "fetch"].includes(request.resourceType())
  )
    return;
  const type = response.headers()["content-type"] ?? "";
  const item = {
    event: "response",
    status: response.status(),
    contentType: type.split(";")[0],
    ...endpointShape(response.url()),
  };
  if (type.includes("application/json")) {
    try {
      item.bodyShape = bodyShape(await response.json());
    } catch {
      item.bodyShape = "unavailable";
    }
  }
  observations.push(item);
});

await page.goto(target.href, {
  waitUntil: "domcontentloaded",
  timeout: 30_000,
});
await page.waitForTimeout(2_000);
console.log(JSON.stringify(observations, null, 2));
await browser.close(); // Disconnects Playwright; the Obscura server keeps running.
