# Bounded Playwright Network Observation

Use browser-network observation only for fields that failed Phase 0. Register `page.on('request')` and `page.on('response')` before navigation or a targeted action.

## Scope Filters

Retain an event only when all criteria apply:

- resource type is `xhr` or `fetch`;
- origin is within authorized scope;
- event occurs within the bounded observation window;
- endpoint may provide a named missing field.

Record method, origin/path shape, query-key names, resource type, status, content type, and timing. For authentication, record only `present: true/false` and redacted header names. Never retain authorization values, cookies, tokens, credential-bearing request bodies, or personal response data.

Call `response.json()` only for expected, acceptably sized, authorized JSON. Catch parse/body-consumption failures. Reduce bodies to schema-like evidence: object keys, primitive types, array length, and nested shape needed to validate a path.

After a targeted action, compare events to the baseline and discard unrelated observations. A discovered endpoint becomes a recommendation only after safe replay or browser validation confirms status, schema, values, and pagination behavior.

See the executable [network example](../examples/traffic-interception-basic.js).

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
