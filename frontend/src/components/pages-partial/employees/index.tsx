'use client';
import React, { useMemo } from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import EmployeesTable from './table';
import { FilterOptions } from './FilterOptions';
import useWindowSize from '@/hooks/use-window-size';
import { useFetchEmployeesQuery } from '@/store/features/company/companyApi';
import { generateMockEmployees } from '@/lib/mocks';
import { IEmployeesRequestParams } from '@/lib/types';

export default function PartialEmployees() {
  // states
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>('');
  const [selectedJobTitle, setSelectedJobTitle] = React.useState<string>('');
  const [searchedText, setSearchedText] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);

  // args
  const queryArgs: IEmployeesRequestParams = {
    search: searchedText,
    page,
    JobTitle: selectedJobTitle,
  };

  // rtq
  const {
    data: employeesData,
    isLoading: employeesLoading,
    error: employeesError,
  } = useFetchEmployeesQuery(queryArgs);

  const { isMobile } = useWindowSize();

  // handlers
  const onDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  const onJobtitleChange = (value: string) => {
    setSelectedJobTitle(value);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  // memorized employees
  const employees = useMemo(
    () =>
      employeesError ? generateMockEmployees(50) : employeesData?.results || [],
    [employeesData, employeesError]
  );

  return (
    <AppLayout title="Employees">
      <div className="flex flex-col self-stretch w-full gap-y-4 bg-foreground rounded-2xl border border-border">
        <FilterOptions
          onDepartmentChange={onDepartmentChange}
          onJobtitleChange={onJobtitleChange}
          onSearchChange={onSearchChange}
        />
        <div className="grid grid-cols-12 w-full gap-4">
          <div className="col-span-12 h-[660px] md:h-[750px]">
            <EmployeesTable
              enablePagination
              customHeight={isMobile ? 590 : 700}
              employees={employees}
              loading={employeesLoading}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
