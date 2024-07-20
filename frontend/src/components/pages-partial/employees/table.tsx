'use client';

import React, { useEffect, useState } from 'react';
import { ColDef } from '@ag-grid-community/core';

import AgGridTable from '@/components/ui/ag-table';

import { IEmployee } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { employeesUrl } from '@/constants';

interface IEmployeesTable {
  enablePagination?: boolean;
  customHeight?: number;
  employees: IEmployee[];
}

const EmployeesTable: React.FC<IEmployeesTable> = ({
  enablePagination = false,
  customHeight,
  employees,
}) => {
  // states
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>('20');
  const [rowData, setRowData] = useState<IEmployee[]>([]);

  // router
  const router = useRouter();

  const columns: ColDef[] = [
    { headerName: 'Name', field: 'name', minWidth: 150 },
    {
      headerName: 'Email Address',
      field: 'email',
      width: 300,
      minWidth: 300,
    },
    { headerName: 'Department', field: 'department', minWidth: 150 },
    { headerName: 'Job Title', field: 'jobTitle', minWidth: 150 },
    { headerName: 'Start Date', field: 'startData', minWidth: 150 },
    { headerName: 'Phone Number', field: 'phoneNumber', minWidth: 150 },
    { headerName: 'Birthday', field: 'birthday', minWidth: 150 },
    {
      headerName: 'Home Address',
      field: 'homeAddress',
      width: 300,
      minWidth: 300,
    },
  ];

  const onRowClicked = (params: any) => {
    router.push(`${employeesUrl}/details?id=${123}`);
  };

  useEffect(() => {
    setRowData(employees);
  }, [employees]);

  return (
    <AgGridTable
      columns={columns}
      rowData={rowData}
      pageSize={pageSize}
      setPageSize={setPageSize}
      currentPage={page}
      setCurrentPage={setPage}
      totalRows={employees.length}
      enablePagination={enablePagination && employees.length > Number(pageSize)}
      onPageChange={setPage}
      customHeight={customHeight}
      onRowClicked={onRowClicked}
    />
  );
};

export default EmployeesTable;
