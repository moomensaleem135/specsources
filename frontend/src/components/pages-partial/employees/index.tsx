'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import EmployeesTable from './table';
import { FilterOptions } from './FilterOptions';
import useWindowSize from '@/hooks/use-window-size';
import { useLazyFetchEmployeesQuery } from '@/store/features/company/companyApi';
import { generateMockEmployees } from '@/lib/mocks';
import { IEmployeesRequestParams } from '@/lib/types';

export default function PartialEmployees() {
  // states
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>('');
  const [searchedText, setSearchedText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>('20');

  // args
  const queryArgs: IEmployeesRequestParams = useMemo(
    () => ({
      offset: page,
      limit: Number(pageSize),
      search: searchedText,
      JobTitle: selectedJobTitle,
      Department: selectedDepartment,
    }),
    [page, pageSize, searchedText, selectedDepartment, selectedJobTitle]
  );

  // rtq

  const [
    fetchEmployees,
    { data: employeesData, isLoading: employeesLoading, error: employeesError },
  ] = useLazyFetchEmployeesQuery();

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

  const onSearch = useCallback(() => {
    fetchEmployees(queryArgs);
  }, [fetchEmployees, queryArgs]);

  const onClearFilters = useCallback(() => {
    setSelectedDepartment('');
    setSelectedJobTitle('');
    setSearchedText('');
    setPage(1);
    fetchEmployees({
      Department: '',
      JobTitle: '',
      limit: 20,
      offset: 1,
      search: '',
    });
  }, [fetchEmployees, queryArgs]);

  useEffect(() => {
    fetchEmployees(queryArgs);
  }, []);

  useEffect(() => {
    fetchEmployees(queryArgs);
  }, [page, pageSize]);

  return (
    <AppLayout title="Employees">
      <div className="flex flex-col self-stretch w-full gap-y-4 bg-foreground rounded-2xl border border-border">
        <FilterOptions
          onDepartmentChange={onDepartmentChange}
          onJobtitleChange={onJobtitleChange}
          onSearchChange={onSearchChange}
          searchText={searchedText}
          selectedDepartment={selectedDepartment}
          selectedJobTitle={selectedJobTitle}
          onSearch={onSearch}
          onClearFilter={onClearFilters}
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
              totalRows={employeesData?.count}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
