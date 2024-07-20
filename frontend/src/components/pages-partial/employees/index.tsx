'use client';
import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import EmployeesTable from './table';
import {
  generateMockDepartments,
  generateMockEmployees,
  generateMockJobTitles,
} from '@/lib/mocks';

import { FilterOptions } from './FilterOptions';
import useWindowSize from '@/hooks/use-window-size';

const departments = generateMockDepartments(5);
const jobTitles = generateMockJobTitles(5);
const employees = generateMockEmployees(200);

export default function PartialEmployees() {
  // states
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>('');
  const [selectedJobTitle, setSelectedJobTitle] = React.useState<string>('');
  const [searchedText, setSearchedText] = React.useState<string>('');

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
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
