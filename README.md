# baseui-tanstack-table

[![Lint](https://github.com/kahwee/baseui-tanstack-table/actions/workflows/lint.yml/badge.svg)](https://github.com/kahwee/baseui-tanstack-table/actions/workflows/lint.yml)
[![Storybook Build](https://github.com/kahwee/baseui-tanstack-table/actions/workflows/storybook.yml/badge.svg)](https://github.com/kahwee/baseui-tanstack-table/actions/workflows/storybook.yml)

A React component that integrates [Base Web UI](https://baseweb.design/) semantic table components with [TanStack Table](https://tanstack.com/table/latest) (formerly React Table) for powerful data tables.

## Features

- Built with TypeScript for type safety
- Fully styled with Base Web UI components
- Flexible and powerful data manipulation with TanStack Table
- Sortable columns with appropriate UI indicators
- Loading and empty state handling
- Responsive design

## Installation

```bash
npm install baseui-tanstack-table
```

## Usage

First, set up your Base Web UI provider:

```tsx
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { TanStackTable } from 'baseui-tanstack-table';

const engine = new Styletron();

function App() {
  // Define your data and columns
  
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <TanStackTable 
          data={data} 
          columns={columns} 
        />
      </BaseProvider>
    </StyletronProvider>
  );
}
```

## Development

1. Clone the repository
2. Install dependencies: `npm install --legacy-peer-deps`
3. Run Storybook: `npm run storybook`

### Code Conventions

- TypeScript for type safety
- React 19 with Vite for modern build tooling
- Functional React components with hooks
- kebab-case for file names (e.g., `tan-stack-table.tsx`)
- PascalCase for component names and interfaces
- camelCase for variables and functions
- ES modules throughout the codebase

## License

ISC