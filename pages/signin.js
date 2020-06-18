import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import Anonymous from '../theming/layouts/anonymous';
import Alert from '@material-ui/lab/Alert';
import DynamicForm from '../components/Forms/DynamicForm';
import { IMGPath } from '../config';

class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }
  
  render() {
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
          {siteLogo}
          <br />
          <DynamicForm fieldsToRender={fields} onSubmit={onSubmit} buttonCancelText="Cancel" buttonSubmitText="Login" />
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
)(Signin);