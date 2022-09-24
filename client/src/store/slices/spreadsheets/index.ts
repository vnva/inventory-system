import { createSlice } from '@reduxjs/toolkit';
import { getSpreadsheets } from './get-spreadsheets';

const initialState = {
  spreadsheets: [],
  spreadsheetsIsLoading: true,
  spreadsheetsIsLoaded: false,
};

export const spreadsheetsSlice = createSlice({
  name: 'spreadsheets',
  initialState,
  reducers: {},
  extraReducers: {
    [getSpreadsheets.fulfilled.type]: (state, action) => {
      state.spreadsheets = action.payload;
      (state.spreadsheetsIsLoaded = true),
        (state.spreadsheetsIsLoading = false);
    },
    [getSpreadsheets.pending.type]: state => {
      state.spreadsheetsIsLoading = true;
    },
  },
});
