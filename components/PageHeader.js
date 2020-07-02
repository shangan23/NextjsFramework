import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
//import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AdminMenu from './Menus/Admin';
import Router from 'next/router';
import Badge from '@material-ui/core/Badge';
//import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import actions from '../redux/actions';
import Drawer from '@material-ui/core/Drawer';
import FilterForm from '../components/Forms/FilterForm';

const drawerWidth = 170;

const useStyles = theme => ({
  appBar: {
    top: theme.spacing(8),
    //bottom: 0,
    //padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    marginLeft: drawerWidth,
  },
  datePickerButtons: {
    '& > *': {
      //margin: theme.spacing(0.3),
    },
    float: 'right',
    // position: 'relative',
    // right: theme.spacing(-26),
    // top: theme.spacing(0.1),
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    //float: 'left',
    //position: 'relative',
    //right: theme.spacing(-20.5),
    top: theme.spacing(0.1),
  },
  pageTitle: {
    //width: theme.spacing(100),
    float: 'left',
    //position: 'relative',
    //right: theme.spacing(1),
    marginLeft: theme.spacing(1),
    top: theme.spacing(0.4)
  },
  grow: {
    flexGrow: 1,
  },
  pageActions: {
    float: 'right',
  },
  adminPageTitle: {
    width: theme.spacing(15),
    position: 'relative',
    float: 'left',
    right: theme.spacing(1),
    top: theme.spacing(0.4),
    marginLeft: theme.spacing(3),
  },
  toolbarStyle: {
    minHeight: theme.spacing(1)
  },
  toolbarAdminStyle: {
    minHeight: theme.spacing(5)
  },
  dateRangePicker: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(3)
  },
  infoBox: {
    float: 'left',
    padding: '10px'
  },
  wrapIcon: {
    verticalAlign: 'bottom',
    display: 'inline-flex'
  },
  toolbar: {
    //maxHeight: theme.spacing(80),
    top: theme.mixins.toolbar.minHeight + 10,
    width: 300,
  }
});

const frameURL = async (req) => {
  let host, urlObj, module;
  host = absoluteUrl(req, req.headers.host);
  urlObj = new URL(`${host.origin}${req.url}`);
  let { pathname } = urlObj;
  console.log('isServer PH pathname', pathname);
  //module = pathname.replace('/app/', '');
  //return { module }
};

class PageHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { filterOpen: false, dialogOpen: false, open: false, dateRange: [{ startDate: new Date(), endDate: new Date() }] };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleClick() {
    if (!this.state.open) {
      this.setState({ open: true })
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      this.setState({ open: false })
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  static async getInitialProps(ctx) {
    await initialize(ctx);
    const { req } = ctx;
    if (!req) {
      let module = ctx.query.appId;
      console.log('isClient PH pathname', pathname);
      //return { module: module };
    } else {
      const { module } = await frameURL(req);
      //return { module };
    }
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }


  render() {
    const { classes } = this.props;

    const handleCancelAction = () => {
      this.setState({ dialogOpen: false });
    };

    const handleFilterClose = () => {
      this.setState({ filterOpen: false });
    }

    const handleConfirmAction = () => {
      const objectId = this.props.routerInfo.query.objId;
      fetch(`${this.props.siteDetails.siteURL}api/app/${this.props.routerInfo.query.appId}/${objectId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ dialogOpen: false });
          this.props.notifications(data);
          Router.push(
            '/app/[appId]',
            `/app/${this.props.routerInfo.query.appId}`
          );
        });
    };

    let displayWith, display = "desktop";
    if (display === 'desktop') {
      displayWith = <div></div>;
    } else {
      displayWith = false;
    }


    const confirmDeleteDialog = (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={this.state.dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" color="primary">{'Are you sure you want to delete?'}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              Confirming this action will delete the record permanently.
              <Typography color="secondary" variant="body2" className={classes.wrapIcon}>
                Warning: This action cannot be undone!
                </Typography>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleCancelAction} color="secondary">
            Cancel
      </Button>
          <Button id="cancel" onClick={handleConfirmAction} color="primary" autoFocus>
            Confirm
      </Button>
        </DialogActions>
      </Dialog>
    );

    const filterDrawer =
      <Drawer
        onEscapeKeyDown={handleFilterClose}
        onBackdropClick={handleFilterClose}
        BackdropProps={{ invisible: true }}
        variant={"temporary"}
        anchor={'right'}
        docked={false}
        classes={{ paper: classes.toolbar }}
        open={this.state.filterOpen} >
        <div>
          <FilterForm
            module={this.props.routerInfo.query.appId}
            action="edit"
            defaultValue={{}}
            //onSubmit={onSubmit}
            buttonCancelText="Clear"
            onCancel={handleFilterClose}
            buttonSubmitText="Filter"
          />
        </div>
      </Drawer>


    let pageHeaderActions, pageTitle;
    console.log('this.props.routerInfo', this.props.routerInfo);
    console.log('${this.props.routerInfo.query.appId}', this.props.routerInfo.query.appId)
    if (this.props.routerInfo.pathname.indexOf('/admin') != -1) {
      pageHeaderActions = <AdminMenu />;
    } else {

      if (this.props.routerInfo.pathname.indexOf('/dashboard') != -1) {
        pageTitle = 'Dashboard'
        pageHeaderActions = <div className={classes.datePickerButtons} >
          <div className={classes.dateRangePicker} ref={node => this.node = node}>
            {/*<DateRangePicker
              open={this.state.open}
              onChange={range => this.setState({ dateRange: [range], open: false })}
            />*/}
          </div>
          <Button size="small" variant="text" disableElevation>
            <Typography variant="overline" ref={node => this.node = node} onClick={() => this.handleClick()}>
              From: <Moment format={this.props.siteDetails.dateFormat}>
                {this.state.dateRange[0]['startDate']}
              </Moment>  | To: <Moment format={this.props.siteDetails.dateFormat}>
                {this.state.dateRange[0]['endDate']}
              </Moment>
            </Typography>
          </Button>
        </div>;
      } else if (this.props.routerInfo.pathname.indexOf('/app/') != -1) {
        pageTitle = this.props.routerInfo.query.appId;
        pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)

        let toList = <Button
          variant="text"
          color="secondary"
          size="small"
          onClick={() => Router.push(
            '/app/[appId]',
            `/app/${this.props.routerInfo.query.appId}`
          )}
          startIcon={<ViewListOutlinedIcon />}>List</Button>;

        let goBack = <Button size="small" color="primary" variant="text" onClick={() => Router.back()} startIcon={<ArrowBackOutlinedIcon />}>Back</Button>

        let deleteButton = <Button
          size="small"
          variant="text"
          startIcon={<DeleteOutlinedIcon />}
          onClick={() => this.setState({ dialogOpen: true })}
          color="primary" disableElevation>Delete</Button>;

        switch (this.props.routerInfo.route) {
          case '/app/[appId]/[objId]':
          case '/app/[appId]/[objId]/[subAppId]':
            pageHeaderActions = <div className={classes.buttons}>
              {goBack}
              {toList}
              <Button size="small" color="primary" variant="text" onClick={() => Router.push(
                '/app/[appId]/[objId]/edit',
                `/app/${this.props.routerInfo.query.appId}/${this.props.routerInfo.query.objId}/edit`
              )} startIcon={<EditOutlinedIcon />} disableElevation>Edit</Button>
              {deleteButton}
            </div>;
            break;
          case '/app/[appId]':
            pageHeaderActions = <div className={classes.buttons}>
              {goBack}
              <Button size="small" onClick={() => Router.push(
                '/app/[appId]/create',
                `/app/${this.props.routerInfo.query.appId}/create`
              )} color="secondary" variant="text" startIcon={<AddBoxOutlinedIcon />} disableElevation>Create</Button>

              <Button size="small" color={this.props.routerInfo.query.filter ? 'secondary' : 'primary'} onClick={() => this.setState({ filterOpen: true })} variant="text" startIcon={<FilterListOutlinedIcon />} disableElevation>
                <Badge variant={this.props.routerInfo.query.filter ? 'dot' : 'standard'} color="secondary">
                  Filter List
                </Badge>
              </Button>
              {
                /* <Button size="small" variant="text" startIcon={<ViewColumnIcon />} color="primary" disableElevation>Columns</Button> */
              }
            </div>;
            break;
          case '/app/[appId]/create':
            pageHeaderActions = <div className={classes.buttons}>
              {goBack}
              {toList}
            </div>;
            break;
          case '/app/[appId]/[objId]/edit':
            pageHeaderActions = <div className={classes.buttons}>
              {goBack}
              {toList}
              <Button size="small" variant="text" startIcon={<VisibilityOutlinedIcon />} color="primary" onClick={() => Router.push(
                '/app/[appId]/[objId]',
                `/app/${this.props.routerInfo.query.appId}/${this.props.routerInfo.query.objId}`
              )}
                disableElevation>View</Button>
              {deleteButton}
            </div>;
            break;
        }
      }
      return (
        <React.Fragment>
          <CssBaseline />
          {confirmDeleteDialog}
          {filterDrawer}
          <AppBar elevation={1} position="fixed" color="inherit" className={classes.appBar}>
            <Toolbar disableGutters className={classes.toolbarStyle} variant="dense">
              <div className={classes.pageTitle}>
                <Typography color="primary" variant="subtitle1">{pageTitle}</Typography>
              </div>
              <div className={classes.grow}>
              </div>
              <div className={classes.pageActions}>
                {pageHeaderActions}
              </div>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      );

    }

    return (
      <React.Fragment>
        <CssBaseline />
        {confirmDeleteDialog}
        <AppBar elevation={1} position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar disableGutters className={classes.toolbarAdminStyle} variant="dense">
            <div className={classes.adminPageTitle}>
              <Typography color="primary" variant="subtitle1">Administration</Typography>
            </div>
            <div className={classes.grow}>
            </div>
            {pageHeaderActions}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );


  }
}

function mapStateToProps(state) {
  return {
    siteDetails: state.siteSettings.settings,
    isAuthenticated: state.authentication.user,
  };
}

export default connect(
  mapStateToProps, actions
)(withStyles(useStyles)(PageHeader));