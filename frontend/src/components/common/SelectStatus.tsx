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
  const statusOptions = [
    { value: 1, name: 'In process' },
    { value: 2, name: 'Approved' },
    { value: 3, name: 'Backordered' },
    { value: 4, name: 'Rejected' },
    { value: 5, name: 'Shipped' },
    { value: 6, name: 'Cancelled' },
  ];

  const [selectedStatus, setSelectedStatus] = React.useState<
    string | undefined
  >(initialStatus);

  React.useEffect(() => {
    setSelectedStatus(initialStatus);
  }, [initialStatus]);

  const handleChange = (value: string) => {
    setSelectedStatus(value);
    onStatusChange(value);
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
            <SelectItem key={status.value} value={status.value.toString()}>
              <span>{status.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
