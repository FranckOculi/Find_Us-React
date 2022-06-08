import { createSlice } from '@reduxjs/toolkit';

export const userGroupInvitationsSlice = createSlice({
  name: 'userGroupInvitations',
  initialState: [],

  reducers: {
    setInvitations: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { setInvitations } = userGroupInvitationsSlice.actions;
export default userGroupInvitationsSlice.reducer;
