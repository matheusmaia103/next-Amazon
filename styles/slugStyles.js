import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const slugStyles = makeStyles((theme) => ({
  title: {
    fontWeight: '600',
    margin: '10px',
    marginBottom: '30px',
  },
  darkCard: {
    backGroundColor: theme.palette.background.paper,
  },
  divider: {
    '& before': {
      borderTop: `solid thin ${theme.palette.divider}`,
    },
    '& after': {
      borderTop: `solid thin ${theme.palette.divider}`,
    },
  },
}));

export default slugStyles;
