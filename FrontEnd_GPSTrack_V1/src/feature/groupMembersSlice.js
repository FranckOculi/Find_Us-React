import { createSlice } from '@reduxjs/toolkit';

export const groupMembersSlice = createSlice({
  name: 'groupMembers',
  initialState: [],

  reducers: {
    addMember: (state, { payload }) => {
      state.push(payload);
    },
    addPosition: (state, { payload }) => {
      const membre = state.find(
        (membre) => membre.utilisateurId === payload[0],
      );
      if (membre) {
        membre.position = payload[1];
      }
    },
    removeMemberStore: (state, { payload }) => {
      return state.filter(({ codeGroupe }) => codeGroupe === payload);
    },
  },
});

export const { addMember, addPosition, removeMemberStore, reloadMemberStore } =
  groupMembersSlice.actions;
export default groupMembersSlice.reducer;
