import { createSlice } from '@reduxjs/toolkit';

export const userIdSlice = createSlice({
  name: 'id',
  initialState: {
    id: null,
  },
  reducers: {
    setId: (state, { payload }) => {
      state.id = payload;
    },
  },
});

export const { setId } = userIdSlice.actions;
export default userIdSlice.reducer;
