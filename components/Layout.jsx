import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Link,
  IconButton,
  Paper,
  Switch,
  createTheme,
  ThemeProvider,
  Badge
} from '@material-ui/core';
import useStyles from '../styles/styles';
import NextLink from 'next/link';
import { PersonRounded, ShoppingCartRounded } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import NProgressStyles from '../styles/nprogressStyle';
import { Store, Provider, Consumer } from '../utils/Store';
import { CssBaseline } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';

export default function Layout({ children }) {
  const classes = useStyles();

  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;
  const { cartItems } = cart;
  console.log(cart);
  
  const darkModeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#131921',
      },
      secondary: {
        main: '#ff9900',
      },
      error: {
        main: red.A400,
      },
      divider: 'rgba(48 47 47 / 69%)',
      background: {
        default: darkMode ? '#2e2d2d' : '#cac7c7',
        paper: darkMode ? '#121212' : '#fff',
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
    root: {
      button: {
        textTransform: 'none',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <NProgressStyles />
        <AppBar className={classes.navbar} color="primary" position="static">
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Amazon </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={darkModeHandler} />
              <NextLink href="/cart" passHref>
                <IconButton color="secondary" title="cart">
                  {cartItems.length > 0 ? (
                    <Badge
                      color="success"
                      badgeContent={cart.cartItems.length}
                    >
                      <ShoppingCartRounded color="secondary" />
                    </Badge>
                  ) : (
                    <ShoppingCartRounded color="secondary" />
                  )}
                </IconButton>
              </NextLink>
              <NextLink href="/login" passHref>
                <IconButton title="login">
                  <PersonRounded color="secondary" />
                </IconButton>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container
          style={{ minHeight: '100vh' }}
          className={classes.main}
          component="main"
        >
          {children}
        </Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Amazon</Typography>
        </footer>
      </Paper>
    </ThemeProvider>
  );
}
