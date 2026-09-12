# Executable JavaScript Examples

Prerequisites:

- Node.js 18+ for native `fetch`.
- For browser examples, install Playwright in a project with a package manifest: `npm install playwright`.
- Install the Obscura CLI through its official distribution instructions, then run `obscura serve --port 9222` in a separate terminal.
- Use only targets you are authorized to assess.

Run examples from this directory:

```bash
TARGET_URL=https://example.com node sitemap-basic.js
API_URL=https://api.example.com/items node api-scraper.js
TARGET_URL=https://example.com node traffic-interception-basic.js
TARGET_URL=https://example.com node iterative-fallback.js
SITEMAP_URL=https://example.com/sitemap.xml API_BASE=https://api.example.com/items/ node hybrid-sitemap-api.js
```

- [`sitemap-basic.js`](sitemap-basic.js): bounded native-fetch sitemap discovery
- [`api-scraper.js`](api-scraper.js): JSON-path and pagination validation
- [`traffic-interception-basic.js`](traffic-interception-basic.js): redacted Obscura XHR/fetch observation
- [`iterative-fallback.js`](iterative-fallback.js): Phase 0 first; browser only for missing fields
- [`hybrid-sitemap-api.js`](hybrid-sitemap-api.js): sitemap IDs plus a public JSON endpoint

Replace example selectors and paths only after validating them against the target. Browser scripts disconnect from Obscura but do not stop its server process.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
