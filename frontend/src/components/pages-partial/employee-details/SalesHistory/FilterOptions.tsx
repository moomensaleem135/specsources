import * as React from 'react';

import { IconInput } from '@/components/ui/icon-input';

import { ArrowDownIcon, Search } from '@/assets/icons';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { IStatus } from '@/lib/types';
import { SelectStatus } from '@/components/common/SelectStatus';
import { Button } from '@/components/ui/button';

interface FilterOptionsProps {
  onSearchChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
  statuses: IStatus[];
  onStatusChange: (value: string) => void;
  dateRange: DateValueType;
  onDateRangeChange: (value: DateValueType) => void;
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  onStatusChange,
  statuses,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center ">
      <div className="col-span-12 md:col-span-6">
        <IconInput
          type={'text'}
          icon={Search}
          showIcon
          aria-label={'Search'}
          placeholder="Search"
          label={''}
          iconClassName="w-6 h-6 text-primary"
          onChange={onSearchChange}
          inputClassName="!h-6"
          className="!pt-3 pb-0"
        />
      </div>
      <div className="col-span-12  md:col-span-2">
        <div className="w-full">
          <Datepicker
            placeholder={'Date Range'}
            value={dateRange}
            onChange={onDateRangeChange}
            containerClassName={'transactions-date-range relative w-full '}
            toggleIcon={(open) => (
              <ArrowDownIcon className="h-4 w-4 text-primary" />
            )}
            inputClassName={
              'relative  duration-300 py-3 pl-4 pr-14 w-full border border-border rounded-lg placeholder-placeholder text-headingColor text-base font-medium !bg-transparent focus:border-primary focus:outline-0 '
            }
            primaryColor="red"
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-2">
        <SelectStatus onStatusChange={onStatusChange} statuses={statuses} />
      </div>
      <div className="col-span-12 md:col-span-2">
        <div className="w-full flex items-center gap-x-2 ">
          <Button className="py-6 w-full" type="submit">
            <span className="font-medium text-base">Search</span>
          </Button>
          <Button className="py-6 w-full bg-headingColor text-white hover:bg-headingColor">
            <span className="font-medium text-base">Clear Filter</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
