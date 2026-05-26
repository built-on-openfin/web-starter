# Commands reference

## Root commands

Install:

- `npm ci` (CI) or `npm install` (local)

Build all:

- `npm run build` — runs `node scripts/workspaces.mjs build` (sequential, fails fast)

Lint/format all:

- `npm run prettier-check` (read-only check)
- `npm run eslint`
- `npm run validate` — runs `prettier --write` then `eslint` (writes files, avoid in CI)

Packaging:

- `npm run package` (see `scripts/package.js`)
- `npm run package-for-github`
- `npm run package-for-aws`

## Single-workspace commands

Use npm workspaces to target one how-to. Example workspace: `how-to/web-interop-basic`

- `npm -w how-to/web-interop-basic run build`
- `npm -w how-to/web-interop-basic run start` (dev server, serves `public/`)
- `npm -w how-to/web-interop-basic run eslint`
- `npm -w how-to/web-interop-basic run prettier-check`

## CI pipeline

Recommended check-only pipeline:

```sh
npm ci
npm run build
npm run prettier-check
npm run eslint
```

Avoid `npm run validate` in CI (it formats/writes).

## Tests

No test runner is configured. If you add tests, also add:

- Root `npm run test`
- Workspace `npm -w how-to/<name> run test`
- Single-test example (e.g. `npm test -- -t <pattern>`)
