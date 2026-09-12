import { rankItem } from '@tanstack/match-sorter-utils'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  type Row,
  type RowData,
  type SortingState,
  type StockFeatures,
  stockFeatures,
  useTable,
} from '@tanstack/react-table'
import { withStyle } from 'baseui'
import { Block } from 'baseui/block'
import { Search } from 'baseui/icon'
import { Input } from 'baseui/input'
import { Pagination } from 'baseui/pagination'
import {
  StyledRoot,
  StyledSortAscIcon,
  StyledSortDescIcon,
  StyledSortNoneIcon,
  StyledTable,
  StyledTableBody,
  StyledTableBodyCell,
  StyledTableBodyRow,
  StyledTableEmptyMessage,
  StyledTableHead,
  StyledTableHeadCell,
  StyledTableHeadCellSortable,
  StyledTableHeadRow,
  StyledTableLoadingMessage,
} from 'baseui/table-semantic'
import { StyledSortIconContainer } from 'baseui/table-semantic/styled-components'
import React from 'react'

const StyledTableHeadCellSortableNew = withStyle(StyledTableHeadCellSortable, ({ $theme }) => ({
  position: 'relative',
  paddingRight: $theme.sizing.scale1000,
}))

// Define the default fuzzy filter function for individual columns
// biome-ignore lint/suspicious/noExplicitAny: The reusable filter accepts heterogeneous cell values.
export const fuzzyFilter: FilterFn<StockFeatures, any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(String(row.getValue(columnId) || ''), value)
  addMeta?.({ itemRank })
  return itemRank.passed
}

// Define the props for the DataTable component
export interface DataTableProps<T extends RowData> {
  data: T[] // Array of data objects
  // biome-ignore lint/suspicious/noExplicitAny: TanStack column values are intentionally heterogeneous.
  columns: ColumnDef<StockFeatures, T, any>[] // Array of column definitions
  isLoading?: boolean // Optional loading state
  emptyMessage?: string // Optional message when no data is available
  initialSorting?: SortingState // Optional initial sorting state
  searchPlaceholder?: string // Optional placeholder for the search input
  searchFields?: string[] // Optional array of fields to search
  showSearchBar?: boolean // Optional flag to show/hide the search bar
  // Pagination props
  pagination?: {
    currentPage: number
    pageSize: number
    totalPages: number
    onPageChange: (params: { nextPage: number }) => void
  }
}

// DataTable component definition
export function DataTable<T extends RowData>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
  initialSorting = [],
  searchPlaceholder = 'Search...',
  searchFields = ['firstName', 'lastName'],
  showSearchBar = true,
  pagination,
}: DataTableProps<T>) {
  // State for sorting, column filters, and global filter
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  // Create a fuzzy filter function that searches multiple fields
  const customGlobalFilterFn = React.useCallback(
    (row: Row<StockFeatures, T>, _columnId: string, filterValue: string) => {
      const searchTerm = filterValue.toLowerCase()
      return searchFields.some((field) => {
        const value = String(row.getValue(field) || '').toLowerCase()
        return rankItem(value, searchTerm).passed
      })
    },
    [searchFields],
  )

  // Initialize table instance using v9 useTable hook
  const table = useTable({
    features: stockFeatures,
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: customGlobalFilterFn,
    manualPagination: !!pagination,
    pageCount: pagination ? pagination.totalPages : undefined,
  })

  return (
    <StyledRoot>
      {showSearchBar && !pagination && (
        <Block marginBottom="16px">
          <Input
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder={searchPlaceholder}
            clearable
            startEnhancer={() => <Search size={18} />}
            overrides={{
              Root: {
                style: {
                  width: '100%',
                  maxWidth: '300px',
                },
              },
            }}
          />
        </Block>
      )}
      <StyledTable>
        <StyledTableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <StyledTableHeadRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort()
                const HeadCell = isSortable ? StyledTableHeadCellSortableNew : StyledTableHeadCell
                const sortDirection = header.column.getIsSorted()

                return (
                  <HeadCell
                    key={header.id}
                    onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                    $isFocusVisible={false}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSortable && (
                      <StyledSortIconContainer>
                        {sortDirection === false && (
                          <StyledSortNoneIcon size="16px" aria-hidden="true" role="presentation" />
                        )}
                        {sortDirection === 'asc' && (
                          <StyledSortAscIcon size="16px" aria-hidden="true" role="presentation" />
                        )}
                        {sortDirection === 'desc' && (
                          <StyledSortDescIcon size="16px" aria-hidden="true" role="presentation" />
                        )}
                      </StyledSortIconContainer>
                    )}
                  </HeadCell>
                )
              })}
            </StyledTableHeadRow>
          ))}
        </StyledTableHead>
        <StyledTableBody>
          {isLoading ? (
            <tr>
              <td colSpan={table.getAllColumns().length}>
                <StyledTableLoadingMessage>Loading data...</StyledTableLoadingMessage>
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={table.getAllColumns().length}>
                <StyledTableEmptyMessage>{emptyMessage}</StyledTableEmptyMessage>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <StyledTableBodyRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <StyledTableBodyCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableBodyCell>
                ))}
              </StyledTableBodyRow>
            ))
          )}
        </StyledTableBody>
      </StyledTable>

      {pagination && (
        <Block marginTop="16px" display="flex" justifyContent="flex-end">
          <Pagination
            currentPage={pagination.currentPage}
            numPages={pagination.totalPages}
            onPageChange={({ nextPage }) => pagination.onPageChange({ nextPage })}
          />
        </Block>
      )}
    </StyledRoot>
  )
}
