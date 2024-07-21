import React from 'react';

import TopNavbar from './Components/TopNavbar';
import { cn } from '@/lib/cn';
import { EmailIcon } from '@/assets/icons';

interface INavbar {
  children: React.ReactNode;
  title: string;
}

function Navbar({ children, title }: INavbar) {
  return (
    <div className="flex w-full flex-col justify-between mb-4">
      <div className="flex flex-col w-full px-8">
        <TopNavbar title={title} />
        <div
          className={cn(
            'flex flex-col bg-middle h-full overflow-none px-0 sm:px-4 py-2 '
          )}
        >
          {children}
        </div>
      </div>
      <div className="grid grid-cols-12 px-5 gap-y-3 mt-3">
        <div className="col-span-6">
          <p className="text-accent font-normal text-sm ">
            © specsources 2024
          </p>
        </div>
        <div className="col-span-6 flex flex-row gap-x-1 items-center justify-end">
          <EmailIcon className="fill-transparent text-accent mt-0.5" />
          <p className="text-accent font-normal text-sm">
            help@specsources.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
