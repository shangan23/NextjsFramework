import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
    float: 'left',
    position: 'relative',
    right: theme.spacing(-32)
  },
  grow: {
    flexGrow: 0,
  },
  pageTitle: {
    width: theme.spacing(100),
    position: 'relative',
    right: theme.spacing(1)
  },
  toolbarStyle: {
    minHeight: theme.spacing(1)
  },
  dateRangePicker: {
    position: 'absolute'
  }
});

class PageHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: true, dateRange: [{ startDate: '', endDate: '' }] };
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.dateRange[0]['startDate'], this.state.dateRange[0]['endDate']);
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar elevation={1} position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar className={classes.toolbarStyle} variant="dense">
            <div className={classes.pageTitle}>
              <Typography variant="subtitle1">{this.props.pageHeader}</Typography>
              <Typography variant="subtitle2" onClick={() => this.setState({ open: true })}>
                <Moment format={this.props.siteDetails.dateFormat}>
                  {this.state.dateRange[0]['startDate']}
                </Moment> - <Moment format={this.props.siteDetails.dateFormat}>
                  {this.state.dateRange[0]['endDate']}
                </Moment> {(this.state.open) ? <ExpandLess /> : <ExpandMore />}
              </Typography>
              <div className={classes.dateRangePicker}>
                <DateRangePicker
                  open={this.state.open}
                  onChange={range => this.setState({ dateRange: [range], open: false })}
                />
              </div>
            </div>
            <div className={classes.buttons}>
              <Button size="small" variant="contained" disableElevation disabled>Cancel</Button>
              <Button size="small" variant="contained" color="primary" startIcon={<SaveIcon />} disableElevation>Save</Button>
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    siteDetails: state.siteSettings.settings,
  };
}

export default connect(
  mapStateToProps
)(withStyles(useStyles)(PageHeader));