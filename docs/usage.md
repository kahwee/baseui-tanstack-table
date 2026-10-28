# Table data and pagination

## Providers

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

Create the Styletron client once for a browser app. For server rendering, use your
framework’s Styletron SSR setup.

Use `DataTableColumn<T>`, `DataTableColumns<T>`, and `DataTableSearchField<T>`
for typed columns and search fields. Search fields can address nested data without
a visible column. `CheckboxTable` adds controlled row selection; see its
[stories](../src/components/checkbox-table.stories.tsx).

## Your own data

Define columns with the TanStack Table v9 helper, then render them inside the
providers above:

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
mode. See the [pagination stories](../src/components/data-table.stories.tsx) for a
complete example.
