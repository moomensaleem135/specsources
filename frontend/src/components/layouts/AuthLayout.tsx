import React from 'react';

import { EmailIcon } from '@/assets/icons';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex relative">
      <div className="w-full flex items-center justify-center px-10 ">
        {children}
      </div>
      <div className="absolute bottom-[30px] w-full  px-5 md:px-10 ">
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

export default AuthLayout;
