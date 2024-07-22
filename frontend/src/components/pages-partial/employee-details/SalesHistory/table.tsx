'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import { ColDef, SortChangedEvent } from '@ag-grid-community/core';

import AgGridTable from '@/components/ui/ag-table';

import { ISales } from '@/lib/types';

const statusOptions = [
  { value: 1, name: 'In process' },
  { value: 2, name: 'Approved' },
  { value: 3, name: 'Backordered' },
  { value: 4, name: 'Rejected' },
  { value: 5, name: 'Shipped' },
  { value: 6, name: 'Cancelled' },
];

const columns: ColDef[] = [
  {
    headerName: 'Order Date',
    field: 'OrderDate',
    minWidth: 150,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
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
    valueGetter: (params) => {
      const status = statusOptions.find(
        (option) => option.value === params.data.Status
      );
      return status ? status.name : 'Unknown';
    },
  },
  {
    headerName: 'Sub Total',
    field: 'SubTotal',
    minWidth: 150,
    valueFormatter: (params) => {
      const value = parseFloat(params.value);
      return isNaN(value) ? '' : `$${value.toFixed(2)}`;
    },
  },
  {
    headerName: 'Total Amount',
    field: 'TotalDue',
    minWidth: 150,
    valueFormatter: (params) => {
      const value = parseFloat(params.value);
      return isNaN(value) ? '' : `$${value.toFixed(2)}`;
    },
  },
];

interface ISalesTable {
  enablePagination?: boolean;
  customHeight?: number;
  sales: ISales[];
  page: number;
  setPage: React.Dispatch<number>;
  totalRows: number;
  pageSize: string;
  setPageSize: React.Dispatch<string>;
}

const SalesTable: React.FC<ISalesTable> = ({
  enablePagination = false,
  customHeight,
  sales,
  page,
  setPage,
  totalRows,
  pageSize,
  setPageSize,
}) => {
  // handlers
  const handleSortChange = useCallback((event: SortChangedEvent) => {}, []);

  return (
    <AgGridTable
      columns={columns}
      rowData={sales}
      pageSize={pageSize}
      setPageSize={setPageSize}
      currentPage={page}
      setCurrentPage={setPage}
      totalRows={totalRows}
      enablePagination={enablePagination}
      onPageChange={setPage}
      customHeight={customHeight}
      pageClassName="mx-0"
      onSortChanged={handleSortChange}
      getRowId={(params) => params.data.SalesOrderID}
    />
  );
};

export default memo(SalesTable);
