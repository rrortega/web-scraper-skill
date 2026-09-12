// Prerequisites:
//   Node.js 18+; for browser escalation run `npm install playwright` in a package project.
//   Start Obscura separately only when browser escalation is expected:
//   obscura serve --port 9222
// Setup: TARGET_URL and FIELD_TEXT describe an authorized Phase 0 check.
// BROWSER_SELECTOR must be a selector already hypothesized for the missing field.

function parseUrl(value, base) {
  try {
    return new URL(value, base);
  } catch (error) {
    throw new Error(`Invalid URL: ${value}`, { cause: error });
  }
}

const target = parseUrl(process.env.TARGET_URL ?? "https://example.com");
const fieldText = process.env.FIELD_TEXT ?? "Example Domain";
const response = await fetch(target, {
  redirect: "follow",
  signal: AbortSignal.timeout(15_000),
});
const html = await response.text();

const report = {
  phase0: {
    status: response.status,
    finalUrl: response.url,
    fieldCovered: html.includes(fieldText),
  },
  escalated: false,
};

if (!report.phase0.fieldCovered) {
  const selector = process.env.BROWSER_SELECTOR;
  if (!selector)
    throw new Error(
      "Phase 0 missed the field; provide a validated BROWSER_SELECTOR to permit bounded escalation",
    );

  const { chromium } = await import("playwright");
  const browser = await chromium.connectOverCDP("ws://127.0.0.1:9222");
  const context = browser.contexts()[0] ?? (await browser.newContext());
  const page = context.pages()[0] ?? (await context.newPage());
  await page.goto(target.href, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });

  const locator = page.locator(selector);
  const count = await locator.count();
  if (count !== 1)
    throw new Error(
      `Selector validation expected one match, received ${count}`,
    );
  const value = (await locator.textContent())?.trim();
  if (!value) throw new Error("Selector matched but returned no text");

  report.escalated = true;
  report.browser = { selector, count, valueType: typeof value };
  await browser.close();
}

console.log(JSON.stringify(report, null, 2));
