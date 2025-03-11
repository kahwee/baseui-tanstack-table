# baseui-data-table

[![Lint](https://github.com/kahwee/baseui-data-table/actions/workflows/lint.yml/badge.svg)](https://github.com/kahwee/baseui-data-table/actions/workflows/lint.yml)
[![Storybook Build](https://github.com/kahwee/baseui-data-table/actions/workflows/storybook.yml/badge.svg)](https://github.com/kahwee/baseui-data-table/actions/workflows/storybook.yml)

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
npm install baseui-data-table
```

## Usage

### Basic Example

First, set up your Base Web UI provider:

```tsx
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { DataTable } from 'baseui-data-table';

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
import { DataTable, samplePersonData, samplePersonColumns } from 'baseui-data-table';

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
import { DataTable } from 'baseui-data-table';

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
import { DataTable } from 'baseui-data-table';
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

1. Clone the repository
2. Install dependencies: `npm install --legacy-peer-deps`
3. Run Storybook: `npm run storybook`
4. Build the library: `npm run build`

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