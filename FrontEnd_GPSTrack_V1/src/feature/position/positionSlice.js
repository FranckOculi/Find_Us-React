import { createSlice } from '@reduxjs/toolkit';

export const userPositionSlice = createSlice({
  name: 'position',
  initialState: {
    latitude: null,
    longitude: null,
  },
  reducers: {
    setPosition: (state, { payload }) => {
      state.latitude = payload.latitude;
      state.longitude = payload.longitude;
    },
    clearPosition: (state, { payload }) => {
      if (state.latitude === null && state.longitude === null) return;
      state.latitude = null;
      state.longitude = null;
    },
  },
});

export const { setPosition } = userPositionSlice.actions;
export default userPositionSlice.reducer;
