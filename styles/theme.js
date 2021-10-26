import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#131921',
    },
    secondary: {
      main: '#ff9900',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    h1: {
      fontWeight: '400',
      fontSize: '1.6 rem',
      margin: '1 rem 0',
    },
    h2: {
      fontWeight: '400',
      fontSize: '1.4 rem',
      margin: '1 rem 0',
    },
  },
});

export default theme;
