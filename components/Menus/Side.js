import React from 'react';
import { loadCSS } from 'fg-loadcss';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  label: {
    marginLeft: theme.spacing(-3),
    fontSize: '0.70rem'
  },
  icon: {
    fontSize: '1.4em'
  },
  active: {
    color: 'secondary',
  },
  activeText: {
    color: 'secondary',
    fontSize: '0.70rem'
  },
  activeIconText: {
    color: 'secondary',
    fontSize: '1.4em'
  }
}));

const truncate = (str, len) => {
  if (!len)
    len = 7;
  return str.length > 10 ? str.substring(0, len) + '...' : str;
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

  let active, subActive, displayWith = '';
  //let routerActive = (router.pathname).split('/');
  let routerActive = (router.asPath).split('/');

  switch (routerActive.length) {
    case 2:
      active = routerActive[1];
      break;
    case 3:
      active = routerActive[2];
      break;
    case 4:
      active = routerActive[2];
      subActive = routerActive[3];
      break;
  }

  active = router.query.appId;
  //routerActive = router.asPath;

  const [expanded, setExpanded] = React.useState({ clicked: active });

  console.log('subActive', subActive);

  const menuList = [{
    'name': 'Dashboard',
    'link': '/dashboard',
    'icon': <DashboardIcon color={(active == 'dashboard') ? 'secondary' : 'primary'} className={(active == 'dashboard') ? classes.active : ''} />,
    'id': 'dashboard',
    'menus': [],
    'type': null
  }, {
    'name': 'Customers',
    'link': '/app/customers',
    'icon': <Icon color={(active == 'customers') ? 'secondary' : 'primary'} className={(active == 'customers') ? `${classes.activeIconText} fa fa-address-card icon` : `${classes.icon} fa fa-address-card`} />,
    'id': 'customers',
    'menus': [],
    'type': '/app/[appId]'
  }, {
    'name': 'Vendors',
    'link': '/app/vendors',
    'icon': <RecentActorsIcon color={(active == 'vendors') ? 'secondary' : 'primary'} className={(active == 'vendors') ? classes.active : ''} />,
    'id': 'vendors',
    'menus': [],
    'type': '/app/[appId]'
  },{
    'name': 'Items',
    'link': '/app/items',
    'icon': <AppsIcon color={(active == 'items') ? 'secondary' : 'primary'} className={(active == 'items') ? classes.active : ''} />,
    'id': 'items',
    'menus': [],
    'type': '/app/[appId]'
  }, {
    'name': 'Stock Adjustments',
    'link': '/app/inventory/stocks',
    'icon': <Icon color={(active == 'inventory') ? 'secondary' : 'primary'} className={(active == 'inventory') ? `icon fa fa-pallet ${classes.activeIconText}` : `${classes.icon} fa fa-pallet`} />,
    'id': 'inventory',
    'menus': []
  }, {
    'name': 'Orders',
    'link': '/app/orders',
    'icon': <AddShoppingCartIcon color={(active == 'orders') ? 'secondary' : 'primary'} />,
    'id': 'orders',
    'menus': [],
    'type': '/app/[appId]'
  }];

  if (display === 'desktop') {
    displayWith = <div className={classes.toolbar}>test</div>;
  } else {
    displayWith = '';
  }

  const handleRedirection = (obj, e) => {
    e.preventDefault();
    let link;

    if (obj['menus'] && obj['menus'].length > 0) {
      if (expanded.clicked === obj['id']) {
        setExpanded({ clicked: null });
      } else {
        setExpanded({ clicked: obj['id'] });
      }
    }

    if (obj['link'] || obj['menus']['link']) {
      link = (obj['link'] ? obj['link'] : obj['menus']['link']).toString();
      if (obj['type'] != null) {
        Router.push(
          obj['type'],
          link
        );
      } else {
        router.push(link);
      }
    }
  };
  //autoFocus={(active === menuList[index]['id']) ? true : false}
  return (
    <div>
      {displayWith}
      <Divider />
      <List dense component="nav" >
        {menuList.map((text, index) => (
          <React.Fragment key={Math.random()}>
            <ListItem onClick={(event) => handleRedirection(menuList[index], event)} button dense key={index} >
              <ListItemIcon >
                {menuList[index]['icon']}
              </ListItemIcon>
              <Tooltip title={<Typography variant="overline">{menuList[index]['name']}</Typography>} arrow placement="right-start">
                <ListItemText primary={<Typography
                  className={(active == menuList[index]['id']) ? `${classes.activeText} ${classes.label}` : classes.label}
                  color={(active == menuList[index]['id']) ? 'secondary' : 'primary'}
                  variant="overline">{truncate(menuList[index]['name'])}</Typography>} />
              </Tooltip>
              {(menuList[index]['menus'].length > 0) ? (expanded.clicked === menuList[index]['id']) ? <ExpandLess /> : <ExpandMore /> : ''}
            </ListItem>
            {menuList[index]['menus'].map((text, subindex) => (
              <Collapse key={Math.random()} in={(expanded.clicked === menuList[index]['id']) ? true : false} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem onClick={(event) => handleRedirection(menuList[index]['menus'][subindex], event)} dense button className={classes.nested}>
                    <ListItemIcon> {menuList[index]['menus'][subindex]['icon']}</ListItemIcon>
                    <Tooltip title={<Typography variant="overline">{menuList[index]['name']} - {menuList[index]['menus'][subindex]['name']}</Typography>} arrow placement="right-start">
                      <ListItemText
                        primary={<Typography
                          className={(subActive == menuList[index]['menus'][subindex]['id']) ? `${classes.active} ${classes.label}` : classes.label}
                          color={(subActive == menuList[index]['menus'][subindex]['id']) ? 'secondary' : 'primary'}
                          variant="overline">
                          {truncate(menuList[index]['menus'][subindex]['name'], 13)}
                        </Typography>} />
                    </Tooltip>
                  </ListItem>
                </List>
              </Collapse>
            ))}
          </React.Fragment>
        ))}
      </List>
    </div >);
}

export default SideMenu;