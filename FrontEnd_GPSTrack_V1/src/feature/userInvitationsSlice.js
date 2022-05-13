import { createSlice } from '@reduxjs/toolkit';

export const userInvitationsSlice = createSlice({
  name: 'userInvitations',
  initialState: [],

  reducers: {
    setInvitations: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { setInvitations } = userInvitationsSlice.actions;
export default userInvitationsSlice.reducer;
