# Code style

Formatting and import rules enforced by Prettier + ESLint. Config sources:

- `.prettierrc` (root)
- `eslint.config.mjs` (root, extends `packages/eslint-config`)

## Prettier

- Tabs for indentation, print width 110
- Semicolons, no trailing commas, LF line endings
- JS: single quotes. TS: double quotes (`singleQuote: false` override for `*.ts`)
- Markdown: 2-space indentation, no tabs

## Import ordering (ESLint `import/order`)

- Group 1: `external` + `builtin`
- Group 2: `internal` + `index` + `sibling` + `parent`
- Alphabetical within groups (case-insensitive)
- No duplicate imports (`import/no-duplicates` is `error`)

## Restricted APIs

Do not use `crypto.randomUUID` / `window.crypto.randomUUID` — lint forbids it because it's unavailable in non-secure contexts. Use `randomUUID` from the `uuid` module instead.
