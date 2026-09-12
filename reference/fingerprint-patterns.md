# Runtime Capability Matrix

This legacy filename remains for compatibility; this document does not provide fingerprint configurations.

| Capability | Obscura with Playwright |
| --- | --- |
| CDP connection | `chromium.connectOverCDP('ws://127.0.0.1:9222')` |
| Navigation, pages, locators, evaluate | Supported |
| Cookies and request routing | Supported |
| Request/response events | Supported |
| Screenshots and PDF | Supported |
| Native Playwright video/tracing | Unavailable |
| Storage-state save/restore | Limited; use an Obscura storage directory |
| Page isolation | Pages share a V8 isolate |
| Service workers/native media | Incomplete |
| Some web API/CSS/compositor parity | Incomplete |

Do not interpret headless execution as anti-detection. These documented integration facts do not establish Obscura stealth, proxy rotation, TLS-identity changes, or behavior simulation. Report only observed access behavior.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
