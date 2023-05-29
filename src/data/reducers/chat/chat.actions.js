import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatServices } from '../../services/chat/chat.service';

// async action to call getAllChats service
export const getAllChats = createAsyncThunk(
  'chat/getAllChats',
  async (payload, { rejectWithValue }) => {
    const res = await chatServices.getAllChats(payload);
    if (res.isSuccessful) {
      return res.data;
    }
    else {
      return rejectWithValue('something went wrong');
    }
  }
);