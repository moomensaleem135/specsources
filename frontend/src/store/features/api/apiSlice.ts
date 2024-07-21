import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

// Define an API slice with endpoints

// Define the base queries for different base URLs
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: '/',
  credentials: 'include',
});

const baseQueryWithCompany = fetchBaseQuery({
  baseUrl: 'http://12.23.34.56:5000/',
  credentials: 'include',
});

// Custom baseQuery function to choose the correct baseQuery
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (
    typeof args === 'string'
      ? args.startsWith('/auth')
      : args.url.startsWith('/auth')
  ) {
    return baseQueryWithAuth(args, api, extraOptions);
  } else {
    return baseQueryWithCompany(args, api, extraOptions);
  }
};
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: [
    'Users',
    'User',
    'Profile',
    'Employees',
    'Employee',
    'Departments',
    'JobTitles',
    'Sales',
    'Sale',
    'SalesStatuses',
  ],
  endpoints: () => ({}),
});
