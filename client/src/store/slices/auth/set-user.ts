import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '@/api';

export const setUser = createAsyncThunk('auth/set-user', async () => {
  const { data: user } = await api.users.getMe();

  return user;
});
