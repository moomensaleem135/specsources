'use client';
import React from 'react';

import { Separator } from '@/components/ui/seperator';
import useWindowSize from '@/hooks/use-window-size';
import { DateValueType } from 'react-tailwindcss-datepicker';

import SalesTable from './table';

interface SalesHistoryProps {}

import { generateMockSales, generateMockStatuses } from '@/lib/mocks';
import { FilterOptions } from './FilterOptions';
import SalesInfoAccordion from '@/components/common/SaleInfoAccordian';

const statuses = generateMockStatuses(5);
const sales = generateMockSales(200);

const SalesHistory: React.FC<SalesHistoryProps> = () => {
  // states
  const [selectedStatus, setSelectedStatus] = React.useState<string>('');
  const [searchedText, setSearchedText] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const { isMobile } = useWindowSize();

  const salesData = {
    averageSalesWithTax: 500.0,
    totalSalesWithTax: 500.0,
    averageSalesWithoutTax: 500.0,
    totalSalesWithoutTax: 500.0,
  };

  // handlers
  const onStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  const onDateRangeChange = (value: DateValueType) => {
    setDateRange(value);
  };

  return (
    <div className="py-4 px-8 w-full">
      <FilterOptions
        statuses={statuses}
        onStatusChange={onStatusChange}
        onSearchChange={onSearchChange}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
      <SalesInfoAccordion salesInfo={salesData} />
      <div className="grid grid-cols-12 w-full gap-4 mt-2">
        <div className="col-span-12 h-[660px] md:h-[750px]">
          <SalesTable
            enablePagination
            customHeight={isMobile ? 590 : 700}
            sales={sales}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
