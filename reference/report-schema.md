# Intelligence Report Schema

Use this structure after reconnaissance.

## 1. Scope and Evidence Budget

- target and authorized scope;
- requested fields and required coverage;
- page/action/request limits;
- environment, locale, session state, and timestamp.

## 2. Architecture Observations

Record rendering/data-location evidence and confidence. Separate observed facts from hypotheses.

## 3. Data-Point Coverage

| Field | Source | Extraction path | Phase | Validation evidence | Status |
|---|---|---|---:|---|---|
| Example title | Raw HTML | `h1` | 0 | One unambiguous match on sampled pages | YES |

Use `YES` only after running the selector/path and checking type/value. Use `PARTIAL` for incomplete sampling or pagination validation and `NO` for a failed or theoretical method.

## 4. Endpoint Observations

For each relevant endpoint, report method, origin/path template, query-key names, response schema, pagination, status, and validation result. Report authentication only as present/absent plus redacted header names. Never include credentials, cookies, tokens, signed values, or sensitive bodies.

## 5. Protection Assessment

List exact statuses, headers, challenge text, CAPTCHA or account-risk evidence, timing, and impact. State whether Phase 4 ran and why. Avoid unsupported provider or bypass claims.

## 6. Recommended Implementation

Rank validated native-fetch, browser, and hybrid routes by field coverage, complexity, and runtime cost. Include small-batch composition, quality threshold, stop conditions, and scale plan.

## 7. Self-Critique

Always include:

- missing or weakly covered fields and the smallest next investigation;
- skipped phases and gate evidence;
- every `PARTIAL` or `NO` claim;
- assumptions and sample bias;
- session, locale, personalization, and drift risks;
- relevant Obscura compatibility limits;
- why the recommended route might fail at scale.

End with a concise implementation checklist. Do not hide uncertainty in prose; keep status explicit per field.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
