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
} from '@tanstack/react-table';
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
import { Input } from 'baseui/input';
import { Search } from 'baseui/icon';
import { Block } from 'baseui/block';

export interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
  emptyMessage?: string;
  initialSorting?: SortingState;
  searchPlaceholder?: string;
  searchFields?: string[];
  showSearchBar?: boolean;
}

export function DataTable<T extends object>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
  initialSorting = [],
  searchPlaceholder = 'Search...',
  searchFields = ['firstName', 'lastName'],
  showSearchBar = true,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  // Create a custom global filter function that searches multiple fields
  const customGlobalFilterFn = React.useCallback(
    (row: any, _columnId: string, filterValue: string) => {
      const searchTerm = filterValue.toLowerCase();
      
      // Search across specified fields
      return searchFields.some(field => {
        const value = row.getValue(field);
        return value && String(value).toLowerCase().includes(searchTerm);
      });
    },
    [searchFields]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters, 
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: customGlobalFilterFn,
  });

  return (
    <StyledRoot>
      {showSearchBar && (
        <Block marginBottom="16px">
          <Input
            value={globalFilter || ''}
            onChange={e => setGlobalFilter(e.currentTarget.value)}
            placeholder={searchPlaceholder}
            clearable
            startEnhancer={<Search size={18} />}
            overrides={{
              Root: {
                style: {
                  width: '100%',
                  maxWidth: '300px',
                }
              }
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
                const HeadCell = isSortable ? StyledTableHeadCellSortable : StyledTableHeadCell;
                const sortDirection = header.column.getIsSorted();
                
                return (
                  <HeadCell
                    key={header.id}
                    onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                    $isFocusVisible={false}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSortable && (
                      <>
                        {sortDirection === false && <StyledSortNoneIcon />}
                        {sortDirection === 'asc' && <StyledSortAscIcon />}
                        {sortDirection === 'desc' && <StyledSortDescIcon />}
                      </>
                    )}
                  </HeadCell>
                );
              })}
            </StyledTableHeadRow>
          ))}
        </StyledTableHead>
        <StyledTableBody>
          {isLoading ? (
            <StyledTableLoadingMessage>
              Loading data...
            </StyledTableLoadingMessage>
          ) : table.getRowModel().rows.length === 0 ? (
            <StyledTableEmptyMessage>
              {emptyMessage}
            </StyledTableEmptyMessage>
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
    </StyledRoot>
  );
}