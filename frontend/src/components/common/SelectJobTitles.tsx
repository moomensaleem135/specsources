import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFetchJobTitlesQuery } from '@/store/features/company/companyApi';
import { generateMockJobTitles } from '@/lib/mocks';
import { SpinnerIcon } from '@/assets/icons';

interface SelectJobTitlesProps {
  onJobtitleChange: (value: string) => void;
  initialJobTitle?: string;
}

export const SelectJobTitles: React.FC<SelectJobTitlesProps> = ({
  onJobtitleChange,
  initialJobTitle,
}) => {
  // Rtq
  const {
    data: jobTitlesData,
    isLoading: jobTitlesLoading,
    error: jobTitlesError,
  } = useFetchJobTitlesQuery();

  // states
  const [selectedJobTitle, setSelectedJobTitle] = React.useState<
    string | undefined
  >(initialJobTitle);

  // effect to set initial
  React.useEffect(() => {
    setSelectedJobTitle(initialJobTitle);
  }, [initialJobTitle]);

  // handlers
  const handleChange = (title: string) => {
    setSelectedJobTitle(title);
    onJobtitleChange(title);
  };

  // memorized titles
  const jobTitleOptions = React.useMemo(
    () =>
      jobTitlesError ? generateMockJobTitles(5) : jobTitlesData?.results || [],
    [jobTitlesData, jobTitlesError]
  );

  console.log({ selectedJobTitle, initialJobTitle });

  return (
    <div className="col-span-6 md:col-span-3">
      <Select onValueChange={handleChange} value={selectedJobTitle}>
        <SelectTrigger
          iconColor="stroke-primary"
          className="shadow-none bg-foreground dark:bg-background text-sm "
        >
          <SelectValue placeholder="Job Title" />
        </SelectTrigger>
        <SelectContent>
          {jobTitlesLoading && (
            <div className="flex flex-row gap-x-2">
              <span className="text-sm text-subHeadingColor">Loading</span>
              <SpinnerIcon className="h-6 w-6" />
            </div>
          )}
          {jobTitleOptions.map(({ JobTitle }) => (
            <SelectItem key={JobTitle} value={JobTitle}>
              <span>{JobTitle}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
