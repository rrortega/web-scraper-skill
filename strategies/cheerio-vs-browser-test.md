# Raw HTTP versus Browser Gate

Despite this legacy filename, use native `fetch`; this skill does not require an HTML parsing library.

## Test

1. Fetch the representative URL with redirects enabled.
2. Record status, final URL, content type, and non-secret header metadata.
3. Search raw HTML and embedded JSON for every requested field.
4. Validate any JSON path immediately.
5. Build the coverage matrix.

## Decision

- **Stay with fetch:** every required field is present through validated HTML text, embedded JSON, or public endpoint data.
- **Use a hybrid:** most fields validate over HTTP, but named gaps require rendering or an interaction.
- **Escalate to browser:** required fields are absent until JavaScript runs, or Phase 0 cannot assess the page because of evidenced access behavior.

A modern framework alone does not justify browser use. Record the missing field and evidence before escalation. If no route validates a field, report the gap rather than assuming a heavier browser will solve it.

**Author:** [Rolando Rodriguez Ortega](https://github.com/rrortega)
