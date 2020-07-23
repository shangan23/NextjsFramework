import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import Anonymous from '../theming/layouts/anonymous';
import Alert from '@material-ui/lab/Alert';
import { IMGPath } from '../config';
import { Typography, Divider } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { TextField } from 'mui-rff';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Form } from 'react-final-form';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:theme.palette.primary.dark,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.9
  },
  dailogTitle: {
    //backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    fontColor: theme.palette.primary.dark,
  },
  dailogMain: {
    //backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    fontColor: theme.palette.primary.dark,
  },
  dailogFields: {
    fontColor: theme.palette.secondary.dark,
  },
  dailogContentText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    color: theme.palette.primary.light,
  },
  helpText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  siteTitle:{
    right: theme.spacing(1),
    position: 'absolute'
  }
});


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = { submittedValues: undefined };
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  componentDidMount() {
    fetch('api/settings')
      .then((res) => res.json())
      .then((data) => {
        this.props.siteSettings(data);
        this.props.notifications(null);
        window.onload = this.handleLoad();
      });

  }

  componentWillUnmount() {
    window.onload = '';
  }

  handleLoad() {
    if (this.props.isAuthenticated) {
      Router.push('/dashboard');
    }
  }

  render() {
    const { classes } = this.props;
    const onSubmit = async values => {
      this.props.authenticate(
        values
      );
    };

    let alert, siteLogo;

    if (this.props.message) {
      alert = <Alert variant="filled" severity={this.props.messageType}>{this.props.message}</Alert>;
    }

    if (this.props.siteDetails) {
      siteLogo = <img src={IMGPath + this.props.siteDetails.logo} alt={this.props.siteDetails.title} height="40" width="220"></img>;
    }

    let fieldsToRender = [
      {
        name: 'uname',
        label: 'Username',
        type: 'Text',
        required: true,
        id: 'uname',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'Password',
        required: true,
        id: 'password',
      },
      {
        name: 'rememberMe',
        label: 'Remember Me',
        type: 'Switch',
        required: false,
        id: 'rememberMe',
        data: [
          { label: '', value: '1' }
        ],
      },
    ];

    const onSubmitForm = (values) => {
      this.setState({ submittedValues: values });
      onSubmit(values);
    };

    const validate = values => {
      const errors = {};
      var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      fieldsToRender.map((data, index) => {
        if (fieldsToRender[index]['type']) {
          let name = (fieldsToRender[index]['name']).toString();
          let label = (fieldsToRender[index]['label']).toString();
          let type = (fieldsToRender[index]['type']).toString();
          let required = (fieldsToRender[index]['required']);
          switch (type) {
            case 'Autocomplete':
              if ((values[name].length == 0) && required)
                errors[name] = label + ' required';
              break;
            case 'Email':
              if ((!values[name]) && required)
                errors[name] = label + ' required';
              else {
                if (!regex.test(values[name]) && values[name])
                  errors[name] = label + ' invalid';
              }
              break;
            default:
              if (!values[name] && required)
                errors[name] = label + ' required';
              break;
          }
        }
      }
      );
      return errors;
    };

    const renderFields = (<Grid container spacing={2} key={`grid-form${Math.random()}`}>
      <Grid item xs={12} md={12} key={0}>
        <TextField
          label={fieldsToRender[0]['label']}
          size="small"
          disabled={fieldsToRender[0]['disabled']}
          id={fieldsToRender[0]['id']}
          name={fieldsToRender[0]['name']}
          required
          variant="filled"
          className={classes.dailogFields}
        />
      </Grid>
      <Grid item xs={12} md={12} key={1}>
        <TextField
          type="password"
          size="small"
          label={fieldsToRender[1]['label']}
          name={fieldsToRender[1]['name']}
          id={fieldsToRender[1]['id']}
          margin="none"
          required
          variant="filled"
          className={classes.dailogFields}
        />
      </Grid>
    </Grid>);

    const loginDailog = (
      <Dialog
        BackdropProps={{ invisible: true }}
        open
        fullScreen={this.props.fullScreen}>
        <DialogTitle className={classes.dailogTitle}>
          <Grid container direction="row" alignItems="center">
            {siteLogo}
            {
            //<Typography className={classes.siteTitle} variant="h5">DigitalAppX </Typography>
            }
          </Grid>
        </DialogTitle>
        <Form
          onSubmit={onSubmitForm} style={{ marginTop: 16 }}
          initialValues={this.state.submittedValues ? this.state.submittedValues : ''}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <DialogContent className={classes.dailogMain}>
                <DialogContentText className={classes.dailogContentText}>
                  <Typography variant="subtitle1"> Hello there! Sign In with your registered Username and Password.
                      </Typography>
                  <Divider />
                </DialogContentText>
                {renderFields}
              </DialogContent>
              <DialogActions className={classes.dailogMain} style={{ padding: 20 }}>
                <div className={classes.helpText}>Cannot Signin? </div>
                <Button variant="text" className={classes.dailogMain} >
                  Forgot Password
              </Button>
                <Button disabled={submitting} size="small" endIcon={<ArrowForwardSharpIcon />} variant="contained" type="submit" color="primary">
                  Continue
              </Button>
              </DialogActions>

            </form>
          )} />
      </Dialog>
    );

    return (
      <div>
        {alert}{loginDailog}
        <Anonymous title="Sign In">
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} className={classes.image} />
          </Grid>
        </Anonymous >
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: (state.authentication.error === null) ? state.authentication.success : state.authentication.error,
    messageType: (state.authentication.error === null) ? 'success' : 'error',
    siteDetails: state.siteSettings.settings,
  };
}
export default connect(
  mapStateToProps,
  actions
)(withStyles(useStyles)(Signin));