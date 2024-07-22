import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectStatusProps {
  onStatusChange: (value: string) => void;
  initialStatus?: string;
}

export const SelectStatus: React.FC<SelectStatusProps> = ({
  onStatusChange,
  initialStatus,
}) => {
  const statusOptions = ['0', '1', '2', '3', '4', '5'];

  const [selectedStatus, setSelectedStatus] = React.useState<
    string | undefined
  >(initialStatus);

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
          className="h-10 shadow-none bg-foreground dark:bg-background text-sm"
        >
          <SelectValue
            className="text-placeholder"
            placeholder="Select Status"
          />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              <span>{status}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
