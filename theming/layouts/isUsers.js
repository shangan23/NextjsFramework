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
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SideMenu from '../../components/Menus/Side';
import { connect, useDispatch } from 'react-redux';
import actions from '../../redux/actions';
import Signin from '../../pages/signin';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { IMGPath } from '../../config';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { NOTIFICATIONS_CLOSE } from '../../redux/types';
import PageLoader from '../../components/PageLoader';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Link from 'next/link';
import initialize from '../../utils/initialize';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const drawerWidth = 170;

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
    top: 2
    //height: theme.spacing(2)
    /*[theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },*/
    //backgroundColor: '#e60000'
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
    //backgroundColor: '#e60000'
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(1),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5)
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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
    //backgroundColor: '#f7f7f7',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

function Layout({ children, title, deauthenticate, container, isAuthenticated, siteDetails, isNotified }) {

  if (!isAuthenticated) {
    return <Signin />;
  }

  const dispatch = useDispatch();
  const routerInfo = useRouter()
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleSnackClose = () => {
    //setOpenSnack(false);
    dispatch({ type: NOTIFICATIONS_CLOSE, payload: null });
  };

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
  //const siteLogo = IMGPath + siteDetails.logo;

  let adminMenu;
  if (isAuthenticated.details.isAdmin) {
    adminMenu = <MenuItem><Link href="/admin/">Administration</Link></MenuItem>;
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem dense>
        <div>
          <Typography variant="h6">{isAuthenticated.details.fullName}</Typography>
          <Typography variant="body2">{isAuthenticated.details.role} {(isAuthenticated.details.isAdmin) ? '(SA)' : ''}</Typography>
        </div></MenuItem>
      {adminMenu}
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

  //<img src={siteLogo} alt={siteDetails.title} height="40" width="125"></img>
  return (
    <div className={classes.root}>
      <Head>
        <title> {siteDetails.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CssBaseline />
      <PageLoader />
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
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
          <Typography variant="h5">{siteDetails.title}</Typography>
          <div className={classes.grow}>
          </div>
          {/*<div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>*/}
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="default">
              <AddCircleSharpIcon />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="default">
              <Badge badgeContent={17} color="secondary" >
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
              <Avatar className={classes.orange}>{nameInLetter}</Avatar>
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
      <nav elevation={0} className={classes.drawer}>
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
            <SideMenu key={Math.random()} display="desktop" />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <PageHeader pageHeader={title} routerInfo={routerInfo} />
        <div className={classes.toolbar} />
        {children}
        <Snackbar
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isNotified ? true : false}
          onClose={handleSnackClose}
        >
          <Alert severity={isNotified ? isNotified.type : 'info'}>
            <AlertTitle><Typography variant="overline">{isNotified ? isNotified.type : 'info'}</Typography></AlertTitle>
            <Typography variant="body2">{isNotified ? isNotified.message : 'test'}</Typography>
          </Alert>
        </Snackbar>
      </main>
      <Footer footerText={siteDetails.footer} />
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
    siteDetails: state.siteSettings.settings,
    isNotified: state.notifications.message,
  }
);

Layout.getInitialProps = async (ctx) => {
  await initialize(ctx);
};

export default connect(mapStateToProps, actions)(Layout);
//export default Layout;