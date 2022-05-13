class AuthTheme {
  getTheme() {
    return {
      typography: {
        fontSize: 12,
      },

      inputTextEmail: {
        display: 'flex',
        marginTop: 5,
        width: 240,
        height: 28,
        padding: 0,
        fontSize: 15,
        marginLeft: 10,
        max: 5,
      },
      inputTextPassword: {
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
      },
    };
  }
}
export default new AuthTheme();
