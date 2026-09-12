# URL Pattern Reference

Use URL parsing before regular expressions:

```js
const parsed = new URL(candidate, baseUrl);
if (parsed.origin !== allowedOrigin) throw new Error('URL outside allowed scope');
parsed.hash = '';
```

Apply regex only to validated formats:

```text
Numeric product ID: ^/products/(\\d+)/?$
Slug:               ^/articles/([a-z0-9-]+)/?$
Page number:        (?:^|[?&])page=(\\d+)(?:&|$)
Locale prefix:      ^/(?:en|es|fr)/
```

Anchor patterns, bound input length, and test positive and negative examples. Do not use regex to parse general HTML or JSON. Normalize and deduplicate with `URL.href`; retain only authorized origins and paths.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
