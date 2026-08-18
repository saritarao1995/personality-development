import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { goalsApi, getApiError } from '../../services/api';

export const fetchGoals = createAsyncThunk('goals/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await goalsApi.getAll();
  } catch (error) {
    return rejectWithValue(getApiError(error, 'Failed to fetch goals'));
  }
});

export const createGoal = createAsyncThunk('goals/create', async (goalData, { rejectWithValue }) => {
  try {
    return await goalsApi.create(goalData);
  } catch (error) {
    return rejectWithValue(getApiError(error, 'Failed to create goal'));
  }
});

export const updateGoal = createAsyncThunk(
  'goals/update',
  async ({ id, ...goalData }, { rejectWithValue }) => {
    try {
      return await goalsApi.update(id, goalData);
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to update goal'));
    }
  }
);

export const deleteGoal = createAsyncThunk('goals/delete', async (id, { rejectWithValue }) => {
  try {
    await goalsApi.delete(id);
    return id;
  } catch (error) {
    return rejectWithValue(getApiError(error, 'Failed to delete goal'));
  }
});

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    clearGoalError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const index = state.items.findIndex((g) => g._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.items = state.items.filter((g) => g._id !== action.payload);
      });
  },
});

export const { clearGoalError } = goalsSlice.actions;
export default goalsSlice.reducer;
