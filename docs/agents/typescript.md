# TypeScript

ESLint config: `packages/eslint-config/eslint.config.js`

Base: `typescript-eslint` `recommendedTypeChecked` with type-aware parsing via `tsconfig.eslint.json` per workspace.

## Notable overrides (explicitly configured)

These rules are turned **off** despite the base preset:

- `no-unsafe-argument`, `no-unsafe-assignment`, `no-unsafe-call`, `no-unsafe-member-access`, `no-unsafe-return` — all off
- `no-redundant-type-constituents` — off
- `prefer-promise-reject-errors` — off
- `require-await` — off
- `restrict-template-expressions` — off
- `no-base-to-string` — off
- `prefer-nullish-coalescing` — off

Kept enabled with modifications:

- `no-misused-promises` — `checksVoidReturn: false`
- `no-unused-vars` — `args: 'none'`

## Promise safety

- `no-floating-promises` is active (from base preset) — await or handle promises intentionally
- `no-misused-promises` is active but allows void returns in callbacks
- `promise/no-multiple-resolved` — off

## JSDoc

Uses `eslint-plugin-jsdoc` `flat/recommended-typescript`. Notable:

- `require-jsdoc` is `warn` (not error)
- `check-tag-names` is off
- In TS, prefer TS types over JSDoc type annotations
