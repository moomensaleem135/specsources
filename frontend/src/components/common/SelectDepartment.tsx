import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IDepartment } from '@/lib/types';

interface SelectDepartmentProps {
  onDepartmentChange: (value: string) => void;
  departments: IDepartment[];
  initialDepartment?: string;
}

export const SelectDepartment: React.FC<SelectDepartmentProps> = ({
  departments,
  onDepartmentChange,
  initialDepartment,
}) => {
  const [departmentOptions, setDepartmentOptions] = React.useState<
    IDepartment[]
  >([]);

  const [selectedDepartment, setSelectedDepartment] = React.useState<
    string | undefined
  >(initialDepartment);

  React.useEffect(() => {
    setSelectedDepartment(initialDepartment);
  }, [initialDepartment]);

  React.useEffect(() => {
    setDepartmentOptions(departments);
  }, [departments]);

  const handleChange = (dept: string) => {
    setSelectedDepartment(dept);
    onDepartmentChange(dept);
  };

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
          {departmentOptions.map((department) => (
            <SelectItem key={department.name} value={department.value}>
              <span>{department.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
