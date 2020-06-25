import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import Anonymous from '../theming/layouts/anonymous';
import Alert from '@material-ui/lab/Alert';
import DynamicForm from '../components/Forms/DynamicForm';
import { IMGPath } from '../config';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Router from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright({ text }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {text}
    </Typography>
  );
}

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
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
    const fields = [
      {
        name: 'uname',
        label: 'Username',
        options: {
          filter: false,
          sort: false
        },
        type: 'Text',
        required: true,
        id: 'uname',
      },
      {
        name: 'password',
        label: 'Password',
        options: {
          filter: true,
          sort: false
        },
        type: 'Password',
        required: true,
        id: 'password',
      }
    ];

    let alert, siteLogo;

    if (this.props.message) {
      alert = <Alert variant="filled" severity={this.props.messageType}>{this.props.message}</Alert>;
    }

    if (this.props.siteDetails) {
      siteLogo = <img src={IMGPath + this.props.siteDetails.logo} alt={this.props.siteDetails.title} height="40" width="125"></img>;
    }

    return (
      <div>
        {alert}
        <Anonymous title="Sign In">
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                {siteLogo}
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <DynamicForm columns={'single'} fieldsToRender={fields} onSubmit={onSubmit} buttonCancelText="Cancel" buttonSubmitText="Login" />
                <br></br>
                <Grid container alignItems="flex-start">
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {'Don\'t have an account? Sign Up'}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright text={null} />
                </Box>
              </div>
            </Grid>
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