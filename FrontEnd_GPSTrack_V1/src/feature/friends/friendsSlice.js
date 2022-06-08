import { createSlice } from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: [],
  reducers: {
    setFriendsData: (state, { payload }) => {
      state.push(payload);
      //   state.amis = action.payload.recepteurUserId;
    },
  },
});

export const { setFriendsData } = friendsSlice.actions;
export default friendsSlice.reducer;
