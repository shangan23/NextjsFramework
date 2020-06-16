import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    padding: theme.spacing(0.5),
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function BottomAppBar({footerText}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Typography variant="overline" align="center">{footerText}</Typography>
      </AppBar>
    </React.Fragment>
  );
}
