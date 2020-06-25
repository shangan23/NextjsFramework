import React from 'react';
import initialize from '../../../utils/initialize';
import DynamicForm from '../../../components/Forms/DynamicForm';
import { connect } from 'react-redux';
import moduleController from '../../../modules/controller';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    //const res = await fetch(`${API}/siteSettings/1`);
    //const json = await res.json();
    //return { settings: json };
  }

  render() {
    const settingsData = {};
    const onSubmit = async values => {
      window.alert(JSON.stringify(values, 0, 2));
      /* fetch(`${API}/siteSettings/1`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Basic ${this.props.token}`
         },
         body: JSON.stringify(values),
       })
         .then(response => response.json())
         .then(data => {
           //console.log(data);
           if (data.error) {
             throw Error(data.error);
           } else {
             this.props.siteSettings(values);
             window.alert(JSON.stringify(values, 0, 2));
             //Router.push('/admin/users');
           }*/
    };

    let columnsList = moduleController('users', this.props.siteDetails);

    return (
        <DynamicForm
          formTitle={'create'}
          fieldsToRender={columnsList}
          defaultValue={settingsData}
          onSubmit={onSubmit}
          buttonCancelText="Cancel"
          buttonSubmitText="Save"
        />
    );
  }

}

function mapStateToProps(state) {
  return {
    siteDetails: state.siteSettings.settings
  };
}

export default connect(
  mapStateToProps
)(CreateUser);
