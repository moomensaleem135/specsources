'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layouts/AppLayout';

import PersonalInfo from './PersonalInfo';
import SalesHistory from './SalesHistory';
import EmployeeDetailsTabs from './DetailsTabs';
import { Separator } from '@/components/ui/seperator';

export default function PartialSettings() {
  const [activeTab, setActiveTab] = useState<string>('details');

  let content;
  switch (activeTab) {
    case 'details':
      content = <PersonalInfo />;
      break;
    case 'sales-history':
      content = <SalesHistory />;
      break;
    default:
      content = <PersonalInfo />;
  }

  return (
    <AppLayout title="Employee Details">
      <div className="flex flex-col self-stretch w-full gap-y-4 bg-foreground rounded-2xl border border-border pb-8">
        <div className="grid grid-cols-12 w-full gap-4">
          <div className="col-span-12 flex justify-start items-center pl-6">
            <EmployeeDetailsTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          {/* <div className="w-full border border-green-500 col-span-12 -mt-[35px] h-[1px] ml-[80px]"></div> */}
          <div className="col-span-12">
            <div className="flex w-full flex-col bg-foreground">{content}</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
