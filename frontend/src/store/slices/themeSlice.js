import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_THEME_ID } from '../../config/themes';

const STORAGE_KEY = 'app-theme';

const getStoredTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    activeThemeId: getStoredTheme(),
  },
  reducers: {
    setTheme: (state, action) => {
      state.activeThemeId = action.payload;
      localStorage.setItem(STORAGE_KEY, action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
