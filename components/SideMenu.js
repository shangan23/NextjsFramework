import React from 'react';
import { loadCSS } from 'fg-loadcss';
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
import Icon from '@material-ui/core/Icon';

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

function SideMenu({display}) {
  const router = useRouter();
  const classes = useStyles();

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  let active,displayWith = '';
  const menuList = [{
    'name': 'Dashboard',
    'link': '/dashboard',
    'icon': <DashboardIcon className={classes.icon} />,
    'id': 'dashboard'
  }, {
    'name': 'Leads',
    'link': '/module/list',
    'icon': <Icon className="fa fa-funnel-dollar" fontSize="small" />,
    'id': 'leads'
  }, {
    'name': 'Sales',
    'link': '/module/list',
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
  case '/module/list':
  case '/module/create':
    active = 'leads';
    break;
  }

  if (display === 'desktop') {
    displayWith = <div className={classes.toolbar}>test</div>;
  } else {
    displayWith = '';
  }

  return (
    <div>
      {displayWith}
      <Divider />
      <List dense>
        {menuList.map((text, index) => (
          <ListItem key={index}>
            <Button
              /* Use classes property listto inject custom styles */
              classes={{ root: classes.button, label: classes.label }}
              color={(active == menuList[index]['id']) ? 'primary' : 'default'}
              size="large"
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