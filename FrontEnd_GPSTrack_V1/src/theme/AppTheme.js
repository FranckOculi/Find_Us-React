import { createTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import UseTheme from '../hooks/UseTheme';
import { Link, useLocation } from 'react-router-dom';
import AuthTheme from './AuthTheme';
import GroupFormTheme from './GroupFormTheme';

/**
 * Material UI theme "front" colors, "back" colors are different for Light and Dark modes
 */
const FRONT_COLORS = {
  primary: {
    main: '#81c784', // Green 300
    contrastText: '#000000',
  },
  secondary: {
    main: '#ffb74d', // Orange 300
    contrastText: '#000',
  },
  info: {
    main: '#0277bd', // Light Blue 800
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#2e7d32', // Green 800
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#f9a825', // Yellow 800
    // contrastText: '#000000',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#c62828', // Red 800
    contrastText: '#FFFFFF',
  },
};

/**
 * Material UI theme config for "Light Mode"
 */
const LIGHT_THEME = {
  palette: {
    mode: 'light',
    background: {
      //   paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
      default: '#FFFFFF',
    },
    ...FRONT_COLORS,
  },
};

/**
 * Material UI theme config for "Dark Mode"
 */
const DARK_THEME = {
  palette: {
    mode: 'dark',
    background: {
      paper: '#424242', // Gray 800 - Background of "Paper" based component
      default: '#303030',
    },
    ...FRONT_COLORS,
  },
};

/**
 * Material UI Provider with Light and Dark themes depending on global "state.darkMode"
 */
const AppTheme = () => {
  const { themeState } = UseTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const location = useLocation();

  const getTheme = (page) => {
    switch (page) {
      case 'Auth':
        return (theme = createTheme(AuthTheme.getTheme()));
      case 'GroupForm':
        return (theme = createTheme(GroupFormTheme.getTheme()));

      default:
        theme = themeState.darkMode
          ? createTheme(DARK_THEME)
          : createTheme(LIGHT_THEME);
        return theme;
    }
  };

  // const theme = useMemo(() => (state.darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME)));

  let theme = null;
  if (location.pathname === '/auth') {
    theme = createTheme(AuthTheme.getTheme());
  } else {
    theme = themeState.darkMode
      ? createTheme(DARK_THEME)
      : createTheme(LIGHT_THEME);
  }

  return { getTheme };
};

export default AppTheme;
