import { createSlice } from '@reduxjs/toolkit';
import { setUser } from './set-user';

const initialState = {
  user: {
    username: '',
  },
  userIsLoading: true,
  userIsLoaded: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanAuth: () => initialState,
  },
  extraReducers: {
    [setUser.fulfilled.type]: (state, action) => {
      state.user = action.payload;
      state.userIsLoading = false;
      state.userIsLoaded = true;
    },
    [setUser.pending.type]: state => {
      state.userIsLoading = true;
    },
  },
});

const { cleanAuth } = authSlice.actions;

export { setUser, cleanAuth };
