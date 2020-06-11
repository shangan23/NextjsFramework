import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
  spacing: {
    display: 'flex',
    '& > *': {
      padding: theme.spacing(1),
    },
  },
  link: {
    margin: theme.spacing(1),
  },
}));

const navigateTo = (url) => {
  console.log(url);
  //Router.push(url);
};

export default function AdminMenu() {
  const classes = useStyles();

  return (
    <Paper className={classes.spacing}>
      <Typography className={classes.root}>
        <Link variant="overline" onClick={navigateTo('/admin')} href="/admin" className={classes.link}>
          General Settings
        </Link>
        <Link variant="overline" onClick={navigateTo('/admin/users')} href="/admin/users" color="inherit" className={classes.link}>
          Users
        </Link>
        <Link variant="overline" onClick={navigateTo('/admin/roles')} href="/admin/roles" className={classes.link}>
          Roles
        </Link>
      </Typography>
    </Paper>
  );
}
