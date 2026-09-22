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

## Develop

```bash
bun install --frozen-lockfile
bun run check
bun run storybook
```

`bun run check` covers formatting, lint, types, tests, and the library build.
Run `bun run build-storybook` when editing stories.

ISC license.
