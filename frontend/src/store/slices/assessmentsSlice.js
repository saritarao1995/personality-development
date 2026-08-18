import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { assessmentsApi, getApiError } from '../../services/api';

export const fetchQuestions = createAsyncThunk(
  'assessments/fetchQuestions',
  async (_, { rejectWithValue }) => {
    try {
      return await assessmentsApi.getQuestions();
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to fetch questions'));
    }
  }
);

export const fetchAssessments = createAsyncThunk(
  'assessments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await assessmentsApi.getAll();
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to fetch assessments'));
    }
  }
);

export const submitAssessment = createAsyncThunk(
  'assessments/submit',
  async (answers, { rejectWithValue }) => {
    try {
      return await assessmentsApi.submit(answers);
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to submit assessment'));
    }
  }
);

const initialState = {
  questions: [],
  history: [],
  currentResults: null,
  loading: false,
  error: null,
};

const assessmentsSlice = createSlice({
  name: 'assessments',
  initialState,
  reducers: {
    clearCurrentResults: (state) => {
      state.currentResults = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(submitAssessment.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResults = action.payload.results;
        state.history.unshift(action.payload);
      })
      .addCase(submitAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentResults } = assessmentsSlice.actions;
export default assessmentsSlice.reducer;
