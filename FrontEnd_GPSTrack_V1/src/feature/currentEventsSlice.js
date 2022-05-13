import { createSlice } from '@reduxjs/toolkit';

export const currentEvents = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    setCurrentEvents: (state, { payload }) => {
      state.push(payload);
    },
    eraseCurrentEvent: (state, { payload }) => {
      return (state = state.filter(
        ({ codeEvenement }) => codeEvenement !== payload,
      ));
    },
  },
});

export const { setCurrentEvents, eraseCurrentEvent } = currentEvents.actions;
export default currentEvents.reducer;
