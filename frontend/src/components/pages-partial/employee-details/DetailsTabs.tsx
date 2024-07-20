import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmployeeDetailsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const EmployeeDetailsTabs: React.FC<EmployeeDetailsTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="sales-history">Sales History</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EmployeeDetailsTabs;
