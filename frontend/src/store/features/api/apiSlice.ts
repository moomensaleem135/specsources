import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define an API slice with endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    credentials: 'include',
  }),
  tagTypes: ['Users', 'User', 'Profile'],
  endpoints: () => ({}),
});
