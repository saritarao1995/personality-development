import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import goalsReducer from './slices/goalsSlice';
import journalReducer from './slices/journalSlice';
import assessmentsReducer from './slices/assessmentsSlice';
import themeReducer from './slices/themeSlice';
import adminReducer from './slices/adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    journal: journalReducer,
    assessments: assessmentsReducer,
    theme: themeReducer,
    admin: adminReducer,
  },
});

export default store;
