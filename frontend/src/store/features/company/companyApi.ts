// store/companyApi.ts

import toast from 'react-hot-toast';
import { apiSlice } from '../api/apiSlice';
import {
  IEmployee,
  IDepartment,
  IJobTitle,
  ISales,
  IStatus,
} from '@/lib/types';

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEmployees: builder.query<
      IEmployee[],
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => ({
        url: `/api/employees?page=${page}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      providesTags: ['Employees'],
      keepUnusedDataFor: 600,
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg || currentArg?.page == 0) {
          return true;
        }
        return currentArg?.page !== previousArg.page;
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message ||
              'Failed to fetch employees falling Back to mock data'
          );
        }
      },
    }),

    fetchEmployee: builder.query<IEmployee, string>({
      query: (id) => ({
        url: `/api/employees/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Employee', id }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message ||
              'Failed to fetch employee falling Back to mock data'
          );
        }
      },
      keepUnusedDataFor: 600,
    }),

    updateEmployee: builder.mutation<
      IEmployee,
      Partial<IEmployee> & { id: string }
    >({
      query: ({ id, ...patch }) => ({
        url: `/api/employees/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Employee', id }],
    }),

    fetchDepartments: builder.query<IDepartment[], void>({
      query: () => '/api/departments',
      providesTags: ['Departments'],
      keepUnusedDataFor: 600,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message ||
              'Failed to fetch departments falling Back to mock data'
          );
        }
      },
    }),

    fetchJobTitles: builder.query<IJobTitle[], void>({
      query: () => '/api/job-titles',
      providesTags: ['JobTitles'],
      keepUnusedDataFor: 600,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message ||
              'Failed to fetch job titles falling Back to mock data'
          );
        }
      },
    }),

    fetchSales: builder.query<
      ISales[],
      { page: number; pageSize: number; startDate?: string; endDate?: string }
    >({
      query: ({ page, pageSize, startDate, endDate }) => ({
        url: `/api/sales?page=${page}&pageSize=${pageSize}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['Sales'],
      keepUnusedDataFor: 600,
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg || currentArg?.page == 0) {
          return true;
        }
        return currentArg?.page !== previousArg.page;
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message ||
              'Failed to fetch sales falling Back to mock data'
          );
        }
      },
    }),

    fetchSale: builder.query<ISales, string>({
      query: (id) => ({
        url: `/api/sales/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 600,
      providesTags: (result, error, id) => [{ type: 'Sale', id }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message ||
              'Failed to fetch sale falling Back to mock data'
          );
        }
      },
    }),

    fetchSalesStatuses: builder.query<IStatus[], void>({
      query: () => '/api/sales/statuses',
      providesTags: ['SalesStatuses'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message ||
              'Failed to fetch sales statuses falling Back to mock data'
          );
        }
      },
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {
  useFetchEmployeesQuery,
  useFetchEmployeeQuery,
  useUpdateEmployeeMutation,
  useFetchDepartmentsQuery,
  useFetchJobTitlesQuery,
  useFetchSalesQuery,
  useFetchSaleQuery,
  useFetchSalesStatusesQuery,
} = companyApi;
