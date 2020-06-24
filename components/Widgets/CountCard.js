import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Icon from '@material-ui/core/Icon';
//import Avatar from '@material-ui/core/Avatar'; -> <Avatar className={classes.avatatIcon}>P</Avatar>
import AppsSharpIcon from '@material-ui/icons/AppsSharp';

const useStyles = makeStyles((theme) => ({
  countCard: {
    height: theme.spacing(8),
  },
  count: {
    float: 'left',
     paddingLeft:theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(10),
    },
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing(34),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(30),
    },
  },
  icon: {
    //marginTop: theme.spacing(1),
  },
  avatatIcon: {
    // width: theme.spacing(7),
    //height: theme.spacing(7),
    //backgroundColor: '#1a73e8'
  }
}));

export default function CountCard({ type }) {
  const classes = useStyles();

  let paperCount;

  switch (type) {
    case 'users':
      paperCount = <Paper className={classes.countCard} elevation={0} variant="outlined">
        <div className={classes.count}>
          <Typography color="secondary"  variant="h6">105</Typography>
          <Typography color="primary" variant="overline">Users</Typography>
        </div>
        <div className={classes.icon}>
          <AccountBoxIcon color="primary" style={{ fontSize: 50 }} />
        </div>
      </Paper>;
      break;
    case 'spares':
      paperCount = <Paper className={classes.countCard} elevation={0} variant="outlined">
        <div className={classes.count}>
          <Typography color="secondary"  variant="h6">105</Typography>
          <Typography color="primary" variant="overline">Spares</Typography>
        </div>
        <div className={classes.icon}>
          <Icon color="primary" className="fas fa-cogs" style={{ fontSize: 50 }} />
        </div>
      </Paper>;
      break;
    case 'products':
      paperCount = <Paper className={classes.countCard} elevation={0} variant="outlined">
        <div className={classes.count}>
          <Typography color="secondary"  variant="h6">105</Typography>
          <Typography color="primary" variant="overline">Products</Typography>
        </div>
        <div className={classes.icon}>
          <AppsSharpIcon color="primary" style={{ fontSize: 50 }} />
        </div>
      </Paper>;
      break;
    case 'specifications':
      paperCount = <Paper className={classes.countCard} elevation={0} variant="outlined">
        <div className={classes.count}>
          <Typography color="secondary" variant="h6">105</Typography>
          <Typography color="primary" variant="overline">Specifications</Typography>
        </div>
        <div className={classes.icon}>
          <AccountTreeIcon color="primary" style={{ fontSize: 50 }} />
        </div>
      </Paper>;
      break;
  }

  return (
    <React.Fragment>
      {paperCount}
    </React.Fragment>
  );
}