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
  `bun run build-storybook` when changing stories. Docs-only changes need a diff
  and link check.
- Use `fn()` from `storybook/test` for story event handlers.
