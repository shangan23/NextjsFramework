import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import moduleMenu from '../../modules/menu';

import ContactsIcon from '@material-ui/icons/Contacts';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';

import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import BuildIcon from '@material-ui/icons/Build';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '55px',
    paddingLeft: 30,
  },
  menu: {
    minHeight: 0,
    minWidth: 0,
    paddingTop: theme.spacing(1),
    textTransform: 'capitalize',
  },
  activeMenu: {
    color: '#ffffff',
  },
  label: {
    marginTop: theme.spacing(-0.5)
  }
}));

function HorizontalMenu() {
  const router = useRouter();
  const menuList = moduleMenu(null);
  let activeMenu = 1;
  let activeMenuId = 'dashboard';
  const classes = useStyles();

  if (router.query.appId) {
    activeMenu = menuList.findIndex(x => x.id == router.query.appId);
    activeMenuId = router.query.appId;
  }


  const iconMap = (type, menuId) => {
    let iconToUse;
    switch (type) {
      case 'DashboardIcon':
        iconToUse = (menuId == activeMenuId) ?
          <DashboardIcon /> :
          <DashboardOutlinedIcon />
        break;
      case 'RecentActorsIcon':
        iconToUse = (menuId == activeMenuId) ?
          <RecentActorsIcon /> :
          <RecentActorsOutlinedIcon />
        break;
      case 'AppsIcon':
        iconToUse = (menuId == activeMenuId) ?
          <AppsIcon /> :
          <AppsOutlinedIcon />
        break;
      case 'AddShoppingCartIcon':
        iconToUse = (menuId == activeMenuId) ?
          <AddShoppingCartIcon /> :
          <AddShoppingCartOutlinedIcon />
        break;
      case 'ContactsIcon':
        iconToUse = (menuId == activeMenuId) ?
          <ContactsIcon /> :
          <ContactsOutlinedIcon />
        break;
      case 'AssignmentIcon':
        iconToUse = (menuId == activeMenuId) ?
          <AssignmentIcon /> :
          <AssignmentOutlinedIcon />
        break;
      case 'PlaylistAddCheckIcon':
        iconToUse = (menuId == activeMenuId) ?
          <PlaylistAddCheckIcon /> :
          <PlaylistAddCheckOutlinedIcon />
        break;
      case 'ShoppingBasketIcon':
        iconToUse = (menuId == activeMenuId) ?
          <ShoppingBasketIcon /> :
          <ShoppingBasketOutlinedIcon />
        break;
      case 'ShoppingCartIcon':
        iconToUse = (menuId == activeMenuId) ?
          <ShoppingCartIcon /> :
          <ShoppingCartOutlinedIcon />
        break;
      case 'BuildIcon':
        iconToUse = (menuId == activeMenuId) ?
          <BuildIcon /> :
          <BuildOutlinedIcon />
        break;
      case 'AccountCircleIcon':
          iconToUse = (menuId == activeMenuId) ?
          <AccountCircleIcon /> :
          <AccountCircleOutlinedIcon />
        break;
    }
    return iconToUse;
  }

  const handleRedirection = (event, newValue) => {
    let menu = menuList[newValue]
    if (menu.as) {
      Router.push(
        menu.as,
        menu.link
      );
    } else {
      Router.push(
        menu.link
      );
    }
  }

  return (<Tabs
    value={activeMenu}
    variant="standard"
    //textColor="secondary"
    indicatorColor="secondary"
    aria-label="icon label tabs example"
    className={classes.root}
    onChange={handleRedirection}
  >
    {
      menuList.map(
        (menu, index) => {
          const menuLabel = (menu.label) ? menu.label.plural : '';
          const menuIcon = (menu.icon) ?
            (menu.icon.type == "material") ?
              iconMap(menu.icon.name, menu.id) :
              <Icon className={classNames(classes.icon, menu.icon.name)} />
            : '';
          return (
            <Tab
              icon={menuIcon}
              label={<Typography className={classes.label} variant="caption">{menuLabel}</Typography>}
              className={(menu.id == activeMenuId) ? `${classes.activeMenu} , ${classes.menu}` : classes.menu}
              disabled={!!!menu.display}
              style={{display:(!menu.display)?'none':'block'}}
            //wrapped
            />
          )
        }
      )
    }
  </Tabs>);
}

export default HorizontalMenu;