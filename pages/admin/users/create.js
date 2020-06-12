import React from 'react';
import Router from 'next/router';
import { API } from '../../../config';
import { connect } from 'react-redux';
import initialize from '../../../utils/initialize';
import Layout from '../../../theming/layouts/isUsers';
import DynamicForm from '../../../components/Forms/DynamicForm';
import { columns } from '../../../modules/users';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  render() {
    const onSubmit = async values => {
      fetch(`${API}/users`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.props.authentication.token}`
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            throw Error(data.error);
          } else {
            //window.alert(JSON.stringify(data, 0, 2));
            Router.push('/admin/users');
          }
        });
    };

    return (
      <Layout title="Dashboard" actions="create">
        <DynamicForm
          fieldsToRender={columns}
          onSubmit={onSubmit}
          buttonCancelText="Cancel"
          buttonSubmitText="Save"
        />
      </Layout>
    );
  }

}
export default connect(state => state)(CreateUser);
