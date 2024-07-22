// store/companyApi.ts

import toast from 'react-hot-toast';
import { apiSlice } from '../api/apiSlice';
import {
  IEmployee,
  IEmployeeResponse,
  IDepartmentResponse,
  IJobTitleResponse,
  ISales,
  IPaginatedResponse,
  ISalesRequestParams,
  IEmployeesRequestParams,
  ISalesInfo,
} from '@/lib/types';

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEmployees: builder.query<IEmployeeResponse, IEmployeesRequestParams>({
      query: ({ offset, search, JobTitle, Department, limit }) => ({
        url: `/api/vemployee${offset ? `?offset=${offset}` : ''}${limit ? `&limit=${limit}` : ''}${search ? `&search=${search}` : ''}${JobTitle ? `&JobTitle=${JobTitle}` : ''}${Department ? `&Department=${Department}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['Employees'],
      keepUnusedDataFor: 600,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message || 'Failed to fetch employees'
          );
        }
      },
    }),

    fetchEmployee: builder.query<IEmployee, string>({
      query: (id) => ({
        url: `/api/vemployee/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Employee', id }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message || 'Failed to fetch employee'
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

    fetchDepartments: builder.query<IDepartmentResponse, void>({
      query: () => '/api/department/',
      providesTags: ['Departments'],
      keepUnusedDataFor: 600,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message || 'Failed to fetch departments'
          );
        }
      },
    }),

    fetchJobTitles: builder.query<IJobTitleResponse, void>({
      query: () => '/api/jobtitle/',
      providesTags: ['JobTitles'],
      keepUnusedDataFor: 600,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message || 'Failed to fetch job titles'
          );
        }
      },
    }),

    fetchSales: builder.query<IPaginatedResponse<ISales>, ISalesRequestParams>({
      query: ({ offset, limit, Status, search, start_date, end_date }) => ({
        url: `/api/salesorderheader/${offset ? `?offset=${offset}` : ''}${limit ? `?limit=${limit}` : ''}${Status ? `&Status=${Status}` : ''}${search ? `&search=${search}` : ''}${start_date ? `&start_date=${start_date}` : ''}${end_date ? `&end_date=${end_date}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['Sales'],
      keepUnusedDataFor: 600,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(error?.error?.data?.message || 'Failed to fetch sales');
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
          toast.error(error?.error?.data?.message || 'Failed to fetch sale');
        }
      },
    }),

    fetchStatInfo: builder.query<ISalesInfo, string>({
      query: (id) => ({
        url: `/api/stats/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 600,
      providesTags: (result, error, id) => [{ type: 'Sale', id }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message || 'Failed to fetch stat data'
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
  useLazyFetchEmployeesQuery,
  useUpdateEmployeeMutation,
  useFetchDepartmentsQuery,
  useFetchJobTitlesQuery,
  useFetchSalesQuery,
  useFetchSaleQuery,
  useLazyFetchSalesQuery,
  useFetchStatInfoQuery,
} = companyApi;
