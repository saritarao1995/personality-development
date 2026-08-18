import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminApi, getApiError } from '../../services/api';

export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await adminApi.getStats();
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to fetch stats'));
    }
  }
);

export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await adminApi.getUsers();
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to fetch users'));
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      return await adminApi.updateUserRole(id, role);
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to update role'));
    }
  }
);

export const deleteAdminUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(getApiError(error, 'Failed to delete user'));
    }
  }
);

const initialState = {
  stats: null,
  users: [],
  loading: false,
  usersLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
        if (state.stats) state.stats.totalUsers -= 1;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
