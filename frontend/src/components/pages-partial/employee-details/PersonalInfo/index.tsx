'use client';
import React from 'react';
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

import { generateMockDepartments, generateMockJobTitles } from '@/lib/mocks';
import { SelectJobTitles } from '@/components/common/SelectJobTitles';

interface MyProfileProps {}

const departments = generateMockDepartments(5);
const jobTitles = generateMockJobTitles(5);

const detailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  birthday: z.string().min(1, 'Birthday is required'),
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal Code is required'),
  country: z.string().min(1, 'Country is required'),
  department: z.string().min(1, 'Department is required'),
  jobTitle: z.string().min(1, 'Job Title is required'),
});

type FormFields = z.infer<typeof detailsSchema>;

const MyProfile: React.FC<MyProfileProps> = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(detailsSchema),
  });

  const [birthday, setBirthDay] = React.useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const onSubmit = (vals: FormFields) => {
    // Handle form submission
  };

  const handleBirthDayChange = (newValue: DateValueType) => {
    setBirthDay(newValue);
    if (newValue?.startDate) {
      form.setValue('birthday', newValue.startDate.toString());
    }
  };

  return (
    <div className="px-8 w-full md:w-3/4 ">
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
                  name="firstName"
                  render={({ field }) => (
                    <div className="w-full md:w-1/3 flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="firstName"
                          aria-label="First Name"
                          label=""
                          placeholder="First Name"
                          error={!!form.formState.errors.firstName}
                          className="!py-1"
                        />
                      </FormControl>
                      <FormMessage className="text-primary">
                        {form.formState.errors.firstName?.message}
                      </FormMessage>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <div className="w-full md:w-1/3 flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="middleName"
                          aria-label="Middle Name"
                          placeholder="Middle Name"
                          label=""
                          error={!!form.formState.errors.firstName}
                          className="!py-1"
                        />
                      </FormControl>
                      <FormMessage className="text-primary">
                        {form.formState.errors.firstName?.message}
                      </FormMessage>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <div className="w-full md:w-1/3 flex flex-col">
                      <FormControl>
                        <IconInput
                          {...field}
                          type="text"
                          id="lastName"
                          aria-label="Last Name"
                          label=""
                          placeholder="Last Name"
                          error={!!form.formState.errors.lastName}
                          className="!py-1"
                        />
                      </FormControl>
                      <FormMessage className="text-primary">
                        {form.formState.errors.lastName?.message}
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
                name="email"
                render={({ field }) => (
                  <div className="w-full">
                    <FormControl>
                      <IconInput
                        {...field}
                        type="email"
                        icon={EmailIcon}
                        id="email"
                        aria-label="Email"
                        label=""
                        placeholder="Email Address"
                        error={!!form.formState.errors.email}
                        className="!py-1"
                        iconClassName="w-6 h-6 mt-2 mr-0 fill-transparent "
                      />
                    </FormControl>
                    <FormMessage className="text-primary">
                      {form.formState.errors.email?.message}
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
                name="birthday"
                render={({ field }) => (
                  <div className="w-full">
                    <FormControl>
                      <Datepicker
                        useRange={false}
                        value={birthday}
                        onChange={handleBirthDayChange}
                        toggleIcon={(open) => (
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
                          'relative duration-300 py-1.5 pr-14 pl-12 w-full text-base text-headingColor placeholder-placeholder font-normal !bg-transparent focus:border-none focus:outline-0  '
                        }
                        asSingle
                        readOnly
                        primaryColor="red"
                      />
                    </FormControl>
                    <FormMessage className="text-primary">
                      {form.formState.errors.birthday?.message}
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
                name="addressLine1"
                render={({ field }) => (
                  <div className="w-full">
                    <FormControl>
                      <IconInput
                        {...field}
                        type="text"
                        id="addressLine1"
                        aria-label="Address Line 1"
                        label=""
                        placeholder="Address Line 1"
                        error={!!form.formState.errors.addressLine1}
                        className="!py-1"
                        iconClassName="w-6 h-6 mt-2 mr-0 fill-transparent "
                      />
                    </FormControl>
                    <FormMessage className="text-primary">
                      {form.formState.errors.addressLine1?.message}
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
                name="addressLine2"
                render={({ field }) => (
                  <div className="w-full">
                    <FormControl>
                      <IconInput
                        {...field}
                        type="text"
                        id="addressLine2"
                        aria-label="Address Line 2"
                        label=""
                        placeholder="Address Line 2"
                        error={!!form.formState.errors.addressLine2}
                        className="!py-1"
                        iconClassName="w-6 h-6 mt-2 mr-0 fill-transparent "
                      />
                    </FormControl>
                    <FormMessage className="text-primary">
                      {form.formState.errors.addressLine2?.message}
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
                    name="city"
                    render={({ field }) => (
                      <div className="w-full">
                        <FormControl>
                          <IconInput
                            {...field}
                            type="text"
                            id="city"
                            aria-label="City"
                            label=""
                            placeholder="City"
                            error={!!form.formState.errors.city}
                            className="!py-1"
                            iconClassName="w-6 h-6 mt-2 mr-0 fill-transparent "
                          />
                        </FormControl>
                        <FormMessage className="text-primary">
                          {form.formState.errors.city?.message}
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
                    name="state"
                    render={({ field }) => (
                      <div className="w-full">
                        <FormControl>
                          <IconInput
                            {...field}
                            type="text"
                            id="state"
                            aria-label="State"
                            label=""
                            placeholder="State"
                            error={!!form.formState.errors.state}
                            className="!py-1"
                            iconClassName="w-6 h-6 mt-2 mr-0 fill-transparent "
                          />
                        </FormControl>
                        <FormMessage className="text-primary">
                          {form.formState.errors.state?.message}
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
                    name="postalCode"
                    render={({ field }) => (
                      <div className="w-full">
                        <FormControl>
                          <IconInput
                            {...field}
                            type="text"
                            id="postalCode"
                            aria-label="postalCode"
                            label=""
                            placeholder="Postal Code"
                            error={!!form.formState.errors.postalCode}
                            className="!py-1"
                            iconClassName="w-6 h-6 mt-2 mr-0 fill-transparent "
                          />
                        </FormControl>
                        <FormMessage className="text-primary">
                          {form.formState.errors.postalCode?.message}
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
                    name="country"
                    render={({ field }) => (
                      <div className="w-full">
                        <FormControl>
                          <IconInput
                            {...field}
                            type="text"
                            id="country"
                            aria-label="country"
                            label=""
                            placeholder="Country"
                            error={!!form.formState.errors.country}
                            className="!py-1"
                            iconClassName="w-6 h-6 mt-2 mr-0 fill-transparent "
                          />
                        </FormControl>
                        <FormMessage className="text-primary">
                          {form.formState.errors.country?.message}
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
                    name="department"
                    control={form.control}
                    render={({ field }) => (
                      <SelectDepartment
                        initialDepartment={field.value}
                        onDepartmentChange={(department) =>
                          field.onChange(department)
                        }
                        departments={departments}
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
                    name="jobTitle"
                    control={form.control}
                    render={({ field }) => (
                      <SelectJobTitles
                        initialJobTitle={field.value}
                        onJobtitleChange={(jobTitle) =>
                          field.onChange(jobTitle)
                        }
                        jobTitles={jobTitles}
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
              <Button className="py-5 w-full bg-headingColor text-white hover:bg-headingColor">
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

export default MyProfile;
