// Prerequisites: Node.js 18+. No packages required.
// Setup: TARGET_URL must be an authorized site origin. Optional MAX_URLS defaults to 20.

function parseUrl(value, base) {
  try {
    return new URL(value, base);
  } catch (error) {
    throw new Error(`Invalid URL: ${value}`, { cause: error });
  }
}

const target = parseUrl(process.env.TARGET_URL ?? "https://example.com");
const maxUrls = Number(process.env.MAX_URLS ?? 20);

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

const robotsUrl = parseUrl("/robots.txt", target);
const robots = await fetchText(robotsUrl);
const declared = [...robots.matchAll(/^sitemap:\s*(\S+)\s*$/gim)].map(
  (match) => match[1],
);
const sitemapUrl = parseUrl(declared[0] ?? "/sitemap.xml", target);

if (sitemapUrl.origin !== target.origin) {
  throw new Error(`Refusing cross-origin sitemap: ${sitemapUrl.origin}`);
}

const xml = await fetchText(sitemapUrl);
const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
  .map((match) => parseUrl(match[1].replaceAll("&amp;", "&"), sitemapUrl))
  .filter((url) => url.origin === target.origin)
  .map((url) => url.href);

const unique = [...new Set(urls)].slice(0, maxUrls);
console.log(
  JSON.stringify(
    { sitemap: sitemapUrl.href, discovered: urls.length, sample: unique },
    null,
    2,
  ),
);
