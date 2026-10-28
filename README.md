# BaseUI TanStack Table

Sortable, searchable React tables built with Base Web and TanStack Table.
`DataTable` supports loading, empty states, and server pagination;
`CheckboxTable` adds row selection.

[Storybook](https://kahwee.github.io/baseui-tanstack-table/) ·
[Usage and pagination](docs/usage.md) · [Changelog](CHANGELOG.md)

## Install locally

`baseui-data-table@1.0.6` is an **unpublished candidate**. The npm package endpoint
returned 404 on October 28, 2026; the name is not confirmed as reserved.
From this checkout, use Bun 1.4.4:

```sh
bun ci
bun run check
bun pm pack
# In your app:
bun add /path/to/baseui-data-table-1.0.6.tgz
```

The package includes React 19, Base Web, TanStack Table, and Styletron dependencies.
Render inside [Base Web and Styletron providers](docs/usage.md#providers):

```tsx
import { DataTable, samplePersonColumns, samplePersonData } from 'baseui-data-table';

export function Example() {
  return <DataTable data={samplePersonData} columns={samplePersonColumns} />;
}
```

See the usage guide for typed custom columns, nested search fields, and external
pagination, or the [selection stories](src/components/checkbox-table.stories.tsx).

## Develop

`bun run check` runs parallel source checks before the library build.
Use `bun run storybook` to explore components and `bun run build-storybook` after
Storybook changes. Bun formats/checks types; TypeScript emits declarations.

[CI maintenance](.github/ACTIONS.md) · [Build details and measurements](docs/build-performance.md) ·
[Publishing approval proposal](docs/actions-publishing.md)

ISC license.
