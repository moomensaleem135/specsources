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
    <div
      className="flex w-full flex-col justify-between pb-8"
      style={{ height: '100dvh' }}
    >
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
      <div className="w-full px-5">
        <div className="flex justify-between w-full ">
          <div>
            <p className="text-accent font-normal text-sm ">
              © specsources 2024
            </p>
          </div>
          <div className="flex flex-row gap-x-1 items-center">
            <EmailIcon className="fill-transparent text-accent mt-0.5" />
            <p className="text-accent font-normal text-sm">
              help@specsources.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
