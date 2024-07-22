'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import AppLayout from '@/components/layouts/AppLayout';
import { useFetchEmployeeQuery } from '@/store/features/company/companyApi';
import { Button } from '@/components/ui/button';
import { employeesUrl } from '@/constants';
import { generateMockEmployees } from '@/lib/mocks';

import PersonalInfo from './PersonalInfo';
import SalesHistory from './SalesHistory';
import EmployeeDetailsTabs from './DetailsTabs';

export default function PartialSettings() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const businessEntityId = searchParams.get('id') || '';

  // states
  const [activeTab, setActiveTab] = useState<string>('details');

  // rtq
  const {
    data: employee,
    isLoading: employeeLoading,
    error: employeeError,
  } = useFetchEmployeeQuery(businessEntityId);

  const goBack = () => {
    router.push(employeesUrl);
  };

  // memorized employee data
  const employeeData = useMemo(
    () => (employeeError ? generateMockEmployees(1)[0] : employee),
    [employee, employeeError]
  );

  let content;
  switch (activeTab) {
    case 'details':
      content = <PersonalInfo employeeData={employeeData} />;
      break;
    case 'sales-history':
      content = <SalesHistory />;
      break;
    default:
      content = <PersonalInfo employeeData={employeeData} />;
  }

  if (!businessEntityId) {
    return (
      <div className="h-[70vh] flex items-center justify-center w-full">
        <div className="w-1/2">
          <p className="font-semibold text-headingColor text-lg text-center">
            No Employee Data found
          </p>
          <div className="mt-4 flex items-center justify-center">
            <Button
              className="py-5  bg-headingColor text-white hover:bg-headingColor w-1/5"
              onClick={goBack}
            >
              <span className="font-medium text-base">Back</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppLayout title="Employee Details">
      <div className="flex flex-col self-stretch w-full gap-y-4 bg-foreground rounded-2xl border border-border pb-5">
        <div className="grid grid-cols-12 w-full gap-4">
          <div className="col-span-12 flex justify-start items-center pl-6">
            <EmployeeDetailsTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div className="col-span-12">
            <div className="flex w-full flex-col bg-foreground">{content}</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
