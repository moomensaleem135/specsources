import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFetchDepartmentsQuery } from '@/store/features/company/companyApi';
import { SpinnerIcon } from '@/assets/icons';
import { generateMockDepartments } from '@/lib/mocks';

interface SelectDepartmentProps {
  onDepartmentChange: (value: string) => void;
  initialDepartment?: string;
}

export const SelectDepartment: React.FC<SelectDepartmentProps> = ({
  onDepartmentChange,
  initialDepartment,
}) => {
  // Rtq
  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useFetchDepartmentsQuery();

  // states
  const [selectedDepartment, setSelectedDepartment] = React.useState<
    string | undefined
  >(initialDepartment);

  // effect to set initial
  React.useEffect(() => {
    setSelectedDepartment(initialDepartment);
  }, [initialDepartment]);

  // handlers
  const handleChange = (dept: string) => {
    setSelectedDepartment(dept);
    onDepartmentChange(dept);
  };

  // memorized departments
  const departmentOptions = React.useMemo(
    () =>
      departmentsError
        ? generateMockDepartments(5)
        : departmentsData?.results || [],
    [departmentsData, departmentsError]
  );

  return (
    <div className="w-full">
      <Select onValueChange={handleChange} value={selectedDepartment}>
        <SelectTrigger
          iconColor="stroke-primary"
          className="shadow-none bg-foreground dark:bg-background text-sm"
        >
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {departmentsLoading && (
            <div className="flex flex-row gap-x-2">
              <span className="text-sm text-subHeadingColor">Loading</span>
              <SpinnerIcon className="h-6 w-6" />
            </div>
          )}
          {departmentOptions.map((department) => (
            <SelectItem key={department.DepartmentID} value={department.name}>
              <span>{department.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
