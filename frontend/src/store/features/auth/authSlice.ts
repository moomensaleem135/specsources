import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IInitialState, IUser } from './types';

const initialState: IInitialState = {
  user: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state: IInitialState, { payload }: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = payload;
    },
    userLoggedOut: (state: IInitialState) => {
      state.user = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
