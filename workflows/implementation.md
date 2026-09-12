# Small-Batch Implementation

Implement only after reconnaissance identifies validated extraction paths.

## 1. Select the least-cost validated route

Prefer native `fetch` for HTML or public JSON covering required fields. Use Obscura-backed Playwright only for fields proven to require rendering or interaction. A hybrid route may fetch most records and send only evidence-backed exceptions to the browser.

## 2. Encode contracts

For each field, define source, selector or JSON path, expected type, required/optional status, normalization, and failure behavior. Keep endpoint authentication out of logs and output. Reject malformed records rather than silently invent defaults.

## 3. Run a varied small batch

Test 5–10 records covering relevant templates, categories, pagination edges, missing optional fields, and one expected failure. Capture:

- required-field completion rate;
- selector/path validation failures;
- duplicate identifiers;
- HTTP-status distribution;
- browser escalations and evidence;
- latency and retry count.

Do not scale until the agreed coverage threshold passes and every required extraction path remains validated.

## 4. Triangulate

Compare at least one extracted value with a second visible or structured source when available. Test page/cursor progression and verify records change. Re-run one record to detect session-dependent output.

## 5. Add bounded robustness

Add timeouts, limited retries with backoff, concurrency limits, rate-limit handling, redacted structured logs, checkpoints, and explicit failure exits. Stop on repeated access denials, CAPTCHA, schema drift, or rising required-field failure rates.

## 6. Scale gradually

Increase volume in measured stages. Recompute quality metrics at each stage and keep the browser as a conditional fallback, not a universal route. See [production operations](productionization.md) and [hybrid strategies](../strategies/hybrid-approaches.md).

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
