import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Icon from '@material-ui/core/Icon';
//import Avatar from '@material-ui/core/Avatar'; -> <Avatar className={classes.avatatIcon}>P</Avatar>
import AppsSharpIcon from '@material-ui/icons/AppsSharp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //backgroundColor:'blue',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  countCard: {
    backgroundColor: 'ghostwhite',
    width: theme.spacing(37.86),
    //height: theme.spacing(18),
  },
  count: {
    float: 'left',
    width: theme.spacing(25),
    margin: theme.spacing(7, 0, 0, 2),
  },
  icon: {
    marginTop: theme.spacing(1),
    color: '#1a73e8'
  },
  avatatIcon: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: '#1a73e8'
  }
}));

export default function CountCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.countCard}>
        <div className={classes.count}>
          <Typography variant="h6">105</Typography>
          <Typography variant="overline">Users</Typography>
        </div>
        <div className={classes.icon}>
          <AccountBoxIcon style={{ fontSize: 80 }} />
        </div>
      </Paper>
      <Paper className={classes.countCard}>
        <div className={classes.count}>
          <Typography variant="h6">105</Typography>
          <Typography variant="overline">Spares</Typography>
        </div>
        <div className={classes.icon}>
          <Icon className="fas fa-cogs" style={{ fontSize: 80 }} />
        </div>
      </Paper>
      <Paper className={classes.countCard}>
        <div className={classes.count}>
          <Typography variant="h6">105</Typography>
          <Typography variant="overline">Specifications</Typography>
        </div>
        <div className={classes.icon}>
          <AccountTreeIcon style={{ fontSize: 80 }} />
        </div>
      </Paper>
      <Paper className={classes.countCard}>
        <div className={classes.count}>
          <Typography variant="h6">105</Typography>
          <Typography variant="overline">Products</Typography>
        </div>
        <div className={classes.icon}>
          <AppsSharpIcon style={{ fontSize: 80 }} />
        </div>
      </Paper>
    </div>
  );
}