# AGENTS

## Project Summary

sheetmerge is a monorepo for merging Excel sheets. This repo currently contains tooling, structure, and workflow configuration only; no application code is committed yet.

## Required Workflow (Centy)

- Use the `centy` CLI for all issue tracking, docs, and metadata updates.
- Never edit or create files inside `.centy/` by hand.
- For each task, create a Centy issue, set it to `pending` while working, and close it when done.

## Tooling and Commands

- Package manager: `pnpm` (root `package.json` and `pnpm-workspace.yaml`).
- Monorepo orchestration: `turbo` via `turbo.json`.
- Linting: `eslint` with custom local rules.
- Spelling: `cspell` via `cspell.json`.
- Git hooks: `husky` in `.husky/`.

Root scripts:

- `pnpm lint`
- `pnpm spellcheck`

## Repo Structure

- `apps/web` and `apps/api` (applications)
- `packages/core`, `packages/cli`, `packages/ui` (shared packages)
- `docs/` (project documentation)
- `eslint-rules/` (custom ESLint rules)

## ESLint Custom Rules

Local plugin lives in `eslint-rules/` and is wired in `eslint.config.cjs`:

- `local/max-file-lines`: max 100 lines per file.
- `local/max-exports`: max 1 non-type export per file.
- TypeScript: do not use `as` type assertions (enforced by ESLint).
- `local/function-structure`: every logic function lives in a folder named after the function, with `<name>/<name>.ts`, `<name>/<name>.spec.ts`, and `<name>/index.ts` (applies across the repo).

Rule files are split so each stays under 100 lines:

- `eslint-rules/max-file-lines.cjs`
- `eslint-rules/max-exports.cjs`
- `eslint-rules/index.cjs` (exports all rules)

## CSpell Ignore Paths

`cspell.json` ignores common noise, including:

- `**/pnpm-lock.yaml`, `**/yarn.lock`, `**/package-lock.json`
- `**/node_modules/**`, `**/.turbo/**`, `**/dist/**`, `**/coverage/**`
- `**/.git/**`, `**/.husky/**`

## Husky Notes

Hooks are plain shell scripts in `.husky/`.

- Keep hooks ASCII and avoid BOM headers to prevent `env: No such file or directory` errors on Windows.
