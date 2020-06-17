import React from 'react';
import { loadCSS } from 'fg-loadcss';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import Button from '@material-ui/core/Button';
//import AppButton from './Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import ContactPhoneSharpIcon from '@material-ui/icons/ContactPhoneSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import SecuritySharpIcon from '@material-ui/icons/SecuritySharp';
import AppsSharpIcon from '@material-ui/icons/AppsSharp';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  label: {
    marginLeft: theme.spacing(-3)
  },
  active: {
    color: 'white'
  },
}));

const truncate = (str) => {
  return str.length > 10 ? str.substring(0, 7) + '...' : str;
};

function SideMenu({ display }) {
  const router = useRouter();
  const classes = useStyles();

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  let active, displayWith = '';

  switch (router.pathname) {
  case '/dashboard':
    active = 'dashboard';
    break;
  case '/marketting':
    active = 'marketting';
    break;
  case '/app/customers':
    active = 'customers';
    break;
  }

  const menuList = [{
    'name': 'Dashboard',
    'link': '/dashboard',
    'icon': <DashboardIcon className={(active == 'dashboard') ? classes.active : ''} />,
    'id': 'dashboard'
  }, {
    'name': 'Customers',
    'link': '/app/customers',
    'icon': <AccountBoxSharpIcon className={(active == 'customers') ? classes.active : ''} />,
    'id': 'customers'
  }, {
    'name': 'Products',
    'link': '/module/list',
    'icon': <AppsSharpIcon className={(active == 'sales') ? classes.active : ''} />,
    'id': 'sales'
  }, {
    'name': 'Servivce',
    'link': '/marketting',
    'icon': <ContactPhoneSharpIcon className={(active == 'marketting') ? classes.active : ''} />,
    'id': 'marketting'
  }, {
    'name': 'Annual Maintenance Contract',
    'link': '/marketting',
    'icon': <ListAltSharpIcon className={(active == 'marketting') ? classes.active : ''} />,
    'id': 'marketting'
  }, {
    'name': 'Gaurentee',
    'link': '/marketting',
    'icon': <SecuritySharpIcon className={(active == 'marketting') ? classes.active : ''} />,
    'id': 'marketting'
  },];

  if (display === 'desktop') {
    displayWith = <div className={classes.toolbar}>test</div>;
  } else {
    displayWith = '';
  }

  const handleRedirection = (url) =>{
    //console.log(url);
    router.push(url);
  };

  return (
    <div>
      {displayWith}
      <Divider />
      <List dense component="nav">
        {menuList.map((text, index) => (
          <ListItem onClick={(event) => handleRedirection(menuList[index]['link'], event)} button key={index} autoFocus={(active == menuList[index]['id']) ? true : false}>
            <ListItemIcon >
              {menuList[index]['icon']}
            </ListItemIcon>
            <Tooltip title={<Typography variant="overline">{menuList[index]['name']}</Typography>} arrow placement="right-start">
              <ListItemText primary={<Typography className={(active == menuList[index]['id']) ?`${classes.active} ${classes.label}`:classes.label} variant="overline">{truncate(menuList[index]['name'])}</Typography>} />
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </div >);
}

export default SideMenu;