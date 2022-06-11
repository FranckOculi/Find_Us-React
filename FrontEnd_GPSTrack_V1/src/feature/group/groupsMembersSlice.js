import { createSlice } from '@reduxjs/toolkit';

export const userGroupMembers = createSlice({
  name: 'userGroupMembers',
  initialState: { groupes: null },

  reducers: {
    addAllMembers: (state, { payload }) => {
      state.groupes = payload;
    },
    clearAllMembers: (state, { payload }) => {
      if (state.groupes === null) return;
      state.groupes = null;
    },
  },
});

export const { addAllMembers, clearAllMembers } = userGroupMembers.actions;
export default userGroupMembers.reducer;
