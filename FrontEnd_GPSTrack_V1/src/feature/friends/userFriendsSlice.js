import { createSlice } from '@reduxjs/toolkit';

export const userFriendsSlice = createSlice({
  name: 'friends',
  // initialState: {
  //   friendId: null,
  // },
  initialState: [],
  reducers: {
    setFriends: (state, { payload }) => {
      state.push(payload);
      //   state.amis = action.payload.recepteurUserId;
    },
    clearFriends: (state, { payload }) => {
      return state.filter(({ codeGroupe }) => codeGroupe === payload);
    },
  },
});

export const { setFriends, clearFriends } = userFriendsSlice.actions;
export default userFriendsSlice.reducer;
