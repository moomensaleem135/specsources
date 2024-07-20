'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '@/components/layouts/AuthLayout';
import {
  AvatarIcon,
  EmailIcon,
  EyeIcon,
  EyeSlashIcon,
  SpinnerIcon,
} from '@/assets/icons';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { useLoginMutation } from '@/store/features/auth/authApi';
import { useAppSelector } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import NextImage from '@/components/ui/image';
import Logo from '@/assets/images/specsource.png';
import { employeesUrl } from '@/constants';
import { IconInput } from '@/components/ui/icon-input';
import { IconType } from '@/lib/types';

const authSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email')
    .min(1, 'Email is required'),
  password: z.string().min(1, 'Password is Required'),
});

type FormFields = z.infer<typeof authSchema>;

export default function PartialLogin() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(getAuthDataSelector);
  const [showPass, setShowPass] = useState<boolean>(false);

  const formFields: Array<{
    name: keyof FormFields;
    label: string;
    type: string;
    icon?: IconType;
    showRightIcon?: boolean;
    rightIcon?: IconType;
  }> = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      icon: EmailIcon,
    },
    {
      name: 'password',
      label: 'Enter your password',
      type: showPass ? 'text' : 'password',
      rightIcon: showPass ? EyeIcon : EyeSlashIcon,
      showRightIcon: true,
    },
  ];

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    try {
      login(values);
      router.push(employeesUrl);
    } catch (error) {
      console.error('Login Error:', error);
      router.push('/');
    }
  };

  const toggleHidePassword = () => {
    setShowPass(!showPass);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <AuthLayout>
      <div className="w-full h-[90vh]  flex flex-col items-center justify-center">
        <div className="flex relative w-full items-center justify-center my-5 ">
          <NextImage src={Logo} alt="Logo" unoptimized />
        </div>
        <div className="w-full md:w-1/2 2xl:w-1/3  flex items-center flex-col justify-center bg-foreground rounded-3xl p-8 border-2 border-primary">
          <AvatarIcon className="w-15 h-16" />
          <h1 className="text-3xl font-semibold text-headingColor">
            Welcome Back!
          </h1>
          <div className="flex align-center pt-2">
            <p className="text-base font-normal text-center text-subHeadingColor pb-6">
              Please enter your credentials to access your account.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full gap-0.5"
            >
              <div className="flex flex-col">
                <div className="flex flex-col">
                  {formFields.map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name}
                      render={({ field: formField }) => (
                        <div>
                          <FormControl>
                            <IconInput
                              {...formField}
                              type={field.type}
                              icon={field.icon}
                              showIcon={false}
                              showRightIcon={field.showRightIcon}
                              rightIcon={field.rightIcon}
                              onClickRightIcon={toggleHidePassword}
                              id={field.label
                                .replace(/\s+/g, '-')
                                .toLowerCase()}
                              aria-label={field.label}
                              label={field.label}
                              error={!!form.formState.errors[field.name]}
                              iconClassName={
                                formField.name === 'email'
                                  ? 'fill-transparent text-accent mt-0.5 h-8 w-8'
                                  : ''
                              }
                              className={
                                formField.name === 'password'
                                  ? 'mt-4 pt-5'
                                  : 'pt-5'
                              }
                              inputClassName="text-base"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive">
                            {form.formState.errors[field.name]?.message}
                          </FormMessage>
                        </div>
                      )}
                    />
                  ))}
                </div>
                <Button
                  variant="default"
                  type="submit"
                  className="w-full mt-5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <SpinnerIcon className="text-white" />
                  ) : (
                    'Log in'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
}
