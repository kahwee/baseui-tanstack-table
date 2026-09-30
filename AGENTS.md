# Repository guidance

This package exposes `DataTable` and `CheckboxTable` built with Base Web and
TanStack Table. The README describes the consumer API; stories show UI states.

- Preserve the public exports in `src/index.ts`, including table column and
  search-field types.
- Use `baseui/checkbox-v2` for selection. Keep checkbox state controlled through
  TanStack Table and native change events.
- Use Bun and commit `bun.lock` with dependency changes. Keep its declared
  version aligned with CI.
- Run `bun run check` for source or dependency changes. Build Storybook with
  `bun run build-storybook` when changing stories, configuration, or Storybook/Vite
  dependencies. Docs-only changes need diff and link checks.
- Use `fn()` from `storybook/test` for story event handlers.
- Check `bun outdated` and `bun audit` before greenkeeping. Upgrade Vitest and its
  coverage/UI packages together; keep Storybook addons on the same stable version.
- Compile README examples against the public exports. Column helpers use TanStack
  Table v9's `createColumnHelper<StockFeatures, Row>()` signature. With external
  pagination, the caller fetches pages and the built-in search bar is hidden.
- Record prepared version bumps in `CHANGELOG.md`; do not imply they are published.
