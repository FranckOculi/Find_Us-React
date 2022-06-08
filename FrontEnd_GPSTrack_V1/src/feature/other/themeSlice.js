import { createSlice } from '@reduxjs/toolkit';

export const themeSelect = createSlice({
  name: 'theme',
  initialState: { darkMode: false },
  reducers: {
    setTheme: (state, { payload }) => {
      state.darkMode = payload;
    },
  },
});

export const { setTheme } = themeSelect.actions;
export default themeSelect.reducer;
