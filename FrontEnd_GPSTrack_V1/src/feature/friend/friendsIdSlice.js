import { createSlice } from '@reduxjs/toolkit';

export const userFriendsSlice = createSlice({
  name: 'friendsId',
  initialState: [],
  reducers: {
    //Id
    setFriends: (state, { payload }) => {
      state.push(payload);
    },
    clearFriends: (state, { payload }) => {
      return state.filter(({ codeGroupe }) => codeGroupe === payload);
    },
  },
});

export const { setFriends, clearFriends, setFriendsData } =
  userFriendsSlice.actions;
export default userFriendsSlice.reducer;
