'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

import { CalendarIcon, EmailIcon } from '@/assets/icons';
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-input';
import { Separator } from '@/components/ui/seperator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { SelectDepartment } from '@/components/common/SelectDepartment';
import { SelectJobTitles } from '@/components/common/SelectJobTitles';

import { IEmployee } from '@/lib/types';
import { employeesUrl } from '@/constants';

const detailsSchema = z.object({
  FirstName: z.string().min(1, 'First name is required'),
  LastName: z.string().min(1, 'Last name is required'),
  MiddleName: z.string().optional(),
  EmailAddress: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  Birthday: z.string().min(1, 'Birthday is required'),
  AddressLine1: z.string(),
  AddressLine2: z.string().optional(),
  City: z.string().min(1, 'City is required'),
  StateProvinceName: z.string().min(1, 'State is required'),
  PostalCode: z.string().min(1, 'Postal Code is required'),
  CountryRegionName: z.string().min(1, 'Country is required'),
  Department: z.string().min(1, 'Department is required'),
  JobTitle: z.string().min(1, 'Job Title is required'),
});

type FormFields = z.infer<typeof detailsSchema>;

interface EmployeePersonalDetailsProps {
  employeeData?: IEmployee;
}

const EmployeePersonalDetails: React.FC<EmployeePersonalDetailsProps> = ({
  employeeData,
}) => {
  const router = useRouter();

  // form
  const form = useForm<FormFields>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      FirstName: employeeData?.FirstName,
      LastName: employeeData?.LastName,
      MiddleName: employeeData?.MiddleName || '',
      EmailAddress: employeeData?.EmailAddress,
      Birthday: employeeData?.Birthday,
      AddressLine1: employeeData?.AddressLine1,
      AddressLine2: employeeData?.AddressLine2 || '',
      City: employeeData?.City,
      StateProvinceName: employeeData?.StateProvinceName,
      PostalCode: employeeData?.PostalCode,
      CountryRegionName: employeeData?.CountryRegionName,
      Department: employeeData?.StateProvinceName, // Assuming StateProvinceName is used as department
      JobTitle: employeeData?.JobTitle,
    },
  });

  const [birthday, setBirthDay] = React.useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const onSubmit = (vals: FormFields) => {
    // Handle form submission
    console.log(vals);
  };

  const handleBirthDayChange = (newValue: DateValueType) => {
    setBirthDay(newValue);
    if (newValue?.startDate) {
      form.setValue('Birthday', newValue.startDate.toString());
    }
  };

  useEffect(() => {
    if (employeeData) {
      setBirthDay({
        startDate: employeeData.Birthday as any,
        endDate: null,
      });
      form.reset(employeeData as any);
    }
  }, [employeeData, form]);

  return (
    <div className="px-4 md:px-8 w-full md:w-3/4">
      <div className="gap-y-3">
        <p className="font-semibold text-headingColor text-lg">Personal info</p>
        <p className="font-normal text-subheadingColor text-sm">
          Update employee personal details here.
        </p>
      </div>
      <Separator className="my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-2 ">
              <p className="font-semibold text-headingColor text-base">Name:</p>
            </div>
            <div className="col-span-12 md:col-span-10 mt-2 md:mt-0">
              <div className=" flex flex-col md:flex-row gap-2 items-center">
                <FormField
                  control={form.control}
                  name="FirstName"
                  render={({ field }) => (
                    <div className="w-full md:w-1/3 flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="FirstName"
                          aria-label="First Name"
                          label=""
                          placeholder="First Name"
                          error={!!form.formState.errors.FirstName}
                        />
                      </FormControl>
                      <FormMessage className="text-primary">
                        {form.formState.errors.FirstName?.message}
                      </FormMessage>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="MiddleName"
                  render={({ field }) => (
                    <div className="w-full md:w-1/3 flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="MiddleName"
                          aria-label="Middle Name"
                          placeholder="Middle Name"
                          label=""
                          error={!!form.formState.errors.MiddleName}
                        />
                      </FormControl>
                      <FormMessage className="text-primary">
                        {form.formState.errors.MiddleName?.message}
                      </FormMessage>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="LastName"
                  render={({ field }) => (
                    <div className="w-full md:w-1/3 flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="LastName"
                          aria-label="Last Name"
                          label=""
                          placeholder="Last Name"
                          error={!!form.formState.errors.LastName}
                        />
                      </FormControl>
                      <FormMessage className="text-primary">
                        {form.formState.errors.LastName?.message}
                      </FormMessage>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-12 items-center my-3">
            <div className="col-span-12 md:col-span-2 ">
              <p className="font-semibold text-headingColor text-base">
                Email Address:
              </p>
            </div>
            <div className="col-span-12 md:col-span-10 mt-2 md:mt-0">
              <FormField
                control={form.control}
                name="EmailAddress"
                render={({ field }) => (
                  <div className="w-full">
                    <FormControl>
                      <IconInput
                        {...field}
                        type="email"
                        icon={EmailIcon}
                        id="EmailAddress"
                        aria-label="Email"
                        label=""
                        placeholder="Email Address"
                        error={!!form.formState.errors.EmailAddress}
                        iconClassName="w-6 h-6 mr-0 fill-transparent "
                      />
                    </FormControl>
                    <FormMessage className="text-primary">
                      {form.formState.errors.EmailAddress?.message}
                    </FormMessage>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Birthday */}
          <div className="grid grid-cols-12 items-center my-3">
            <div className="col-span-12 md:col-span-2 ">
              <p className="font-semibold text-headingColor text-base">
                Birthday:
              </p>
            </div>
            <div className="col-span-12 md:col-span-10 mt-2 md:mt-0">
              <FormField
                control={form.control}
                name="Birthday"
                render={({ field }) => (
                  <div className="w-full">
                    <FormControl>
                      <Datepicker
                        useRange={false}
                        value={birthday}
                        onChange={handleBirthDayChange}
                        toggleIcon={() => (
                          <CalendarIcon className="h-6 w-6 focus:text-primary fill-none stroke-none text-border" />
                        )}
                        containerClassName={
                          'custom-date-picker relative border border-border py-1 w-full rounded-lg focus-within:border-primary'
                        }
                        placeholder="Birthday"
                        inputId={field.name}
                        inputName={field.name}
                        popoverDirection="down"
                        inputClassName={
                          'relative duration-300 py-[4px] pr-14 pl-12 w-full text-base text-headingColor placeholder-placeholder font-normal !bg-transparent focus:border-none focus:outline-0  '
                        }
                        asSingle
                        readOnly
                        primaryColor="red"
                      />
                    </FormControl>
                    <FormMessage className="text-primary">
                      {form.formState.errors.Birthday?.message}
                    </FormMessage>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Address Line 1*/}
          <div className="grid grid-cols-12 items-center my-3">
            <div className="col-span-12 md:col-span-2 ">
              <p className="font-semibold text-headingColor text-base">
                Address Line 1:
              </p>
            </div>
            <div className="col-span-12 md:col-span-10 mt-2 md:mt-0">
              <FormField
                control={form.control}
                name="AddressLine1"
                render={({ field }) => (
                  <div className="w-full">
                    <FormControl>
                      <IconInput
                        {...field}
                        type="text"
                        id="AddressLine1"
                        aria-label="Address Line 1"
                        label=""
                        placeholder="Address Line 1"
                        error={!!form.formState.errors.AddressLine1}
                      />
                    </FormControl>
                    <FormMessage className="text-primary">
                      {form.formState.errors.AddressLine1?.message}
                    </FormMessage>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Address Line 2*/}
          <div className="grid grid-cols-12 items-center my-3">
            <div className="col-span-12 md:col-span-2 ">
              <p className="font-semibold text-headingColor text-base">
                Address Line 2:
              </p>
            </div>
            <div className="col-span-12 md:col-span-10  mt-2 md:mt-0">
              <FormField
                control={form.control}
                name="AddressLine2"
                render={({ field }) => (
                  <div className="w-full">
                    <FormControl>
                      <IconInput
                        {...field}
                        type="text"
                        id="AddressLine2"
                        aria-label="Address Line 2"
                        label=""
                        placeholder="Address Line 2"
                        error={!!form.formState.errors.AddressLine2}
                      />
                    </FormControl>
                    <FormMessage className="text-primary">
                      {form.formState.errors.AddressLine2?.message}
                    </FormMessage>
                  </div>
                )}
              />
            </div>
          </div>

          {/* City State */}
          <div className="grid grid-cols-12 items-center my-3">
            <div className="col-span-12 md:col-span-2">
              <p className="font-semibold text-headingColor text-base">City:</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <div className="grid grid-cols-12 items-center gap-x-4">
                <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
                  <FormField
                    control={form.control}
                    name="City"
                    render={({ field }) => (
                      <div className="w-full">
                        <FormControl>
                          <IconInput
                            {...field}
                            type="text"
                            id="City"
                            aria-label="City"
                            label=""
                            placeholder="City"
                            error={!!form.formState.errors.City}
                          />
                        </FormControl>
                        <FormMessage className="text-primary">
                          {form.formState.errors.City?.message}
                        </FormMessage>
                      </div>
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-2 mt-2 md:mt-0">
                  <p className="font-semibold text-headingColor text-base">
                    State:
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
                  <FormField
                    control={form.control}
                    name="StateProvinceName"
                    render={({ field }) => (
                      <div className="w-full">
                        <FormControl>
                          <IconInput
                            {...field}
                            type="text"
                            id="StateProvinceName"
                            aria-label="State"
                            label=""
                            placeholder="State"
                            error={!!form.formState.errors.StateProvinceName}
                          />
                        </FormControl>
                        <FormMessage className="text-primary">
                          {form.formState.errors.StateProvinceName?.message}
                        </FormMessage>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Country Postal */}
          <div className="grid grid-cols-12 items-center my-3">
            <div className="col-span-12 md:col-span-2">
              <p className="font-semibold text-headingColor text-base">
                Postal Code:
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <div className="grid grid-cols-12 items-center gap-x-4">
                <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
                  <FormField
                    control={form.control}
                    name="PostalCode"
                    render={({ field }) => (
                      <div className="w-full">
                        <FormControl>
                          <IconInput
                            {...field}
                            type="text"
                            id="PostalCode"
                            aria-label="postalCode"
                            label=""
                            placeholder="Postal Code"
                            error={!!form.formState.errors.PostalCode}
                          />
                        </FormControl>
                        <FormMessage className="text-primary">
                          {form.formState.errors.PostalCode?.message}
                        </FormMessage>
                      </div>
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-2 mt-2 md:mt-0">
                  <p className="font-semibold text-headingColor text-base">
                    Country:
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
                  <FormField
                    control={form.control}
                    name="CountryRegionName"
                    render={({ field }) => (
                      <div className="w-full">
                        <FormControl>
                          <IconInput
                            {...field}
                            type="text"
                            id="CountryRegionName"
                            aria-label="country"
                            label=""
                            placeholder="Country"
                            error={!!form.formState.errors.CountryRegionName}
                          />
                        </FormControl>
                        <FormMessage className="text-primary">
                          {form.formState.errors.CountryRegionName?.message}
                        </FormMessage>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* department  Job Title*/}
          <div className="grid grid-cols-12 items-center my-3">
            <div className="col-span-12 md:col-span-2">
              <p className="font-semibold text-headingColor text-base">
                Department:
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <div className="grid grid-cols-12 items-center gap-x-4">
                <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
                  <Controller
                    name="Department"
                    control={form.control}
                    render={({ field }) => (
                      <SelectDepartment
                        initialDepartment={field.value}
                        onDepartmentChange={(department) =>
                          field.onChange(department)
                        }
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-2 mt-2 md:mt-0">
                  <p className="font-semibold text-headingColor text-base">
                    Job Title:
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
                  <Controller
                    name="JobTitle"
                    control={form.control}
                    render={({ field }) => (
                      <SelectJobTitles
                        initialJobTitle={field.value}
                        onJobtitleChange={(jobTitle) =>
                          field.onChange(jobTitle)
                        }
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Button Handlers */}
          <div className="w-full flex justify-end mt-8">
            <div className="w-1/2 md:w-1/6 flex items-center gap-x-2 ">
              <Button
                className="py-5 w-full bg-headingColor text-white hover:bg-headingColor"
                onClick={() => router.push(employeesUrl)}
              >
                <span className="font-medium text-base">Back</span>
              </Button>
              <Button className="py-5 w-full" type="submit">
                <span className="font-medium text-base">Save</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeePersonalDetails;
