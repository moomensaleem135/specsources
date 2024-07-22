import React from 'react';

import { EmailIcon } from '@/assets/icons';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex w-full flex-col justify-between pb-8"
      style={{ height: '100dvh' }}
    >
      <div className="w-full flex items-center justify-center px-4 md:px-10 ">
        {children}
      </div>
      <div className="grid grid-cols-12 px-5 gap-y-3">
        <div className="col-span-6">
          <p className="text-accent font-normal text-xs sm:text-sm">
            © specsources 2024
          </p>
        </div>
        <div className="col-span-6 flex flex-row gap-x-1 items-center justify-end">
          <EmailIcon className="fill-transparent text-accent mt-0.5" />
          <p className="text-accent font-normal text-xs sm:text-sm">
            help@specsources.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
