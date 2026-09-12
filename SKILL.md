---
name: web-scraping
summary: Evidence-gated web reconnaissance and extraction with native fetch, Playwright, and Obscura.
description: "Trigger: scrape, extract website data, inspect browser traffic, or diagnose blocking. Uses evidence-gated fetch-first reconnaissance and Obscura browser escalation."
license: Apache-2.0
metadata:
  author: Rolando Rodriguez Ortega
  github: https://github.com/rrortega
  version: "6.0.0"
---

# Web Scraping

## Activation Contract

Use for website reconnaissance, structured extraction, browser-network inspection, scraper implementation, or access-protection diagnosis. Establish requested fields, authorized scope, and output first.

## Hard Rules

- Start Phase 0 with native `fetch`; browser automation is never the default.
- Escalate only from recorded evidence: missing fields, required rendering/interaction, or access signals.
- Use Obscura only through `obscura serve --port 9222` and Playwright `chromium.connectOverCDP('ws://127.0.0.1:9222')`.
- Observe bounded `request`/`response` events. Never record secret values; report only auth presence, header names/redaction, and endpoint shape.
- Validate every claimed selector, JSON path, endpoint, and pagination behavior.
- Interact only to close named coverage gaps. Respect authorization, terms, robots guidance, rate limits, and stop signals.
- Never claim stealth, proxy rotation, TLS spoofing, or human-like behavior.

## Decision Gates

| Evidence | Next action |
| --- | --- |
| Raw response covers every field | Validate and report; skip browser |
| Fields require rendering or a bounded action | Use Obscura + Playwright for those gaps |
| 401/403/429, challenge, or user requests protection testing | Run conditional, low-volume protection checks |
| Coverage remains incomplete | Report gaps; do not invent data |

## Execution Steps

1. Inventory data points and success thresholds.
2. Run Phase 0 raw HTTP assessment and create a coverage matrix.
3. Escalate only uncovered fields to browser observation or targeted actions.
4. Validate extraction paths and evidence.
5. Produce the intelligence report and self-critique.
6. Implement the simplest validated route; test 5–10 varied records before scale.

## Output Contract

Return phase decisions, per-field coverage, validated extraction paths, redacted endpoint metadata, protection evidence, known gaps, self-critique, implementation recommendation, and small-batch results.

## References

- [Reconnaissance workflow](workflows/reconnaissance.md)
- [Implementation workflow](workflows/implementation.md)
- [Production workflow](workflows/productionization.md)
- [Obscura and Playwright reference](reference/obscura-playwright.md)
- [Report schema](reference/report-schema.md)
- [Examples](examples/README.md)

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
