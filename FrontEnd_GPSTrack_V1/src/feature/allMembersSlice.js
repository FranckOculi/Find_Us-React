import { createSlice } from '@reduxjs/toolkit';

export const allMembersSlice = createSlice({
  name: 'allMembers',
  initialState: { groupes: null },

  reducers: {
    addAllMembers: (state, { payload }) => {
      state.groupes = payload;
    },
    clearAllMembers: (state, { payload }) => {
      if (state.groupes === null) return;
      for (let i = 0; i < state.groupes.length; i++) {
        state.groupes[i] = null;
      }
      // state.groupes = null;
    },
  },
});

export const { addAllMembers, clearAllMembers } = allMembersSlice.actions;
export default allMembersSlice.reducer;
