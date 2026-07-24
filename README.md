# baseui-tanstack-table

[![Lint](https://github.com/kahwee/baseui-tanstack-table/actions/workflows/lint.yml/badge.svg)](https://github.com/kahwee/baseui-tanstack-table/actions/workflows/lint.yml)
[![Storybook Build](https://github.com/kahwee/baseui-tanstack-table/actions/workflows/storybook.yml/badge.svg)](https://github.com/kahwee/baseui-tanstack-table/actions/workflows/storybook.yml)

**[View the live Storybook demo](https://kahwee.github.io/baseui-tanstack-table/)**

A React component that integrates [Base Web UI](https://baseweb.design/) semantic table components with [TanStack Table](https://tanstack.com/table/latest) (formerly React Table) for powerful data tables.

## Features

- Built with TypeScript for type safety
- Fully styled with Base Web UI components
- Flexible and powerful data manipulation with TanStack Table
- Sortable columns with appropriate UI indicators
- Real-time search filtering across multiple fields
- Loading and empty state handling
- Responsive design

## Installation

```bash
npm install baseui-tanstack-table
```

## Usage

### Basic Example

First, set up your Base Web UI provider:

```tsx
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { DataTable } from 'baseui-tanstack-table';

const engine = new Styletron();

function App() {
  // Define your data and columns
  
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <DataTable 
          data={data} 
          columns={columns} 
        />
      </BaseProvider>
    </StyletronProvider>
  );
}
```

### With Sample Data

The package includes sample data and columns for quick testing:

```tsx
import { DataTable, samplePersonData, samplePersonColumns } from 'baseui-tanstack-table';

function ExampleTable() {
  return (
    <DataTable 
      data={samplePersonData} 
      columns={samplePersonColumns} 
    />
  );
}
```

### With Search Functionality

```tsx
import { DataTable } from 'baseui-tanstack-table';

function SearchableTable() {
  return (
    <DataTable 
      data={samplePersonData} 
      columns={samplePersonColumns} 
      searchPlaceholder="Search by name..."
      searchFields={['firstName', 'lastName']}
    />
  );
}
```

### Advanced Usage

```tsx
import { DataTable } from 'baseui-tanstack-table';
import { createColumnHelper } from '@tanstack/react-table';

// Define your data interface
interface User {
  id: number;
  name: string;
  email: string;
  // other fields...
}

// Create a column helper for your data type
const columnHelper = createColumnHelper<User>();

// Define your columns
const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  // other columns...
];

// Component usage
function MyTable() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch your data
    fetchData().then(result => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  return (
    <DataTable 
      data={data} 
      columns={columns} 
      isLoading={isLoading}
      emptyMessage="No users found"
      initialSorting={[{ id: 'name', desc: false }]}
      searchPlaceholder="Search users..."
      searchFields={['name', 'email']}
      showSearchBar={true}
    />
  );
}
```

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/kahwee/baseui-tanstack-table.git
   cd baseui-tanstack-table
   ```
2. Install [Bun](https://bun.sh/) 1.3.14 or newer.
3. Install dependencies: `bun install --frozen-lockfile`
4. Run Storybook: `bun run storybook`
5. Build the library: `bun run build`

### Bun commands

This repository uses Bun as its package manager and declares `bun@1.3.14` in
`package.json`. Use Bun commands rather than npm so the committed `bun.lock`
remains authoritative:

```bash
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun run test:run
bun run build
bun run build-storybook
```

TypeScript remains on the highest version supported by the current ESLint and
declaration-build toolchain. TypeScript 7 is not used until those tools support
its API.

### Code Conventions

- TypeScript for type safety
- React 19 with Vite for modern build tooling
- Functional React components with hooks
- kebab-case for file names (e.g., `data-table.tsx`)
- PascalCase for component names and interfaces
- camelCase for variables and functions
- ES modules throughout the codebase

## License

ISC