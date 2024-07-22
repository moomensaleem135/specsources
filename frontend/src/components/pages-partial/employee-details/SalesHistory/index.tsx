'use client';
import React, { useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import useWindowSize from '@/hooks/use-window-size';
import { DateValueType } from 'react-tailwindcss-datepicker';

import { generateMockSales } from '@/lib/mocks';
import {
  useLazyFetchSalesQuery,
  useFetchStatInfoQuery,
} from '@/store/features/company/companyApi';
import { ISalesInfo, ISalesRequestParams } from '@/lib/types';
import SalesInfoAccordion from '@/components/common/SaleInfoAccordian';

import { FilterOptions } from './FilterOptions';
import SalesTable from './table';

const mockedSalesInfo: ISalesInfo = {
  total_sales_with_freight_and_tax: 5216.0,
  average_sales_with_freight_and_tax: 5216.0,
  average_sales_without_freight_and_tax: 5216.0,
  total_sales_without_freight_and_tax: 5216.0,
};

interface SalesHistoryProps {}

const SalesHistory: React.FC<SalesHistoryProps> = () => {
  const searchParams = useSearchParams();
  const businessEntityId = searchParams.get('id') || '';

  // states
  const [selectedStatus, setSelectedStatus] = React.useState<string>('');
  const [searchedText, setSearchedText] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [page, setPage] = React.useState<number>(1);

  const { isMobile } = useWindowSize();

  // args
  const queryArgs: ISalesRequestParams = useMemo(
    () => ({
      page,
      search: searchedText,
      start_date: dateRange?.startDate as string,
      end_date: dateRange?.endDate as string,
      Status: selectedStatus,
    }),
    [page, searchedText, dateRange, selectedStatus]
  );

  // rtq
  const [
    fetchSales,
    { data: salesData, isLoading: salesLoading, error: salesError },
  ] = useLazyFetchSalesQuery();
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useFetchStatInfoQuery(businessEntityId);

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

  const onSearch = useCallback(() => {
    setPage(1); // Reset to first page on search
    fetchSales(queryArgs); // Fetch sales with the updated query args
  }, [fetchSales, queryArgs]);

  const onClearFilters = useCallback(() => {
    setSelectedStatus('');
    setSearchedText('');
    setDateRange({ startDate: null, endDate: null });
    setPage(1); // Reset to first page
    fetchSales({ page: 1 }); // Fetch sales with default query args
  }, [fetchSales]);

  useEffect(() => {
    // Fetch sales data on component mount and when queryArgs change
    fetchSales(queryArgs);
  }, []);

  // memorized sales
  const sales = useMemo(
    () => (salesError ? generateMockSales(50) : salesData?.results || []),
    [salesData, salesError]
  );

  const salesInfo = useMemo(
    () => (statsError ? mockedSalesInfo : stats || ({} as ISalesInfo)),
    [stats, statsError]
  );

  return (
    <div className="pb-4 px-4 md:px-8 w-full">
      <FilterOptions
        onStatusChange={onStatusChange}
        onSearchChange={onSearchChange}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
        onSearch={onSearch}
        onClearFilter={onClearFilters}
      />
      <SalesInfoAccordion salesInfo={salesInfo} />
      <div className="grid grid-cols-12 w-full gap-4 mt-2">
        <div className="col-span-12 h-[660px] md:h-[750px]">
          <SalesTable
            enablePagination
            customHeight={isMobile ? 590 : 700}
            sales={sales}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
