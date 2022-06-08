import { createSlice } from '@reduxjs/toolkit';

export const groupSingleMembersSlice = createSlice({
  name: 'groupSingleMember',
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
  groupSingleMembersSlice.actions;
export default groupSingleMembersSlice.reducer;
