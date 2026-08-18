import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { journalApi, getApiError } from '../../services/api';

export const fetchJournalEntries = createAsyncThunk(
  'journal/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await journalApi.getAll();
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to fetch journal entries'));
    }
  }
);

export const createJournalEntry = createAsyncThunk(
  'journal/create',
  async (entryData, { rejectWithValue }) => {
    try {
      return await journalApi.create(entryData);
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to create entry'));
    }
  }
);

export const deleteJournalEntry = createAsyncThunk(
  'journal/delete',
  async (id, { rejectWithValue }) => {
    try {
      await journalApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to delete entry'));
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJournalEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJournalEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchJournalEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createJournalEntry.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteJournalEntry.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e._id !== action.payload);
      });
  },
});

export default journalSlice.reducer;
