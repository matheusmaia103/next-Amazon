import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  main: {
    minHeight: '80vh',
    maxWidth: '1000px',
    padding: '30px 10px',
  },
  brand: {
    fontWeight: 'bolder',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  boxShadow: {
    boxShadow: 'grey 7px 9px 20px -4px',
  },
  footer: {
    textAlign: 'center',
  },
});

export default useStyles;
