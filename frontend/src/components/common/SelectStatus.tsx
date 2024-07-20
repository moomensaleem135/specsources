import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IStatus } from '@/lib/types';

interface SelectStatusProps {
  statuses: IStatus[];
  onStatusChange: (value: string) => void;
  initialStatus?: string;
}

export const SelectStatus: React.FC<SelectStatusProps> = ({
  statuses,
  onStatusChange,
  initialStatus,
}) => {
  const [statusOptions, setStatusOptions] = React.useState<IStatus[]>([]);

  const [selectedStatus, setSelectedStatus] = React.useState<
    string | undefined
  >(initialStatus);

  React.useEffect(() => {
    setStatusOptions(statuses);
  }, [statuses]);

  React.useEffect(() => {
    setSelectedStatus(initialStatus);
  }, [initialStatus]);

  const handleChange = (title: string) => {
    setSelectedStatus(title);
    onStatusChange(title);
  };

  return (
    <div className="col-span-6 md:col-span-3">
      <Select onValueChange={handleChange} value={selectedStatus}>
        <SelectTrigger
          iconColor="stroke-primary"
          className="shadow-none bg-foreground text-sm"
        >
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status.name} value={status.value}>
              <span>{status.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
