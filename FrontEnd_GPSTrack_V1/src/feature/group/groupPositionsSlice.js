import { createSlice } from '@reduxjs/toolkit';

export const groupsPositions = createSlice({
  name: 'groupsPositions',
  initialState: [],

  reducers: {
    addAllPositions: (state, { payload }) => {
      state.push(payload);
    },
    setStatus: (state, { payload }) => {
      const member = state.find(
        (member) => member.utilisateurPosition == payload.id,
      );
      if (member) {
        member.status = payload.status;
      }
    },
    setAllStatus: (state, { payload }) => {
      if (!state) return;
      else {
        for (let i = 0; i < state.length; i++) {
          state[i].status = payload;
        }
      }
    },
    clearAllPositions: (state, { payload }) => {
      if (state.groupes === null) return;
      return state.filter(({ codeGroupe }) => codeGroupe === payload);
    },
  },
});

export const { addAllPositions, setStatus, setAllStatus, clearAllPositions } =
  groupsPositions.actions;
export default groupsPositions.reducer;
