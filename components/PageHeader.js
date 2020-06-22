import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: theme.spacing(8),
    //bottom: 0,
    padding: theme.spacing(1),
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  grow: {
    flexGrow: 0,
  },
}));

export default function PageHeader({pageHeader}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar elevation={1} position="fixed" color="inherit" className={classes.appBar}>
        <Typography variant="subtitle1">{pageHeader}</Typography>
      </AppBar>
    </React.Fragment>
  );
}
