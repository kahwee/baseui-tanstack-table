# Changelog

## Unreleased

- Use Bun 1.4.4 for formatting and type checking; remove Biome. Keep TypeScript for declaration output.
- Pin GitHub Actions to verified stable release commits and use `bun ci` for frozen installs.

## 1.0.5 (unreleased)

- Update TanStack Table to 9.3.1 and matching search utilities to 9.2.6.
- Refresh Storybook and its addons to 10.6.2, Vitest/coverage/UI to 5.0.4, Vite to 8.3.4, and Node types to 26.6.5.

## 1.0.4 (unreleased)

- Update compatible development tooling and refresh dependency security fixes.

## 1.0.3 (unreleased)

- Refresh compatible dependencies and GitHub Actions; update Storybook to 10.6.1.

## 1.0.2 (unreleased)

- Refresh Vite to 8.3.1, Vitest/coverage/UI to 5.0.2, and Node types to 26.6.3.
- Add a typed custom-data example and clarify external pagination.
- Register TanStack's filtered and sorted row models so table search and sorting work.
- Share typed search logic between both tables; support nested data fields even when they have no visible column.
