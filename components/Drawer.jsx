import { ExpandLessRounded } from '@material-ui/icons';
import {
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from '@material-ui/core';
import Link from 'next/link';

export default function Drawer({ open, setOpen, children }) {
  const clickHandler = () => {
    setOpen(false);
  };
  return (
    <SwipeableDrawer
      anchor={'right'}
      open={open}
      onClose={() => setOpen(false)}
      id="drawer"
      color="inherit"
      onOpen={() => setOpen(true)}
    >
      <Box
        padding="20px"
        margin="15px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <List>
          <ListItem ListItemText variant="text">
            <IconButton
              color="inherit"
              id="close"
              onClick={() => setOpen(false)}
            >
              <ExpandLessRounded />
            </IconButton>
          </ListItem>
          <ListItem ListItemText variant="text">
            <Link href="/">
              <ListItemText>
                <Button
                  color="inherit"
                  fullWidth={true}
                  onClick={clickHandler}
                  variant="text"
                >
                  Nossos serviços
                </Button>
              </ListItemText>
            </Link>
          </ListItem>
          <ListItem ListItemText variant="text">
            <Link href="/about">
              <ListItemText>
                <Button
                  color="inherit"
                  fullWidth={true}
                  onClick={clickHandler}
                  variant="text"
                >
                  Quem somos
                </Button>
              </ListItemText>
            </Link>
          </ListItem>
        </List>

        <Link href="/login">
          <Button variant="outlined" onClick={clickHandler} color="inherit">
            Login
          </Button>
        </Link>
      </Box>
    </SwipeableDrawer>
  );
}
