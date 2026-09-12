# Conditional Protection Testing

This legacy filename remains for compatibility; this guide does not prescribe proxy infrastructure.

## Run Only When

- Phase 0 or browser observation produced 401, 403, or 429;
- a challenge or CAPTCHA was visibly observed;
- anonymous and expected content unexpectedly differ;
- the user explicitly requested a bounded protection assessment; or
- planned volume makes rate behavior materially unknown.

## Bounded Checks

1. Repeat one raw request after a delay and record status/header evidence.
2. If missing fields already justify browser use, compare one Obscura navigation result.
3. Test only the minimum volume needed to establish rate behavior.
4. Stop on CAPTCHA, repeated denial, account warnings, or authorization ambiguity.

Report observed behavior, environment, timing, and limits. Do not label a provider or mechanism without evidence. Do not attempt evasion or attribute stealth, IP rotation, TLS-identity changes, or behavior simulation to Obscura.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
