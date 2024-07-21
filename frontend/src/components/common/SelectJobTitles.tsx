import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IJobTitle } from '@/lib/types';

interface SelectJobTitlesProps {
  jobTitles: IJobTitle[];
  onJobtitleChange: (value: string) => void;
  initialJobTitle?: string;
}

export const SelectJobTitles: React.FC<SelectJobTitlesProps> = ({
  jobTitles,
  onJobtitleChange,
  initialJobTitle,
}) => {
  const [jobTitleOptions, setJobTitleOptions] = React.useState<IJobTitle[]>([]);

  const [selectedJobTitle, setSelectedJobTitle] = React.useState<
    string | undefined
  >(initialJobTitle);

  React.useEffect(() => {
    setJobTitleOptions(jobTitles);
  }, [jobTitles]);

  React.useEffect(() => {
    setSelectedJobTitle(initialJobTitle);
  }, [initialJobTitle]);

  const handleChange = (title: string) => {
    setSelectedJobTitle(title);
    onJobtitleChange(title);
  };

  return (
    <div className="col-span-6 md:col-span-3">
      <Select onValueChange={handleChange} value={selectedJobTitle}>
        <SelectTrigger
          iconColor="stroke-primary"
          className="shadow-none bg-foreground dark:bg-background text-sm"
        >
          <SelectValue placeholder="Job Title" />
        </SelectTrigger>
        <SelectContent>
          {jobTitleOptions.map((jobTitle) => (
            <SelectItem key={jobTitle.name} value={jobTitle.value}>
              <span>{jobTitle.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
