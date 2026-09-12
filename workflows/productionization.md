# Production Operations

Production readiness makes the validated native-fetch/Playwright program observable and bounded; it does not require a scraping platform.

## Runtime

Run Obscura as a supervised process only when browser evidence requires it:

```bash
obscura serve --port 9222
```

Connect workers with `chromium.connectOverCDP('ws://127.0.0.1:9222')`. `browser.close()` disconnects Playwright but does not stop the server. Multiple pages share a V8 isolate; isolate unrelated workloads at the process level when needed.

Use an Obscura storage directory for session persistence. Do not rely on complete Playwright `storageState` save/restore. Native Playwright video and tracing are unavailable; use bounded screenshots, application logs, and redacted network metadata instead. Account for incomplete parity for service workers, native media, some web APIs, rare CSS, and compositor behavior.

## Readiness Gates

Before scaling, require:

- documented authorization and stop conditions;
- validated selectors, paths, endpoints, and pagination;
- 5–10 varied records meeting coverage thresholds;
- concurrency and request-rate limits;
- secret-redaction tests;
- timeout, retry, checkpoint, and schema-drift behavior;
- a browser health check when Obscura is required.

## Monitoring

Track required-field completion, status codes, endpoint/schema changes, duplicate rate, browser-escalation rate, latency, and retry exhaustion. Alert on sustained drift from the accepted small-batch baseline. Sample output for correctness instead of retaining complete sensitive responses.

## Failure Policy

Pause rather than bypass on CAPTCHA, repeated access denial, account risk, changed authorization requirements, or unexplained content divergence. Re-enter reconnaissance at the smallest affected phase and update the intelligence report before changing extraction logic.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
