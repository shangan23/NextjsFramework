import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import Anonymous from '../theming/layouts/anonymous';
import Alert from '@material-ui/lab/Alert';
import TwoColumn from '../components/Forms/TwoColumn';


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
    const fieldsToRender = [
      {
        'type': 'Text',
        'required': true,
        'id': 'uname',
        'label': 'User Name',
        'name': 'uname'
      },
      {
        'type': 'Password',
        'required': true,
        'id': 'password',
        'name': 'password',
        'label': 'Password'
      }
    ];

    let alert;

    if (this.props.message) {
      alert = <Alert variant="filled" severity={this.props.messageType}>{this.props.message}</Alert>;
    }

    return (
      <div>
        {alert}
        <Anonymous title="Sign In">
          <br></br>
          <TwoColumn fieldsToRender={fieldsToRender} onSubmit={onSubmit} buttonCancelText="Cancel" buttonSubmitText="Login"/>
        </Anonymous >
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: (state.authentication.error === null) ? state.authentication.success : state.authentication.error,
    messageType: (state.authentication.error === null) ? 'success' : 'error',
  };
}
export default connect(
  mapStateToProps,
  actions
)(Signin);