# Framework Signatures and Data Location

Treat signatures as search signals, not proof. Validate the actual extraction path.

| Evidence | Possible interpretation | Targeted check |
| --- | --- | --- |
| `application/ld+json` | Structured page data | Parse each block and validate `@type` plus required fields |
| `__NEXT_DATA__` or `/_next/` resources | Next.js output | Parse script payload; inspect only observed data paths |
| `__NUXT__` or `/_nuxt/` resources | Nuxt output | Inspect serialized payload and rendered DOM |
| `/wp-content/` or `/wp-json/` | WordPress surface | Fetch only linked or observed public endpoints |
| Empty content container plus scripts | Client rendering may be required | Escalate only missing fields to browser rendering |
| Canonical/alternate links | URL normalization or locale variants | Validate selected scope and locale |

Headers such as `server` or `x-powered-by` may be absent, stale, or deliberately generic. Record the exact signal and confidence. Do not derive access-protection capability from framework identity.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
