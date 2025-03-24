import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  flexRender,
  ColumnDef,
  FilterFn,
  Row,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  StyledRoot,
  StyledTable,
  StyledTableHead,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableHeadCellSortable,
  StyledSortAscIcon,
  StyledSortDescIcon,
  StyledSortNoneIcon,
  StyledTableBody,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledTableEmptyMessage,
  StyledTableLoadingMessage,
} from 'baseui/table-semantic';
import { StyledSortIconContainer } from 'baseui/table-semantic/styled-components';
import { Input } from 'baseui/input';
import { Search } from 'baseui/icon';
import { Block } from 'baseui/block';
import { withStyle } from 'baseui';
import { Pagination } from 'baseui/pagination';

const StyledTableHeadCellSortableNew = withStyle(StyledTableHeadCellSortable, ({ $theme }) => ({
  position: 'relative',
  paddingRight: $theme.sizing.scale1000,
}));

// Define the default fuzzy filter function for individual columns
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
// Define the props for the DataTable component
export interface DataTableProps<T extends object> {
  data: T[]; // Array of data objects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]; // Array of column definitions
  isLoading?: boolean; // Optional loading state
  emptyMessage?: string; // Optional message when no data is available
  initialSorting?: SortingState; // Optional initial sorting state
  searchPlaceholder?: string; // Optional placeholder for the search input
  searchFields?: string[]; // Optional array of fields to search
  showSearchBar?: boolean; // Optional flag to show/hide the search bar
  // Pagination props
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    onPageChange: (params: { nextPage: number }) => void;
  };
}

// DataTable component definition
export function DataTable<T extends object>({
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
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  // Create a fuzzy filter function that searches multiple fields
  const customGlobalFilterFn = React.useCallback(
    (row: Row<T>, _columnId: string, filterValue: string) => {
      const searchTerm = filterValue.toLowerCase();

      // Search across specified fields using fuzzy matching
      return searchFields.some((field) => {
        const value = row.getValue(field);
        if (!value) return false;
        
        // Use rankItem for fuzzy matching
        const itemRank = rankItem(String(value), searchTerm);
        return itemRank.passed;
      });
    },
    [searchFields],
  );

  // Initialize the table instance using useReactTable hook
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Only use client-side filtering if not using server-side pagination
    getFilteredRowModel: pagination ? undefined : getFilteredRowModel(),
    globalFilterFn: customGlobalFilterFn,
    // Disable manual mode when using server-side pagination
    manualPagination: !!pagination,
  });

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
                const isSortable = header.column.getCanSort();
                const HeadCell = isSortable ? StyledTableHeadCellSortableNew : StyledTableHeadCell;
                const sortDirection = header.column.getIsSorted();

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
                );
              })}
            </StyledTableHeadRow>
          ))}
        </StyledTableHead>
        <StyledTableBody>
          {isLoading ? (
            <StyledTableLoadingMessage>Loading data...</StyledTableLoadingMessage>
          ) : table.getRowModel().rows.length === 0 ? (
            <StyledTableEmptyMessage>{emptyMessage}</StyledTableEmptyMessage>
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
            onPageChange={pagination.onPageChange}
          />
        </Block>
      )}
    </StyledRoot>
  );
}
