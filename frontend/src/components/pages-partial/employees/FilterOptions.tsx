import * as React from 'react';

import { IconInput } from '@/components/ui/icon-input';

import { Search } from '@/assets/icons';
import { SelectDepartment } from '@/components/common/SelectDepartment';
import { SelectJobTitles } from '@/components/common/SelectJobTitles';
import { Button } from '@/components/ui/button';

interface FilterOptionsProps {
  onSearchChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
  onDepartmentChange: (value: string) => void;
  onJobtitleChange: (value: string) => void;
  searchText: string;
  selectedDepartment: string;
  selectedJobTitle: string;
  onClearFilter: () => void;
  onSearch: () => void;
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  onDepartmentChange,
  onJobtitleChange,
  onSearchChange,
  searchText,
  selectedJobTitle,
  selectedDepartment,
  onClearFilter,
  onSearch,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center mt-3 mx-3 ">
      <div className="col-span-12 md:col-span-5">
        <IconInput
          type={'text'}
          icon={Search}
          showIcon
          aria-label={'Search'}
          placeholder="Search"
          label={''}
          onChange={onSearchChange}
          iconClassName="w-6 h-6 mr-0 fill-transparent "
          value={searchText}
        />
      </div>
      <div className="col-span-6 md:col-span-2">
        <SelectDepartment
          onDepartmentChange={onDepartmentChange}
          initialDepartment={selectedDepartment}
        />
      </div>
      <div className="col-span-6 md:col-span-2">
        <SelectJobTitles
          onJobtitleChange={onJobtitleChange}
          initialJobTitle={selectedJobTitle}
        />
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
