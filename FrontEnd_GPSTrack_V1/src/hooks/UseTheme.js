import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../feature/other/themeSlice';

const UseTheme = () => {
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.theme.darkMode);

  const handleModifyTheme = (boolean) => {
    dispatch(setTheme(boolean));
  };

  return { themeState, handleModifyTheme };
};

export default UseTheme;
