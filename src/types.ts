import type { ColumnDef, DeepKeys, RowData, StockFeatures } from '@tanstack/react-table'

export type DataTableColumn<TData extends RowData, TValue = unknown> = ColumnDef<
  StockFeatures,
  TData,
  TValue
>

// A table can contain columns with different value types. Keep that necessary
// escape hatch in one public alias instead of leaking `any` through every API.
// biome-ignore lint/suspicious/noExplicitAny: Heterogeneous columns have distinct TValue types.
export type DataTableColumns<TData extends RowData> = ReadonlyArray<DataTableColumn<TData, any>>

export type DataTableSearchField<TData extends RowData> = DeepKeys<TData>
