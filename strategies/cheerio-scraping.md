# Native HTTP Extraction

Despite this legacy filename, use only native `fetch` and standard JavaScript APIs.

Use raw HTTP when Phase 0 proves all required fields exist in HTML, embedded JSON, XML, or a public JSON endpoint. Check `response.ok` and content type before parsing. Follow redirects deliberately and apply timeouts with `AbortSignal.timeout()` where supported.

Prefer validated structured sources in this order: public JSON response, embedded JSON/JSON-LD, stable raw markup. Node.js has no standard HTML DOM parser; do not introduce an undeclared parser dependency. For complex HTML selectors, use the browser DOM or add a project-approved parser with a package manifest.

Validate JSON paths against recent responses and verify types. For simple XML discovery, limit parsing to well-formed tags needed for scope and reject malformed input. Apply concurrency limits, bounded retries, and status-aware backoff only after the small batch passes.

See the [API example](../examples/api-scraper.js) and [sitemap example](../examples/sitemap-basic.js).

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
