import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn, RowData, StockFeatures } from '@tanstack/react-table'
import type { DataTableSearchField } from '../types'

function getFieldValue(row: RowData, field: string): unknown {
  return field.split('.').reduce<unknown>((value, key) => {
    if (value === null || typeof value !== 'object') return undefined
    return (value as Record<string, unknown>)[key]
  }, row)
}

export function createGlobalFilter<T extends RowData>(
  searchFields?: readonly DataTableSearchField<T>[],
): FilterFn<StockFeatures, T> {
  return (row, columnId, filterValue: unknown) => {
    const query = String(filterValue ?? '')
    if (!searchFields?.length) {
      return rankItem(String(row.getValue(columnId) ?? ''), query).passed
    }

    return searchFields.some(
      (field) => rankItem(String(getFieldValue(row.original, field) ?? ''), query).passed,
    )
  }
}
