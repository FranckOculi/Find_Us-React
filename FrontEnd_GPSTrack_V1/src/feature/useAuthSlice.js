import { createSlice } from '@reduxjs/toolkit';

export const useAuthSlice = createSlice({
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

export const { setIsAuth, setIsTuto } = useAuthSlice.actions;
// setToken }
export default useAuthSlice.reducer;
