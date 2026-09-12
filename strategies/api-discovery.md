# API Discovery and Validation

## Discovery Order

1. Inspect raw HTML, scripts, forms, and embedded JSON for explicit public endpoints.
2. If required fields remain missing, observe only XHR/fetch traffic during initial rendering.
3. If still missing, perform one field-linked interaction and compare new traffic.

Record endpoint shape, not sensitive instances: method, origin/path template, query-key names, content type, response schema, and whether authentication exists. Redact authorization/cookie values and do not retain request bodies that may contain credentials or personal data.

## Validation

Repeat an endpoint only when authorized and safe. Recreate the minimal non-secret request shape, verify successful status/content type, resolve every declared JSON path, and compare values with the visible page. Test two pagination positions before claiming traversal. Treat session-bound, expiring, signed, or authenticated calls as browser-session dependencies unless the user explicitly authorizes another design.

Prefer a validated public JSON endpoint over DOM extraction, but never assume an internal endpoint is stable or permitted. Document drift and schema-change risk.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
