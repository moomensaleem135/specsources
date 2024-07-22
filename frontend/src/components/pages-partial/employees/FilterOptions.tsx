import * as React from 'react';

import { IconInput } from '@/components/ui/icon-input';

import { Search } from '@/assets/icons';
import { SelectDepartment } from '@/components/common/SelectDepartment';
import { SelectJobTitles } from '@/components/common/SelectJobTitles';

interface FilterOptionsProps {
  onSearchChange: (val: React.ChangeEvent<HTMLInputElement>) => void;
  onDepartmentChange: (value: string) => void;
  onJobtitleChange: (value: string) => void;
}

export const FilterOptions: React.FC<FilterOptionsProps> = ({
  onDepartmentChange,
  onJobtitleChange,
  onSearchChange,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center mt-3 mx-3 ">
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
          className="!pt-3 pb-0 dark:bg-background dark:text-white"
        />
      </div>
      <div className="col-span-6 md:col-span-3">
        <SelectDepartment onDepartmentChange={onDepartmentChange} />
      </div>
      <div className="col-span-6 md:col-span-3">
        <SelectJobTitles onJobtitleChange={onJobtitleChange} />
      </div>
    </div>
  );
};
