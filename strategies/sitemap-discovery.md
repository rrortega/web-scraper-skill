# Sitemap Discovery

Use sitemaps for URL discovery only when collection scope requires multiple pages.

1. Fetch `/robots.txt` with native `fetch` and extract declared `Sitemap:` URLs.
2. If none is declared, try `/sitemap.xml` once when appropriate.
3. Fetch only in-scope sitemap documents; follow sitemap indexes with a strict document/URL limit.
4. Parse `<loc>` values with the standard APIs shown in the [sitemap example](../examples/sitemap-basic.js).
5. Normalize URLs, apply allowed origins/path patterns, and deduplicate.
6. Sample URLs across templates before claiming coverage.

A sitemap lists candidate URLs; it does not prove completeness, freshness, accessibility, or field coverage. Compare counts only with independently validated totals. Do not crawl links outside authorized scope.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
