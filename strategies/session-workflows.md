# Obscura Session Workflow and Evidence

Start the environment outside the Playwright process:

```bash
obscura serve --port 9222
```

Connect through `chromium.connectOverCDP('ws://127.0.0.1:9222')`. Reuse the supplied default context when available. `browser.close()` disconnects the CDP client and does not stop the server.

For persistence, configure an Obscura storage directory and protect it as sensitive state. Playwright storage-state save/restore is limited with this integration. Never commit or log the storage directory, cookies, tokens, or authenticated response bodies.

Native Playwright tracing and video are unavailable. Capture only bounded alternatives: redacted structured logs, endpoint shapes, validated field results, and screenshots explicitly required as evidence. Screenshots may contain personal data; minimize them and handle them under project policy.

Multiple pages share a V8 isolate. Do not treat pages as security or workload-isolation boundaries. Use separate supervised Obscura processes when isolation is required. Revalidate workflows depending on service workers, native media, uncommon web APIs, rare CSS, or compositor details because parity is incomplete.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
