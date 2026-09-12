# DOM Extraction with Playwright

Use DOM extraction only for fields proven to require rendered state.

## Locator Design

Prefer stable semantic locators and explicit attributes over styling chains:

```js
const heading = page.getByRole('heading', { level: 1 });
await heading.waitFor({ state: 'visible' });
const value = (await heading.textContent())?.trim();
```

Use CSS locators when the report records and validates the exact selector. Avoid broad text matches, positional selectors, generated class names, and sleeps when a specific state or response can be awaited.

## Validation

For every selector or locator, verify expected count, visibility where relevant, extracted type, normalization, and a representative value. Test the full small batch and at least one variant template. Mark optional absence separately from extraction failure.

Use targeted actions only for named gaps: select a required variant, expand a section, advance a page, or trigger lazy loading. Await the resulting locator or response. Obscura supports ordinary locators, navigation, evaluate, pages, cookies, routing, screenshots, and PDF, subject to [runtime-reference limits](../reference/obscura-playwright.md).

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
