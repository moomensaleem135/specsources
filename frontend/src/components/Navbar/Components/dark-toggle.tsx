import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button className="p-0 transition-none" variant={'outline'}>
      <div className="w-10 h-10 relative inline-block border-2 rounded-md border-accent cursor-pointer">
        <div
          className="border-accent flex justify-center items-center absolute h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          onClick={() => setTheme('dark')}
        >
          <Sun />
        </div>
        <div
          className="border-accent flex justify-center items-center absolute h-full w-full rotate-90 origin-center scale-0 transition-all dark:rotate-0 dark:scale-100"
          onClick={() => setTheme('light')}
        >
          <Moon />
        </div>
      </div>
    </Button>
  );
}
