# BaseUI TanStack Table

Sortable, searchable React tables built with [Base Web](https://baseweb.design/)
and [TanStack Table](https://tanstack.com/table/latest). `DataTable` handles
sorting, filtering, loading, empty states, and optional server pagination;
`CheckboxTable` adds row selection.

[Explore the Storybook examples](https://kahwee.github.io/baseui-tanstack-table/).

## Install

The package name in `package.json` is `baseui-data-table`:

```bash
npm install baseui-data-table
```

The package includes React, Base Web, TanStack Table, and Styletron dependencies.

## Use

```tsx
import { BaseProvider, LightTheme } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import {
  DataTable,
  samplePersonColumns,
  samplePersonData,
} from 'baseui-data-table';

const engine = new Styletron();

export function Example() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <DataTable
          data={samplePersonData}
          columns={samplePersonColumns}
          showSearchBar
          searchFields={['firstName', 'lastName']}
        />
      </BaseProvider>
    </StyletronProvider>
  );
}
```

Use `DataTableColumn<T>`, `DataTableColumns<T>`, and
`DataTableSearchField<T>` for typed columns and search fields. The
`CheckboxTable` stories show controlled selection and pagination.
Search fields can use nested data paths and do not need a visible column.

See [custom columns and pagination](docs/usage.md) for typed data and external
page fetching, or explore the [selection stories](src/components/checkbox-table.stories.tsx).

## Develop

```bash
bun install --frozen-lockfile
bun run check
bun run storybook
```

`bun run check` covers formatting, types, tests, and the library build.
Run `bun run build-storybook` when editing stories, configuration, or their
dependencies. Use the Bun version pinned in `package.json` and CI.

ISC license.

## CI maintenance

[GitHub Actions maintenance](.github/ACTIONS.md) covers workflows, parallel checks, action versions, and weekly updates.

Bun 1.4.4 owns formatting (`bun run format`, `bun run format:check`) and type checking
(`bun run typecheck`). Biome has been removed. Bun formatting is not a replacement
for Biome’s semantic lint rules; tests, strict type checks, and package builds remain
the verification gates. TypeScript remains installed for declaration generation.

`bun run check:source` runs formatting, Bun type checking, and tests in parallel.
`bun run check` waits for those checks before building package artifacts.
`bun run build` checks types before building. CI calls `build:artifacts` only after
a successful Bun check; TypeScript emits declarations with `--noCheck` to avoid
checking the same source again. Do not use `build:artifacts` as a validation command.

On the session’s Linux executor, the median of three project-check runs was
0.360s with Bun versus 1.547s with `bun x --no-install tsc --noEmit`.
These include command startup and describe this checkout, not a CI speed guarantee.
Declaration emission measured 1.116s with `--noCheck` versus
1.144s with checking; generated `.d.ts` contents matched.
