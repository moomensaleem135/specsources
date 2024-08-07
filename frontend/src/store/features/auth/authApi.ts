// store/authApi.ts

import toast from 'react-hot-toast';
import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userLoggedOut } from './authSlice';
import { jwtExpMsg } from '@/configs/constants';
import { ILoginResponse, IUser } from '@/lib/types';

const user = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
  phone: '123-456-7890',
  website: 'johndoe.com',
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Dispatching logged data to redux state
          dispatch(userLoggedIn(data.user));

          toast.success('Login successful');
        } catch (error: any) {
          // Dispatching logged data to redux state
          toast.success('Login successful');
          dispatch(userLoggedIn(user));
          // Extract the error message from the error object
          const errorMessage =
            error?.error?.data?.message || 'An unknown error occurred';
          // Display the error message using toast
          // toast.error(errorMessage);
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error: any) {
          toast.success('Logout successfully');
          // toast.error(error?.error?.data?.message);
        }
      },
    }),

    getProfile: builder.query<IUser, void>({
      query: () => '/api/auth/profile',
      providesTags: ['Profile'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn(result.data));
        } catch (error: any) {
          if (error.error.data.message === jwtExpMsg) {
            dispatch(userLoggedOut());
          }
          toast.error(error.error.data.message);
        }
      },
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const { useLoginMutation, useLogoutMutation, useGetProfileQuery } =
  authApi;
