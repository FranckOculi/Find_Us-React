import { createSlice } from '@reduxjs/toolkit';

export const userPositionsSlice = createSlice({
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
  },
});

export const { setPosition } = userPositionsSlice.actions;
export default userPositionsSlice.reducer;
