import { createSlice } from '@reduxjs/toolkit';

export const userAuthSlice = createSlice({
  name: 'useAuth',
  initialState: {
    isAuth: null,
    isTuto: null,
  },
  reducers: {
    setIsAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
    setIsTuto: (state, { payload }) => {
      state.isTuto = payload;
    },
    // setToken: (state, { payload }) => {
    //   state.token = payload;
    // },
  },
});

export const { setIsAuth, setIsTuto } = userAuthSlice.actions;
// setToken }
export default userAuthSlice.reducer;
