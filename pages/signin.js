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

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Text from '../components/Fields/Text';
import Password from '../components/Fields/Password';
import { Form } from 'react-final-form';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  dailogTitle: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    fontColor: theme.palette.primary.dark,
  },
  dailogMain: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    fontColor: theme.palette.primary.light,
  },
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
      siteLogo = <img src={IMGPath + this.props.siteDetails.logo} alt={this.props.siteDetails.title} height="40" width="125"></img>;
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
      <Grid item xs={6} md={12} key={0}>
        <Text index={0} fieldsToRender={fieldsToRender} />
      </Grid>
      <Grid item xs={6} md={12} key={1}>
        <Password index={1} fieldsToRender={fieldsToRender} />
      </Grid>
    </Grid>);

    const loginDailog = (
      <Dialog
        BackdropProps={{ invisible: true }}
        open
        fullScreen={this.props.fullScreen}>
        <DialogTitle className={classes.dailogTitle}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="h3">DigitalAppX </Typography>
          </Grid>
        </DialogTitle>
        <Form
          onSubmit={onSubmitForm} style={{ marginTop: 16 }}
          initialValues={this.state.submittedValues ? this.state.submittedValues : ''}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <DialogContent className={classes.dailogMain}>
                <DialogContentText className={classes.dailogMain}>
                  <Typography variant="overline"> Hello there, Sign In with your registered Username and Password.
                      </Typography>
                  <Divider />
                </DialogContentText>
                {renderFields}
              </DialogContent>
              <DialogActions className={classes.dailogMain} style={{ padding: 20 }}>
                <Typography variant="overline" style={{ padding: 10 }}>
                  Cannot Signin?  <Button variant="text" color="secondary">
                    Forgot Password
              </Button>
                </Typography>
                <Button disabled={submitting} endIcon={<ArrowForwardSharpIcon />} variant="contained" type="submit" color="primary">
                  Sign In
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