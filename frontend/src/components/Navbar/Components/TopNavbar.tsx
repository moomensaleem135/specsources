import { useRouter } from 'next/navigation';
import React from 'react';
import { LogOutIcon } from 'lucide-react';

import { useLogoutMutation } from '@/store/features/auth/authApi';
import { useAppSelector } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NextImage from '@/components/ui/image';
import UserImage from '@/assets/images/user.png';
import { loginUrl } from '@/constants';

const TopNavbar = ({ title }: { title: string }) => {
  // redux
  const { user } = useAppSelector(getAuthDataSelector);

  const router = useRouter();

  // rtq
  const [logout] = useLogoutMutation();

  // handlers
  const handleLogout = async () => {
    try {
      logout();
      router.push(loginUrl);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="flex w-full items-center justify-between px-0 sm:px-4">
      <div className="w-full flex">
        <p className="font-bold text-2xl md:text-4xl">{title}</p>
      </div>
      <div className="py-4 flex flex-row justify-center items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="border-border flex flex-row items-center cursor-pointer space-x-2 ">
              <div className="flex relative w-full items-center justify-center ">
                <NextImage src={UserImage} alt="Logo" unoptimized />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon className="w-4 h-4 mr-2" /> Logout{' '}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavbar;
