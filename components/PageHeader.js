import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AdminMenu from './Menus/Admin';

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
    float: 'left',
    position: 'relative',
    right: theme.spacing(-26),
    top: theme.spacing(0.1),
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    float: 'left',
    position: 'relative',
    right: theme.spacing(-27.5),
    top: theme.spacing(0.1),
  },
  pageTitle: {
    width: theme.spacing(100),
    position: 'relative',
    right: theme.spacing(1),
    top: theme.spacing(0.4)
  },
  adminPageTitle: {
    width: theme.spacing(15),
    position: 'relative',
    right: theme.spacing(1),
    top: theme.spacing(0.4)
  },
  toolbarStyle: {
    minHeight: theme.spacing(1)
  },
  toolbarAdminStyle:{
    minHeight: theme.spacing(5)
  },
  dateRangePicker: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(3)
  }
});

class PageHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false, dateRange: [{ startDate: new Date(), endDate: new Date() }] };
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

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }


  render() {
    const { classes } = this.props;
    let pageHeaderActions;
    console.log('this.props.routerInfo',this.props.routerInfo);
    if (this.props.routerInfo.indexOf('/admin') != -1) {
      pageHeaderActions = <AdminMenu />;
    } else {
      if (this.props.pageHeader == 'Dashboard') {
        pageHeaderActions = <div className={classes.datePickerButtons} >
          <div className={classes.dateRangePicker} ref={node => this.node = node}>
            <DateRangePicker
              open={this.state.open}
              onChange={range => this.setState({ dateRange: [range], open: false })}
            />
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
      } else {
        pageHeaderActions = <div className={classes.buttons}>
          <Button size="small" color="secondary" disableElevation>Create</Button>
          <Button size="small" color="primary" disableElevation>Filter</Button>
          <Button size="small" color="primary" disableElevation>Columns</Button>
        </div>;
      }
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar elevation={1} position="fixed" color="inherit" className={classes.appBar}>
            <Toolbar className={classes.toolbarStyle} variant="dense">
              <div className={classes.pageTitle}>
                <Typography color="primary" variant="subtitle1">{this.props.pageHeader}</Typography>
              </div>
              {pageHeaderActions}
            </Toolbar>
          </AppBar>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar elevation={1} position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar className={classes.toolbarAdminStyle} variant="dense">
          <div className={classes.adminPageTitle}>
                <Typography color="primary" variant="subtitle1">Administration</Typography>
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
  mapStateToProps
)(withStyles(useStyles)(PageHeader));