# Anti-Patterns

## Starting with a Browser

**Problem:** wastes resources and hides whether raw HTTP already covers the request.
**Instead:** run Phase 0 with native `fetch` and document missing fields.

## Broad Network Capture

**Problem:** collects irrelevant or sensitive traffic.
**Instead:** filter authorized-origin XHR/fetch events within a bounded action window; retain shapes, not secrets.

## Treating Observation as Validation

**Problem:** a visible value or endpoint name does not prove an extraction path.
**Instead:** run every selector/JSON path and safely repeat or validate endpoints, including pagination claims.

## Interacting Without a Field Hypothesis

**Problem:** exploratory clicking expands scope and noise.
**Instead:** tie every action to a missing field and stop when the gap closes.

## Assuming Protection Features

**Problem:** headless capability is confused with anti-detection or network identity.
**Instead:** make no claims of stealth, IP rotation, TLS spoofing, or humanization; report exact evidence and stop conditions.

## Scaling Before Quality Gates

**Problem:** multiplies silent nulls, duplicates, and access failures.
**Instead:** validate 5–10 varied records, required-field coverage, pagination, and failure behavior before gradual scale.

## Ignoring Runtime Limits

**Problem:** tests rely on unavailable tracing/video or incomplete platform parity.
**Instead:** use redacted logs and bounded screenshots, Obscura storage persistence, and disclose affected service-worker/media/API/CSS/compositor assumptions.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
