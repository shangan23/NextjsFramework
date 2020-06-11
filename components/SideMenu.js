import React from 'react';
import { loadCSS } from 'fg-loadcss';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import ContactPhoneSharpIcon from '@material-ui/icons/ContactPhoneSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import SecuritySharpIcon from '@material-ui/icons/SecuritySharp';
import AppsSharpIcon from '@material-ui/icons/AppsSharp';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  label: {
    // Aligns the content of the button vertically.
    flexDirection: 'column',
    textAlign: 'center'
  },
  icon: {
    fontSize: '30px !important',
    marginBottom: theme.spacing(0.5)
  },
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
    'name': 'Customers',
    'link': '/module/list',
    'icon': <AccountBoxSharpIcon className={classes.icon} />,
    'id': 'leads' 
  }, {
    'name': 'Products',
    'link': '/module/list',
    'icon': <AppsSharpIcon className={classes.icon} />,
    'id': 'sales'
  }, {
    'name': 'Servivce Calls',
    'link': '/marketting',
    'icon': <ContactPhoneSharpIcon   className={classes.icon} />,
    'id': 'marketting'
  },{
    'name': 'Annual Maintenance Contract',
    'link': '/marketting',
    'icon': <ListAltSharpIcon className={classes.icon} />,
    'id': 'marketting'
  },{
    'name': 'Gaurentee Services',
    'link': '/marketting',
    'icon': <SecuritySharpIcon className={classes.icon} />,
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
      <List dense >
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