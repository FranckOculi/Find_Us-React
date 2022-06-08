import { createSlice } from '@reduxjs/toolkit';

export const friendsPositionsSlice = createSlice({
  name: 'friendsPositions',
  initialState: [],
  reducers: {
    addFriendsPositions: (state, { payload }) => {
      state.push(payload);
    },
    clearFriendsPositions: (state, { payload }) => {
      state.filter(({ codeGroupe }) => codeGroupe === payload);
    },
  },
});

export const { addFriendsPositions, clearFriendsPositions } =
  friendsPositionsSlice.actions;
export default friendsPositionsSlice.reducer;
