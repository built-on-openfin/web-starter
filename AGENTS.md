# AGENTS.md (web-starter)

npm-workspaces monorepo of HERE (OpenFin) core-web how-to samples and shared packages.

- Node 22+, package manager: npm
- Workspaces: listed in root `package.json` (`how-to/*` samples + `packages/*`). `how-to/cloud-interop*` are not workspaces: install/build them from their own folder; `how-to/hints-and-tips` is docs only
- No test runner — focus on build + lint + format
- ESLint/Prettier are configured once at the root; how-tos have no lint scripts or configs of their own

## Essential commands

```sh
npm ci                    # install
npm run build             # build all workspaces (sequential, fails fast)
npm run eslint            # lint all
npm run prettier-check    # format check (read-only)
```

Single workspace: `npm -w how-to/<name> run <script>` (build, start).

## Detail docs

- [Commands reference](docs/agents/commands.md) — full command list, CI pipeline, packaging
- [Code style](docs/agents/code-style.md) — Prettier config, import ordering, restricted APIs
- [TypeScript](docs/agents/typescript.md) — ESLint rules, JSDoc, notable overrides

## When editing

- Preserve existing patterns in the specific how-to you're working in.
- Keep dependencies hoisted at the root where shared; add per-how-to deps only if that sample needs them.
