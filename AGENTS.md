# Agent Guide

## Purpose

Use this skill to perform evidence-gated web reconnaissance and extraction with native `fetch`, Playwright, and Obscura. Read [`SKILL.md`](SKILL.md) before operating; it is the runtime contract.

## Install the Skill

1. Copy or clone this complete directory into the skills directory recognized by the agent runtime, preserving its relative structure.
2. Keep `SKILL.md`, `workflows/`, `strategies/`, `reference/`, and `examples/` together. The skill uses local relative links.
3. Install Playwright in the project that will execute a scraper:

   ```bash
   npm install playwright
   ```

4. Install Obscura for the target environment, then start its CDP server:

   ```bash
   obscura serve --port 9222
   ```

5. Connect Playwright with CDP, never with `chromium.connect()`:

   ```js
   import { chromium } from 'playwright';

   const browser = await chromium.connectOverCDP('ws://127.0.0.1:9222');
   ```

## Use the Skill

1. Identify requested fields, authorized scope, limits, and stop conditions.
2. Run the fetch-first Phase 0 assessment. Inspect headers, raw HTML, embedded data, `robots.txt`, and sitemaps before launching a browser.
3. Open Obscura only when rendering, interaction, or an uncovered field requires it.
4. Observe bounded Playwright `request` and `response` events. Redact credentials, cookies, tokens, and sensitive bodies.
5. Validate every selector, JSON path, endpoint, and pagination claim before recommending it.
6. Run low-volume protection checks only when evidence warrants them. Do not claim stealth, proxy rotation, TLS spoofing, or human-like behavior.
7. Report coverage, validated paths, gaps, assumptions, and a self-critique. Test 5–10 varied records before scaling.

## Read on Demand

- [`workflows/reconnaissance.md`](workflows/reconnaissance.md) — phased reconnaissance and quality gates.
- [`workflows/implementation.md`](workflows/implementation.md) — small-batch implementation and scale gate.
- [`reference/obscura-playwright.md`](reference/obscura-playwright.md) — CDP connection and runtime limitations.
- [`reference/report-schema.md`](reference/report-schema.md) — required intelligence report.
- [`examples/README.md`](examples/README.md) — runnable examples.

## Runtime Limits

Obscura does not provide native Playwright video or tracing. Storage-state save/restore is limited; use an Obscura storage directory where persistence is required. Revalidate workflows that depend on service workers, native media, uncommon Web APIs, long-tail CSS, or compositor behavior.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
