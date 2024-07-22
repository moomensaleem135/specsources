'use client';

import React, { memo } from 'react';
import { ColDef } from '@ag-grid-community/core';

import AgGridTable from '@/components/ui/ag-table';

import { IEmployee } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { employeesUrl } from '@/constants';
import { SpinnerIcon } from '@/assets/icons';

interface IEmployeesTable {
  enablePagination?: boolean;
  customHeight?: number;
  employees: IEmployee[];
  loading: boolean;
  page: number;
  setPage: React.Dispatch<number>;
  pageSize: string;
  setPageSize: React.Dispatch<string>;
  totalRows?: number;
}

const columns: ColDef[] = [
  {
    headerName: 'Name',
    field: 'name',
    valueGetter: (params) =>
      `${params.data.FirstName || ''} ${params.data.MiddleName || ''} ${params.data.LastName || ''}`.trim(),
    minWidth: 150,
  },
  {
    headerName: 'Email Address',
    field: 'EmailAddress',
    width: 300,
    minWidth: 300,
  },
  { headerName: 'Department', field: 'StateProvinceName', minWidth: 150 },
  { headerName: 'Job Title', field: 'JobTitle', minWidth: 150 },
  { headerName: 'Start Date', field: 'StartDate', minWidth: 150 },
  { headerName: 'Phone Number', field: 'PhoneNumber', minWidth: 150 },
  { headerName: 'Birthday', field: 'BirthDate', minWidth: 150 },
  {
    headerName: 'Home Address',
    field: 'AddressLine1',
    width: 300,
    minWidth: 300,
  },
];

const EmployeesTable: React.FC<IEmployeesTable> = ({
  enablePagination = false,
  customHeight,
  employees,
  loading,
  page,
  setPage,
  totalRows,
  pageSize,
  setPageSize,
}) => {
  // router
  const router = useRouter();

  // handler
  const onRowClicked = (params: any) => {
    const { data } = params;
    router.push(`${employeesUrl}/details?id=${data.BusinessEntityID}`);
  };

  return (
    <AgGridTable
      columns={columns}
      rowData={employees}
      pageSize={pageSize}
      setPageSize={setPageSize}
      currentPage={page}
      setCurrentPage={setPage}
      totalRows={totalRows}
      enablePagination={enablePagination}
      onPageChange={setPage}
      customHeight={customHeight}
      onRowClicked={onRowClicked}
      loadingCellRenderer={<SpinnerIcon />}
      suppressLoadingOverlay={true}
      getRowId={(params) => params.data.BusinessEntityID}
    />
  );
};

export default memo(EmployeesTable);
