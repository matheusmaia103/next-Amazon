import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Link,
  IconButton,
} from '@material-ui/core';
import useStyles from '../styles/styles';
import NextLink from 'next/link';
import { PersonRounded, ShoppingCartRounded } from '@material-ui/icons';
import NProgressStyles from '../styles/nprogressStyle';

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <>
    <NProgressStyles />
      <AppBar className={classes.navbar} color="primary" position="static">
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>Amazon</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart" passHref>
              <IconButton color='secondary'>
                <ShoppingCartRounded color='secondary'/>
              </IconButton>
            </NextLink>
            <NextLink href="/login" passHref>
              <IconButton>
              <PersonRounded color='secondary' />
              </IconButton>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved. Amazon</Typography>
      </footer>
    </>
  );
}
