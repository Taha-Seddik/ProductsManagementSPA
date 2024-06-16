import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Inter Variable', 'sans-serif'].join(','),
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 35,
        },
      },
    },
  },
});

export default darkTheme;
