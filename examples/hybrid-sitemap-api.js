// Prerequisites: Node.js 18+. No packages required.
// Setup: SITEMAP_URL and API_BASE must be authorized. ITEM_PATH is a dot-separated JSON path.
// This example validates a small batch before any scale decision.

function parseUrl(value, base) {
  try {
    return new URL(value, base);
  } catch (error) {
    throw new Error(`Invalid URL: ${value}`, { cause: error });
  }
}

const sitemapUrl = parseUrl(
  process.env.SITEMAP_URL ?? "https://example.com/sitemap.xml",
);
const apiBase = parseUrl(
  process.env.API_BASE ?? "https://example.com/api/items/",
);
const itemPath = (process.env.ITEM_PATH ?? "").split(".").filter(Boolean);
const batchSize = Math.min(Number(process.env.BATCH_SIZE ?? 5), 10);

function resolvePath(value, path) {
  return path.reduce((current, key) => {
    if (current === null || current === undefined || !(key in Object(current)))
      throw new Error(`Missing JSON path segment: ${key}`);
    return current[key];
  }, value);
}

const sitemapResponse = await fetch(sitemapUrl, {
  signal: AbortSignal.timeout(15_000),
});
if (!sitemapResponse.ok)
  throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const xml = await sitemapResponse.text();
const pageUrls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map(
  (match) => parseUrl(match[1].replaceAll("&amp;", "&")),
);
const ids = pageUrls
  .filter((url) => url.origin === sitemapUrl.origin)
  .map((url) => url.pathname.match(/\/([^/]+)\/?$/)?.[1])
  .filter(Boolean)
  .slice(0, batchSize);

const results = [];
for (const id of ids) {
  const url = parseUrl(encodeURIComponent(id), apiBase);
  if (url.origin !== apiBase.origin)
    throw new Error("API URL escaped its authorized origin");
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  const type = response.headers.get("content-type") ?? "";
  if (!response.ok || !type.includes("json"))
    throw new Error(`API validation failed for ${id}: ${response.status}`);
  const selected = resolvePath(await response.json(), itemPath);
  results.push({
    id,
    selectedType: Array.isArray(selected) ? "array" : typeof selected,
  });
}

console.log(JSON.stringify({ sampled: ids.length, results }, null, 2));
