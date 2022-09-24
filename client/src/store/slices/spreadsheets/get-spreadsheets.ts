import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '@/api';

export const getSpreadsheets = createAsyncThunk(
  'spreadsheets/get-spreadsheets',
  async () => {
    const { data: spreadsheets } = await api.spreadsheets.get();

    return spreadsheets;
  }
);
