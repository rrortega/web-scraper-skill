# Evidence-Gated Reconnaissance

## Before Requesting Data

Confirm target, authorized scope, requested fields, sample size, freshness needs, and stop conditions. Create one coverage-matrix row per field:

| Field | Required | Raw HTML | Embedded JSON | Observed API | Rendered DOM | Validated |
|---|---:|---:|---:|---:|---:|---:|

Mentioning a source is not coverage. Coverage requires a tested extraction path that returns the expected type and value on a representative page.

## Phase 0: Native HTTP Assessment

Use native `fetch` before opening a browser:

```js
const response = await fetch(target, {
  redirect: 'follow',
  headers: { 'user-agent': 'fetch-first-recon/1.0' },
});
const html = await response.text();
console.log(response.status, response.url, response.headers.get('content-type'));
```

Record status, redirect target, content type, cache/rate-limit signals, and non-secret header metadata only. Inspect raw HTML for requested values, JSON-LD, framework payloads, canonical links, pagination links, and script/data URLs. Fetch `robots.txt` and declared sitemaps only when URL discovery is in scope.

Do not log response bodies containing personal or authenticated data. Do not infer framework behavior, protection, or endpoints without evidence.

### Gate A

- If every requested field has a validated raw-HTTP path, skip the browser.
- If named fields are absent, require rendering, or an access signal blocks assessment, record evidence and continue only for those gaps.

## Phase 1: Bounded Browser Observation

Start Obscura separately:

```bash
obscura serve --port 9222
```

Connect with `chromium.connectOverCDP`, not another Playwright connection method. Register listeners before navigation. Retain only XHR/fetch metadata relevant to missing fields:

```js
import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP('ws://127.0.0.1:9222');
const context = browser.contexts()[0] ?? await browser.newContext();
const page = context.pages()[0] ?? await context.newPage();
const observations = [];

page.on('request', request => {
  if (!['xhr', 'fetch'].includes(request.resourceType())) return;
  const headers = request.headers();
  observations.push({
    kind: 'request',
    method: request.method(),
    endpoint: new URL(request.url()).origin + new URL(request.url()).pathname,
    authPresent: Boolean(headers.authorization || headers.cookie),
    headerNames: Object.keys(headers).filter(name => !['authorization', 'cookie'].includes(name)),
  });
});

page.on('response', async response => {
  const request = response.request();
  if (!['xhr', 'fetch'].includes(request.resourceType())) return;
  const type = response.headers()['content-type'] ?? '';
  const item = { kind: 'response', status: response.status(), endpoint: new URL(response.url()).pathname };
  if (type.includes('application/json')) {
    try { item.bodyShape = describeShape(await response.json()); } catch { item.bodyShape = 'unreadable JSON'; }
  }
  observations.push(item);
});
```

`describeShape` must return keys/types or array shape, never secret values. Bound observation by target origin, resource type, time, and field purpose. See [network observation](../strategies/traffic-interception.md).

### Gate B

Validate rendered selectors or safe JSON-response paths for every missing field. If coverage is complete, stop exploring. Otherwise, continue only with an action tied to an uncovered field.

## Phase 2: Targeted Interactions

Use ordinary locators: dismiss blocking consent, select a required variant, click pagination, or scroll enough to trigger missing data. Before each action, clear in-memory observations; after it, wait for the specific response or DOM state. Never browse broadly “just in case.”

Document the action, expected field, observed endpoint or DOM change, and whether it closed the gap. Stop when the quality threshold is met or the bounded action budget is exhausted.

## Phase 3: Validation

For each claim:

- **Selector:** verify count and extracted type/value on representative pages; reject ambiguous matches.
- **JSON path:** parse recent JSON, resolve each segment, and verify the expected type.
- **Endpoint:** repeat only when authorized and safe; verify method, status, content type, schema, and required non-secret request shape.
- **Pagination:** test at least two distinct pages/cursors and verify progression without duplicates.

Mark failures as `PARTIAL` or `NO`; never promote an observation to validation.

## Phase 4: Conditional Protection Testing

Run only after 401/403/429, a challenge page, inconsistent access, production-volume scope, or an explicit request. Use a small request budget. Compare raw HTTP and browser results, record status/challenge/rate-limit evidence, and stop on CAPTCHA, account risk, or access-policy uncertainty. Do not attempt bypasses or claim Obscura provides stealth, proxies, TLS changes, or humanization.

## Phase 5: Report and Self-Critique

Use the [report schema](../reference/report-schema.md). Explain each skipped phase through its gate, list missing fields and unvalidated claims, disclose sample and environment limits, and recommend only targeted follow-up work. If the report reveals a repairable gap, return to the smallest relevant step instead of repeating reconnaissance.

Obscura limits that may affect conclusions are documented in the [runtime reference](../reference/obscura-playwright.md).

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
