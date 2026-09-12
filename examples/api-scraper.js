// Prerequisites: Node.js 18+. No packages required.
// Setup: API_URL must identify an authorized public JSON endpoint.
// Optional JSON_PATH is dot-separated; PAGE_PARAM enables a two-page validation.

function parseUrl(value, base) {
  try {
    return new URL(value, base);
  } catch (error) {
    throw new Error(`Invalid URL: ${value}`, { cause: error });
  }
}

const endpoint = parseUrl(
  process.env.API_URL ?? "https://jsonplaceholder.typicode.com/posts",
);
const path = (process.env.JSON_PATH ?? "").split(".").filter(Boolean);
const pageParam = process.env.PAGE_PARAM;

function resolvePath(value, segments) {
  return segments.reduce((current, segment) => {
    if (
      current === null ||
      current === undefined ||
      !(segment in Object(current))
    ) {
      throw new Error(`JSON path does not resolve at ${segment}`);
    }
    return current[segment];
  }, value);
}

async function getPage(page) {
  const url = parseUrl(endpoint);
  if (pageParam) url.searchParams.set(pageParam, String(page));
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  const type = response.headers.get("content-type") ?? "";
  if (!response.ok || !type.includes("json")) {
    throw new Error(
      `Expected JSON success, received ${response.status} ${type}`,
    );
  }
  const body = await response.json();
  const selected = resolvePath(body, path);
  return { status: response.status, value: selected };
}

const first = await getPage(1);
const result = {
  endpoint: `${endpoint.origin}${endpoint.pathname}`,
  firstType: Array.isArray(first.value) ? "array" : typeof first.value,
};

if (pageParam) {
  const second = await getPage(2);
  result.paginationChanged =
    JSON.stringify(first.value) !== JSON.stringify(second.value);
  if (!result.paginationChanged)
    throw new Error("Pagination validation returned duplicate data");
}

console.log(JSON.stringify(result, null, 2));
