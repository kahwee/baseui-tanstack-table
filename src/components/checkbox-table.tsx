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
  type Row,
  RowSelectionState,
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
import { StyledSortIconContainer } from 'baseui/table-semantic/styled-components';
import { Input } from 'baseui/input';
import { Search } from 'baseui/icon';
import { Block } from 'baseui/block';
import { withStyle } from 'baseui';
import { Checkbox } from 'baseui/checkbox';

const StyledTableHeadCellSortableNew = withStyle(StyledTableHeadCellSortable, ({ $theme }) => ({
  position: 'relative',
  paddingRight: $theme.sizing.scale1000,
}));

// Define the props for the CheckboxTable component
export interface CheckboxTableProps<T extends object> {
  data: T[]; // Array of data objects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]; // Array of column definitions
  isLoading?: boolean; // Optional loading state
  emptyMessage?: string; // Optional message when no data is available
  initialSorting?: SortingState; // Optional initial sorting state
  searchPlaceholder?: string; // Optional placeholder for the search input
  searchFields?: string[]; // Optional array of fields to search
  showSearchBar?: boolean; // Optional flag to show/hide the search bar
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void; // Optional callback for row selection changes
  initialRowSelection?: RowSelectionState; // Optional initial row selection state
}

// CheckboxTable component definition
export function CheckboxTable<T extends object>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
  initialSorting = [],
  searchPlaceholder = 'Search...',
  searchFields = ['firstName', 'lastName'],
  showSearchBar = true,
  onRowSelectionChange,
  initialRowSelection = {},
}: CheckboxTableProps<T>) {
  // State for sorting, column filters, and global filter
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(initialRowSelection);

  // Create a custom global filter function that searches multiple fields
  const customGlobalFilterFn = React.useCallback(
    (row: Row<T>, _columnId: string, filterValue: string) => {
      const searchTerm = filterValue.toLowerCase();

      // Search across specified fields
      return searchFields.some((field) => {
        const value = row.getValue(field);
        return value && String(value).toLowerCase().includes(searchTerm);
      });
    },
    [searchFields],
  );

  // Handle row selection changes
  React.useEffect(() => {
    onRowSelectionChange?.(rowSelection);
  }, [rowSelection, onRowSelectionChange]);

  // Create select column and combine with provided columns
  const allColumns = React.useMemo(() => {
    // Create a select column definition for row selection checkboxes
    const selectColumn: ColumnDef<T, unknown> = {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          isIndeterminate={table.getIsSomeRowsSelected()}
          onChange={() => table.toggleAllRowsSelected()}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label={`Select row ${row.index}`}
        />
      ),
      enableSorting: false,
    };

    return [selectColumn, ...columns];
  }, [columns]);

  // Initialize the table instance using useReactTable hook
  const table = useReactTable({
    data,
    columns: allColumns,
    state: { sorting, columnFilters, globalFilter, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
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
            onChange={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder={searchPlaceholder}
            clearable
            startEnhancer={<Search size={18} />}
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

      {Object.keys(rowSelection).length > 0 && (
        <Block marginTop="16px">
          <div>
            Selected {Object.keys(rowSelection).length} of {data.length} rows
          </div>
        </Block>
      )}
    </StyledRoot>
  );
}
