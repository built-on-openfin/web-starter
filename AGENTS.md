# AGENTS.md (web-starter)

npm-workspaces monorepo of HERE (OpenFin) core-web how-to samples and shared packages.

- Node 22+, package manager: npm
- Workspaces: `how-to/*` (samples), `packages/*` (shared config)
- No test runner — focus on build + lint + format

## Essential commands

```sh
npm ci                    # install
npm run build             # build all workspaces (sequential, fails fast)
npm run eslint            # lint all
npm run prettier-check    # format check (read-only)
```

Single workspace: `npm -w how-to/<name> run <script>` (build, start, eslint, prettier-check).

## Detail docs

- [Commands reference](docs/agents/commands.md) — full command list, CI pipeline, packaging
- [Code style](docs/agents/code-style.md) — Prettier config, import ordering, restricted APIs
- [TypeScript](docs/agents/typescript.md) — ESLint rules, JSDoc, notable overrides

## When editing

- Preserve existing patterns in the specific how-to you're working in.
- If you add new scripts, add them both per-workspace and to root runner usage when appropriate.
