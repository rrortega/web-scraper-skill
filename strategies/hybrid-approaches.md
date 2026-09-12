# Field-Level Hybrid Routing

A hybrid scraper assigns each field or page class to the least-cost validated route.

Typical plan:

1. Discover in-scope URLs through a validated sitemap or known list.
2. Fetch HTML/public JSON for fields covered in Phase 0.
3. Escalate only records with evidenced browser-only gaps to Obscura-backed Playwright.
4. Join results on a validated stable identifier.
5. Retain source and validation status per field.

Do not use browser failure as a silent fallback for every HTTP error. Classify status, schema drift, missing optional data, and rendering gaps separately. Limit browser-escalation rate; a rising rate signals a pause and return to reconnaissance.

Validate the hybrid plan with 5–10 varied records. Compare joined records with visible pages, detect duplicate identifiers, and test pagination edges. See the [iterative example](../examples/iterative-fallback.js).

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
