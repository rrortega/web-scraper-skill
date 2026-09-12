# Access-Protection Response

Treat access controls as constraints, not puzzles to bypass.

## Evidence

Record exact status codes, retry/rate-limit headers, challenge text, CAPTCHA visibility, redirect loops, authentication barriers, and timing. Distinguish transient server failure from repeated policy enforcement. Do not infer fingerprinting or a specific protection provider without direct evidence.

## Safe Responses

- Reduce concurrency and request frequency.
- Respect `Retry-After` and documented API quotas.
- Reuse the user-authorized session through an Obscura storage directory when appropriate.
- Reduce the sample or request official access.
- Stop on CAPTCHA, account warnings, repeated denial, or unclear authorization.

Obscura is a headless environment, not a declared stealth, proxy-rotation, TLS-spoofing, or humanization layer. Do not promise bypass results. Run protection checks only under the [conditional gate](proxy-escalation.md); report limits and unresolved access requirements.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
