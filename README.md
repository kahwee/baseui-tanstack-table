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

## Your own data

Define columns with the TanStack Table v9 helper, then render them inside the
providers from the example above:

```tsx
import { createColumnHelper, type StockFeatures } from '@tanstack/react-table';
import { DataTable, type DataTableColumns } from 'baseui-data-table';

type Book = { title: string; author: string; year: number };
const column = createColumnHelper<StockFeatures, Book>();
const columns: DataTableColumns<Book> = [
  column.accessor('title', { header: 'Title' }),
  column.accessor('author', { header: 'Author' }),
  column.accessor('year', { header: 'Year' }),
];
const books: Book[] = [
  { title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', year: 1968 },
  { title: 'Kindred', author: 'Octavia E. Butler', year: 1979 },
];

export function BooksTable() {
  return (
    <DataTable
      data={books}
      columns={columns}
      searchFields={['title', 'author']}
      searchPlaceholder="Search books"
      emptyMessage="No books found"
    />
  );
}
```

Use `isLoading` while fetching data. For external pagination, pass `pagination`
with `currentPage`, `pageSize`, `totalPages`, and `onPageChange({ nextPage })`.
The caller supplies each page of data; the built-in search bar is hidden in this
mode. See the [pagination stories](src/components/data-table.stories.tsx) for a
complete example.

## Develop

```bash
bun install --frozen-lockfile
bun run check
bun run storybook
```

`bun run check` covers formatting, lint, types, tests, and the library build.
Run `bun run build-storybook` when editing stories, configuration, or their
dependencies. Use the Bun version pinned in `package.json` and CI.

ISC license.
