import { createSlice } from '@reduxjs/toolkit';
import { getAllChats } from './chat.actions';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    loading: false,
    allChats: [],
    visibleChats: [],
    pageSize: 10,
    pageNumber: 1,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.allChats = [];
      state.visibleChats = [];
      state.pageSize = 10;
      state.pageNumber = 1;
    },
    setPageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    setVisibleChats: (state, { payload }) => {
      state.visibleChats = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChats.pending, (state) => {
      state.loading = true;
      state.allChats = [];
    }),
      builder.addCase(getAllChats.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allChats = payload;
        state.visibleChats = payload?.slice(0, state.pageSize);
        state.pageNumber = 1;
      }),
      builder.addCase(getAllChats.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { clearState, setPageNumber, setVisibleChats } = chatSlice.actions;

export default chatSlice.reducer;