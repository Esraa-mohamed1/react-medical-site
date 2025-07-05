import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/medical/time-slots/available/create/';

// Fetch
export const fetchAvailability = createAsyncThunk('availability/fetch', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Add
export const addAvailability = createAsyncThunk('availability/add', async (data) => {
  const token = localStorage.getItem('access');
  const res = await axios.post(API_URL, {
    date: data.date,
    start_time: data.start_time || data.startTime,
    end_time: data.end_time || data.endTime
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.data;
});

// Delete
export const deleteAvailability = createAsyncThunk('availability/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const availabilitySlice = createSlice({
  name: 'availability',
  initialState: { slots: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.slots = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addAvailability.fulfilled, (state, action) => {
        state.slots.push(action.payload);
      })
      .addCase(deleteAvailability.fulfilled, (state, action) => {
        state.slots = state.slots.filter(slot => slot.id !== action.payload);
      });
  }
});

export default availabilitySlice.reducer;
