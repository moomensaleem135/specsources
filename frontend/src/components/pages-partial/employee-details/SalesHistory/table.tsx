'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ColDef, SortChangedEvent } from '@ag-grid-community/core';

import AgGridTable from '@/components/ui/ag-table';

import { ISales } from '@/lib/types';

const columns: ColDef[] = [
  {
    headerName: 'Order Date',
    field: 'OrderDate',
    minWidth: 150,
  },
  {
    headerName: 'Account #',
    field: 'AccountNumber',
    minWidth: 150,
  },
  {
    headerName: 'Bill To Address',
    field: 'billToAddress',
    minWidth: 150,
    valueGetter: (params) =>
      `${params.data.BillToAddressID.AddressLine1 || ''} ${params.data.BillToAddressID.AddressLine2 || ''} ${params.data.BillToAddressID.PostalCode || ''} ${params.data.BillToAddressID.City || ''}`.trim(),
  },
  {
    headerName: 'Status',
    field: 'Status',
    minWidth: 150,
  },
  { headerName: 'Sub Total', field: 'SubTotal', minWidth: 150 },
  {
    headerName: 'Total Amount',
    field: 'TotalDue',
    minWidth: 150,
  },
];

interface ISalesTable {
  enablePagination?: boolean;
  customHeight?: number;
  sales: ISales[];
  page: number;
  setPage: React.Dispatch<number>;
}

const SalesTable: React.FC<ISalesTable> = ({
  enablePagination = false,
  customHeight,
  sales,
  page,
  setPage,
}) => {
  // states
  const [pageSize, setPageSize] = useState<string>('20');
  const [rowData, setRowData] = useState<ISales[]>([]);
  const [sortState, setSortState] = useState<{
    sortColumn: string;
    sortDirection: string;
  }>({
    sortColumn: '',
    sortDirection: '',
  });

  // handlers
  const handleSortChange = useCallback((event: SortChangedEvent) => {}, []);

  // effect to set rows
  useEffect(() => {
    setRowData(sales);
  }, [sales]);

  return (
    <AgGridTable
      columns={columns}
      rowData={rowData}
      pageSize={pageSize}
      setPageSize={setPageSize}
      currentPage={page}
      setCurrentPage={setPage}
      totalRows={sales.length}
      enablePagination={enablePagination}
      onPageChange={setPage}
      customHeight={customHeight}
      pageClassName="mx-0"
      onSortChanged={handleSortChange}
    />
  );
};

export default SalesTable;
