import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import DehazeIcon from '@material-ui/icons/Dehaze';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  label: {
    // Aligns the content of the button vertically.
    flexDirection: 'column',
  },
  icon: {
    fontSize: '30px !important',
    marginBottom: theme.spacing(0.5)
  }
}));

function SideMenu() {
  const router = useRouter();
  const classes = useStyles();
  let active = '';
  const menuList = [{
    'name': 'Dashboard',
    'link': '/dashboard',
    'icon': <DashboardIcon className={classes.icon} />,
    'id': 'dashboard'
  }, {
    'name': 'Sales',
    'link': '/sales',
    'icon': <BusinessIcon className={classes.icon} />,
    'id': 'sales'
  }, {
    'name': 'Marketting',
    'link': '/marketting',
    'icon': <DehazeIcon className={classes.icon} />,
    'id': 'marketting'
  },];

  switch (router.pathname) {
  case '/dashboard':
    active = 'dashboard';
    break;
  case '/marketting':
    active = 'marketting';
    break;
  case '/sales':
    active = 'sales';
    break;
  }

  return (
    <div>
      <div className={classes.toolbar}>test</div>
      <Divider />
      <List dense>
        {menuList.map((text, index) => (
          <ListItem key={index}>
            <Button
              /* Use classes property listto inject custom styles */
              classes={{ root: classes.button, label: classes.label }}
              color={(active == menuList[index]['id']) ? 'secondary' : ''}
              size="large"
              fullWidth="true"
              href={menuList[index]['link']}
            > {menuList[index]['icon']}
              <Typography variant="caption" display="block" gutterBottom>
                {menuList[index]['name']}
              </Typography>
            </Button>
          </ListItem>
        ))}
      </List>
    </div >);
}

export default SideMenu;