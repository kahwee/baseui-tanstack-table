// Export main component

export type { DataTableProps, DataTableProps as TanStackTableProps } from './components/data-table'
export { DataTable, DataTable as TanStackTable } from './components/data-table'
export type { CheckboxTableProps } from './components/checkbox-table'
export { CheckboxTable } from './components/checkbox-table'
export type { DataTableColumn, DataTableColumns, DataTableSearchField } from './types'
export type { Person } from './utils/sample-data'
// Export sample data and utilities for easier consumption
export { personColumnHelper, samplePersonColumns, samplePersonData } from './utils/sample-data'
