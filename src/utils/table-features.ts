import { createFilteredRowModel, createSortedRowModel, stockFeatures } from '@tanstack/react-table'

export const dataTableFeatures = {
  ...stockFeatures,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
}
