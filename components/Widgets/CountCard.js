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
    height: theme.spacing(18),
  },
  count: {
    float: 'left',
    width: theme.spacing(25),
    margin: theme.spacing(7, 0, 0, 2),
  },
  icon: {
    marginTop: theme.spacing(1),
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
      paperCount = <Paper className={classes.countCard}>
        <div className={classes.count}>
          <Typography variant="h6">105</Typography>
          <Typography color="primary" variant="overline">Users</Typography>
        </div>
        <div className={classes.icon}>
          <AccountBoxIcon color="secondary" style={{ fontSize: 80 }} />
        </div>
      </Paper>;
      break;
    case 'spares':
      paperCount = <Paper className={classes.countCard}>
        <div className={classes.count}>
          <Typography variant="h6">105</Typography>
          <Typography color="primary" variant="overline">Spares</Typography>
        </div>
        <div className={classes.icon}>
          <Icon color="secondary" className="fas fa-cogs" style={{ fontSize: 80 }} />
        </div>
      </Paper>;
      break;
    case 'products':
      paperCount = <Paper className={classes.countCard}>
        <div className={classes.count}>
          <Typography variant="h6">105</Typography>
          <Typography color="primary" variant="overline">Products</Typography>
        </div>
        <div className={classes.icon}>
          <AppsSharpIcon color="secondary" style={{ fontSize: 80 }} />
        </div>
      </Paper>;
      break;
    case 'specifications':
      paperCount = <Paper className={classes.countCard}>
        <div className={classes.count}>
          <Typography variant="h6">105</Typography>
          <Typography color="primary" variant="overline">Specifications</Typography>
        </div>
        <div className={classes.icon}>
          <AccountTreeIcon color="secondary" style={{ fontSize: 80 }} />
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