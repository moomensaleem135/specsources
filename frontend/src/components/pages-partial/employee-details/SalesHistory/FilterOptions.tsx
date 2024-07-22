import * as React from 'react';

import { IconInput } from '@/components/ui/icon-input';

import { ArrowDownIcon, Search } from '@/assets/icons';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { SelectStatus } from '@/components/common/SelectStatus';
import { Button } from '@/components/ui/button';

interface FilterOptionsProps {
  onSearchChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: string) => void;
  dateRange: DateValueType;
  onDateRangeChange: (value: DateValueType) => void;
  onClearFilter: () => void;
  onSearch: () => void;
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  onStatusChange,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onClearFilter,
  onSearch,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center ">
      <div className="col-span-12 md:col-span-5">
        <IconInput
          type={'text'}
          icon={Search}
          showIcon
          aria-label={'Search'}
          placeholder="Search"
          label={''}
          onChange={onSearchChange}
          iconClassName="w-6 h-6 text-primary mt-1"
          inputClassName="!h-6 mt-1"
          className="!pt-[3px] pb-0"
        />
      </div>
      <div className="col-span-12 md:col-span-2">
        <div className="w-full">
          <Datepicker
            placeholder={'Date Range'}
            value={dateRange}
            onChange={onDateRangeChange}
            containerClassName={'relative w-full '}
            toggleIcon={() => (
              <ArrowDownIcon className="h-4 w-4 text-primary" />
            )}
            inputClassName={
              'relative duration-300 py-[7px] pl-4 pr-14 w-full border border-border rounded-lg placeholder-placeholder text-headingColor text-base font-medium !bg-transparent focus:border-primary focus:outline-0 '
            }
            primaryColor="red"
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-2">
        <SelectStatus onStatusChange={onStatusChange} />
      </div>
      <div className="col-span-12 md:col-span-3">
        <div className="w-full flex items-center gap-x-2 ">
          <Button className="py-4 w-full" type="submit" onClick={onSearch}>
            <span className="font-medium text-base">Search</span>
          </Button>
          <Button
            className="py-4 w-full bg-headingColor text-white hover:bg-headingColor"
            onClick={onClearFilter}
          >
            <span className="font-medium text-base">Clear Filter</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
