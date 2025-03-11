// Export main component
export { DataTable } from './components/data-table';
export type { DataTableProps } from './components/data-table';

// Export sample data and utilities for easier consumption
export {
  samplePersonData,
  samplePersonColumns,
  personColumnHelper
} from './utils/sample-data';
export type { Person } from './utils/sample-data';

// For backward compatibility (will be removed in a future version)
export { DataTable as TanStackTable } from './components/data-table';
export type { DataTableProps as TanStackTableProps } from './components/data-table';