'use client';
import React, { useMemo } from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import EmployeesTable from './table';
import { FilterOptions } from './FilterOptions';
import useWindowSize from '@/hooks/use-window-size';
import {
  useFetchEmployeesQuery,
  useFetchDepartmentsQuery,
  useFetchJobTitlesQuery,
} from '@/store/features/company/companyApi';
import {
  generateMockEmployees,
  generateMockDepartments,
  generateMockJobTitles,
} from '@/lib/mocks';

export default function PartialEmployees() {
  // states
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('');
  const [selectedJobTitle, setSelectedJobTitle] = React.useState<string>('');
  const [searchedText, setSearchedText] = React.useState<string>('');

  // rtq
  const {
    data: employeesData,
    isLoading: employeesLoading,
    error: employeesError,
  } = useFetchEmployeesQuery({ page: 1, pageSize: 50 });
  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useFetchDepartmentsQuery();
  const {
    data: jobTitlesData,
    isLoading: jobTitlesLoading,
    error: jobTitlesError,
  } = useFetchJobTitlesQuery();

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

  const employees = useMemo(
    () => (employeesError ? generateMockEmployees(50) : employeesData || []),
    [employeesData, employeesError]
  );
  const departments = useMemo(
    () => (departmentsError ? generateMockDepartments(5) : departmentsData || []),
    [departmentsData, departmentsError]
  );
  const jobTitles = useMemo(
    () => (jobTitlesError ? generateMockJobTitles(5) : jobTitlesData || []),
    [jobTitlesData, jobTitlesError]
  );

  return (
    <AppLayout title="Employees">
      <div className="flex flex-col self-stretch w-full gap-y-4 bg-foreground rounded-2xl border border-border">
        <FilterOptions
          departments={departments}
          jobTitles={jobTitles}
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
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
