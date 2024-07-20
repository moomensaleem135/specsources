'use client';

import React, { useEffect, useState } from 'react';
import { ColDef } from '@ag-grid-community/core';

import AgGridTable from '@/components/ui/ag-table';

import { ISales } from '@/lib/types';

interface ISalesTable {
  enablePagination?: boolean;
  customHeight?: number;
  sales: ISales[];
}

const SalesTable: React.FC<ISalesTable> = ({
  enablePagination = false,
  customHeight,
  sales,
}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>('20');
  const [rowData, setRowData] = useState<ISales[]>([]);

  const columns: ColDef[] = [
    { headerName: 'Order Date', field: 'orderDate', minWidth: 150 },
    { headerName: 'Account #', field: 'accountNumber', minWidth: 150 },
    { headerName: 'Bill To Address', field: 'billToAddress', minWidth: 150 },
    { headerName: 'Status', field: 'status', minWidth: 150 },
    { headerName: 'Sub Total', field: 'subTotal', minWidth: 150 },
    { headerName: 'Tax', field: 'tax', minWidth: 150 },
    { headerName: 'Total Amount', field: 'totalAmount', minWidth: 150 },
  ];

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
      enablePagination={enablePagination && sales.length > Number(pageSize)}
      onPageChange={setPage}
      customHeight={customHeight}
      pageClassName="mx-0"
    />
  );
};

export default SalesTable;
