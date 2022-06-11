import { createSlice } from '@reduxjs/toolkit';

export const groupSelectedSlice = createSlice({
  name: 'groupSelected',
  initialState: { groupCode: null },

  reducers: {
    setSelectedGroup: (state, { payload }) => {
      state.groupCode = payload;
    },
    removeSelectedGroup: (state, { payload }) => {
      state.groupCode = null;
    },
  },
});

export const { setSelectedGroup, removeSelectedGroup } =
  groupSelectedSlice.actions;
export default groupSelectedSlice.reducer;
