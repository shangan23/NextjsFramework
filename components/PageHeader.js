import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: theme.spacing(8),
    //bottom: 0,
    //padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    marginLeft: drawerWidth,
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
    float:'left',
    position:'relative',
    right:theme.spacing(-32)
  },
  grow: {
    flexGrow: 0,
  },
  pageTitle:{
    width:theme.spacing(100),
    position:'relative',
    right:theme.spacing(1)
  },
  toolbarStyle:{
    minHeight:theme.spacing(1)
  }
}));

export default function PageHeader({ pageHeader }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar elevation={1} position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar className={classes.toolbarStyle} variant="dense">
          <div className={classes.pageTitle}>
          <Typography variant="subtitle1">{pageHeader}</Typography>
          </div>
          <div className={classes.buttons}>
            <Button size="small" variant="contained" disableElevation disabled>Cancel</Button>
            <Button size="small" variant="contained" color="primary" startIcon={<SaveIcon />} disableElevation>Save</Button>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
