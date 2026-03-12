# AGENTS.md (web-starter)

This repo is an npm-workspaces monorepo:
- Root workspace runner: `scripts/workspaces.mjs`
- Workspaces: `how-to/*` (each how-to is its own package)

No test runner is currently configured (no Jest/Vitest/Mocha/Playwright/Cypress).
Agent changes should focus on build + lint + format + markdownlint.

## Prereqs
- Node.js: 22+ recommended (CI workflows use Node 22)
- Package manager: npm (repo uses `package-lock.json`)

## Repo Layout
- Root scripts orchestrate per-workspace scripts: `package.json`
- Each workspace has its own:
  - `package.json` scripts (build/start/lint)
  - ESLint config: `how-to/*/.eslintrc.js`
  - Prettier config: `how-to/*/.prettierrc`
  - markdownlint config: `how-to/*/.markdownlint.json`
  - TS configs: `how-to/*/tsconfig.eslint.json`, `how-to/*/client/tsconfig.json`

## Commands (root)

Install once:
- `npm ci` (CI) or `npm install` (local)

Build all how-tos:
- `npm run build`
  - Runs `node scripts/workspaces.mjs build` (fails fast, sequential)

Lint/format all how-tos:
- `npm run prettier-check` (check-only)
- `npm run eslint`
- `npm run markdownlint`
- `npm run validate`
  - NOTE: per-workspace `validate` runs `prettier` (writes files). Prefer check-only in CI.

Packaging (repo-specific):
- `npm run package` (see `scripts/package.js`)
- `npm run package-for-github`
- `npm run package-for-aws`

## Commands (single workspace)

The root runner always iterates all workspaces; to target one how-to, use npm workspaces.

Example workspace: `how-to/web-interop-basic`

Build:
- `npm -w how-to/web-interop-basic run build`

Dev server (serves `public/`):
- `npm -w how-to/web-interop-basic run start`

Lint/format:
- `npm -w how-to/web-interop-basic run prettier-check`
- `npm -w how-to/web-interop-basic run eslint`
- `npm -w how-to/web-interop-basic run markdownlint`
- `npm -w how-to/web-interop-basic run validate` (writes)

## CI Guidance

Recommended check-only pipeline:
- `npm ci`
- `npm run build`
- `npm run prettier-check`
- `npm run eslint`
- `npm run markdownlint`

Avoid `npm run validate` in CI (it formats/writes).

## Tests

There is no configured test runner or `test` scripts.
- There is no "run a single test" command to document.

If you add tests, also add:
- Root `npm run test`
- Workspace `npm -w how-to/<name> run test`
- "Single test" example (e.g. `npm test -- -t <pattern>`)

## Code Style (enforced by ESLint + Prettier)

Primary sources:
- `how-to/*/.eslintrc.js`
- `how-to/*/.prettierrc`

### Formatting (Prettier)
- Tabs for indentation: `useTabs: true`
- Print width: `110`
- Semicolons: `true`
- Trailing commas: `none`
- End of line: `lf`
- JS uses single quotes by default
- TS override uses double quotes (`singleQuote: false` for `*.ts`)
- Markdown override uses 2-space indentation, no tabs

### Imports
- Keep imports ordered (ESLint `import/order`):
  - Group 1: `external` + `builtin`
  - Group 2: `internal` + `index` + `sibling` + `parent`
  - Alphabetical within groups (case-insensitive)
- Avoid index imports (ESLint `unicorn/import-index` is `error`)
- No duplicate imports (`import/no-duplicates` is `error`)
- Type imports: use inline type imports when needed
  - Prefer: `import { foo, type Bar } from "...";`

### TypeScript rules (high impact)
- `strict: true` in workspace TS configs
- Explicit return types are required
  - Always annotate function/method return types in TS
- Member accessibility is required
  - Use `public`/`protected`/`private` as appropriate (constructors must omit `public`)
- No `any`
  - `@typescript-eslint/no-explicit-any` is `error`
- No non-null assertions
  - `@typescript-eslint/no-non-null-assertion` is `error`
- No namespaces
  - `@typescript-eslint/no-namespace` is `error`
- Prefer optional chaining / nullish coalescing where applicable
- Exhaustive switch required
  - `@typescript-eslint/switch-exhaustiveness-check` is `error`

### Naming conventions
- General: `camelcase` enforced
- TS naming convention highlights:
  - Variables: `camelCase` or `UPPER_CASE`
  - Enum members: `PascalCase`
  - `private` properties: leading underscore required (`_myField`)
  - `static` properties: `UPPER_CASE` (no leading underscore unless also private)

### Async / Promise safety
- No floating promises
  - Await promises or otherwise handle them intentionally
- Avoid misused promises in callbacks
  - Use `void` only when truly intentional and obvious

### Error handling
- Throw `Error` objects with meaningful messages
  - `unicorn/error-message`, `unicorn/throw-new-error`, `no-throw-literal`
- Don't `throw` strings or arbitrary values
- Don't reject promises with non-Errors (`prefer-promise-reject-errors`)
- Avoid useless catch blocks (`no-useless-catch`)

### Restricted APIs / footguns
- Do not use `crypto.randomUUID` / `window.crypto.randomUUID`
  - Lint forbids it because it's unavailable in non-secure contexts
  - Use `randomUUID` from the `uuid` module instead (where available in that workspace)

### JSDoc
- JSDoc is heavily enforced (`plugin:jsdoc/recommended` + rules)
- Public functions/classes/methods typically require doc blocks
- In TS, prefer TS types over JSDoc types (many JSDoc type usages are disallowed)

## Markdown
- Use `npm run markdownlint` / workspace `markdownlint`
- `how-to/*/.markdownlint.json` disables:
  - line-length
  - descriptive-link-text
  - ordered-list-marker style
  - "first line must be a heading"

## When editing
- Preserve existing patterns in the specific how-to you're working in.
- Prefer minimal, mechanical changes that satisfy lint/format.
- If you touch TS, ensure it passes workspace ESLint (type-aware).
- If you add new scripts, add them both:
  - per-workspace and root runner usage (when appropriate).
