import { createSlice } from '@reduxjs/toolkit';

export const userEventsSlice = createSlice({
  name: 'events',
  initialState: [],

  reducers: {
    setEvents: (state, { payload }) => {
      state.push(payload);
    },
    // addMember: (state, { payload }) => {
    //   return (state = state
    //     .filter(({ codeEvenement }) => {
    //       return codeEvenement === payload;
    //     })
    //     .filter(({ membres }) => {
    //       return membres !== payload;
    //     }));
    // },
    eraseEvent: (state, { payload }) => {
      console.log(payload);
      return (state = state.filter(
        ({ codeEvenement }) => codeEvenement !== payload,
      ));
    },
  },
});

export const { setEvents, eraseEvent } = userEventsSlice.actions;
export default userEventsSlice.reducer;
