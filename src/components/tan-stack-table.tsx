import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
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

export interface TanStackTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function TanStackTable<T extends object>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
}: TanStackTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <StyledRoot>
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