import { createSlice } from '@reduxjs/toolkit';

export const userGroupsSlice = createSlice({
  name: 'groups',
  initialState: [],

  reducers: {
    setGroup: (state, { payload }) => {
      state.push(payload);
    },
    removeGroupStore: (state, { payload }) => {
      return state.filter(({ codeGroupe }) => codeGroupe !== payload);
    },
  },
});

export const { setGroup, removeGroupStore } = userGroupsSlice.actions;
export default userGroupsSlice.reducer;
