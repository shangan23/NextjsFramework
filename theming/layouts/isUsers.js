import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SideMenu from '../../components/SideMenu';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Signin from '../../pages/signin';
import Footer from '../../components/Footer';
import Router from 'next/router';
import { IMGPath } from '../../config';
import AdminMenu from '../../components/AdminMenu';

const drawerWidth = 150;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    backgroundColor: 'blue'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    /*[theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },*/
    backgroundColor: '#ffffff'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1a73e8'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0.9),
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  paperBreadcrumb: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      height: theme.spacing(4),
    },
  },
  paperBreadcrumbCreate: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      height: theme.spacing(4),
    },
    //position: 'fixed',
    width: '100%',
    top: 50,
    flexWrap: 'wrap',
  },
  paperContainer: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  divider: {
    margin: theme.spacing(0.5),
    backgroundColor: '#f7f7f7',
  },
}));

function Layout({ children, title, deauthenticate, container, isAuthenticated, siteDetails }) {

  if (!isAuthenticated) {
    return <Signin />;
  }
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    Router.push('/admin');
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    Router.push('/admin');
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let nameInLetter = isAuthenticated.details.fullName.split(' ');
  nameInLetter = (nameInLetter[1]) ? nameInLetter[0].slice(0, 1) + nameInLetter[1].slice(0, 1) : nameInLetter[0].slice(0, 1);
  const siteLogo = IMGPath + siteDetails.logo;

  let adminMenu;
  if (isAuthenticated.details.isAdmin) {
    adminMenu = <AdminMenu />;
  }


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem dense>
        <div>
          <Typography variant="h6">{isAuthenticated.details.fullName}</Typography>
          <Typography variant="body2">{isAuthenticated.details.role} {(isAuthenticated.details.isAdmin)?'(SA)':''}</Typography>
        </div></MenuItem>
      <MenuItem onClick={deauthenticate}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <Head>
        <title> {siteDetails.title} :: {title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="default"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img src={siteLogo} alt={siteDetails.title} height="40" width="125"></img>
          <div className={classes.grow}>
            {adminMenu}
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="default">
              <AddCircleSharpIcon />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="default">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar>{nameInLetter}</Avatar>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar>{isAuthenticated.details.fullName.slice(0, 1)}</Avatar>
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <nav style={{ backgroundColor: 'red' }} className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <SideMenu display="mobile" />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <SideMenu display="desktop" />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <Footer footerText={siteDetails.footer} />
      </main>
    </div>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

const mapStateToProps = (state) => (
  {
    isAuthenticated: state.authentication.user,
    siteDetails: state.siteSettings.settings
  }
);

export default connect(mapStateToProps, actions)(Layout);
//export default Layout;