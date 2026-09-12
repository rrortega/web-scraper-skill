# Obscura and Playwright Runtime Reference

The integration uses direct Playwright browser control over CDP.

## Start and Connect

Run the Obscura server in a separate terminal:

```bash
obscura serve --port 9222
```

Connect from JavaScript:

```js
import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP('ws://127.0.0.1:9222');
const context = browser.contexts()[0] ?? await browser.newContext();
const page = context.pages()[0] ?? await context.newPage();
```

Use `connectOverCDP`, not `connect`. Closing the Playwright browser object closes only the CDP connection; manage the server process separately.

## Supported Working Surface

Use ordinary Playwright navigation, pages, contexts, locators, `evaluate`, cookies, request routing, request/response events, screenshots, and PDF. Register event listeners before the observed action.

```js
page.on('request', request => {
  if (['xhr', 'fetch'].includes(request.resourceType())) {
    console.log(request.method(), new URL(request.url()).pathname);
  }
});

page.on('response', response => {
  const request = response.request();
  if (['xhr', 'fetch'].includes(request.resourceType())) {
    console.log(response.status(), new URL(response.url()).pathname);
  }
});
```

Do not print complete headers or token-bearing URLs. Record auth presence, redacted header names, endpoint path shape, query-key names, status, and body schema. Call `response.json()` only when content type, size, authorization, and data sensitivity make it safe.

## Current Limits

- Native Playwright video and tracing are unavailable.
- Playwright storage-state save/restore is limited; use an Obscura storage directory for persistence.
- Multiple pages share a V8 isolate.
- Service workers, native media, some web APIs, rare CSS, and compositor behavior have incomplete parity.

These limits can invalidate tests that depend on exact browser rendering or platform behavior. State them in reports when relevant.

## Unsupported Claims

Do not claim Obscura provides built-in stealth, proxy rotation, TLS spoofing, or human-like input. If access protection appears, follow the [conditional protection guide](../strategies/proxy-escalation.md) and stop rather than inventing bypass features.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
