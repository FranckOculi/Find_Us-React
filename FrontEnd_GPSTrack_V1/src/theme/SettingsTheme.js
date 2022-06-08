import {
  Paper,
  Card,
  Box,
  Avatar,
  Button,
  Link,
  Grid,
  Item,
  Typography,
  TextField,
  createTheme,
  ThemeProvider,
  styled,
} from '@mui/material';

class SettingsTheme {
  getTheme() {
    return {
      typography: {
        fontSize: 12,
      },

      inputTextName: {
        display: 'flex',
        marginTop: 5,
        width: 240,
        height: 28,
        padding: 0,
        fontSize: 15,
        marginLeft: 10,
        max: 5,
      },
      inputTextDescription: {
        display: 'flex',
        marginTop: 5,
        width: 240,
        height: 28,
        padding: 0,
        marginLeft: 10,
        fontSize: 15,
      },
      inputLabel: {
        display: 'flex',
        position: 'inherit',
        top: 10,
        left: -11,
        margin: 0,
        padding: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              width: 250,
              marginTop: 0,
            },
          },
        },
        AppBar: {
          palette: {
            primary: { main: '#e8f4fd' },
            secondary: {
              main: '#e8f4fd',
              //   #e3f2fd
            },
          },
        },
      },
    };
  }

  customButton() {
    return (
      <Button type='submit' variant='contained' size='medium' sx={{ mt: 0 }}>
        create
      </Button>
    );
  }

  customButtonDisabled() {
    return (
      <Button
        type='submit'
        variant='contained'
        size='medium'
        sx={{ mt: 0 }}
        disabled
      >
        create
      </Button>
    );
  }

  getDiv() {
    const Div = styled('div')(({ theme }) => ({
      ...theme.typography.string,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
    }));
    return Div;
  }
}
export default new SettingsTheme();

//   #e8f4fd
