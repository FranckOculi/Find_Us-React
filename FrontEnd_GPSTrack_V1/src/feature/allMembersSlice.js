import { createSlice } from '@reduxjs/toolkit';

export const allMembersSlice = createSlice({
  name: 'allMembers',
  initialState: [],

  reducers: {
    addAllMembers: (state, { payload }) => {
      console.log(payload);
      if (!state[0]) {
        state.push(payload);
      }
      if (state[0]) {
        const nex = state.filter(({ groupeCode }) => groupeCode !== payload);
        state.push(nex);
      }
    },
  },
});

export const { addAllMembers } = allMembersSlice.actions;
export default allMembersSlice.reducer;
