import React from 'react';
import Router from 'next/router';
import { API } from '../../../config';
import { connect } from 'react-redux';
import initialize from '../../../utils/initialize';
import CreateLayout from '../../../theming/layouts/create';
import TwoColumn from '../../../components/Forms/TwoColumn';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  render() {
    const onSubmit = async values => {
      console.log('dddd', this.props.authentication.token);
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
          console.log(data);
          if (data.error) {
            throw Error(data.error);
          } else {
            window.alert(JSON.stringify(data, 0, 2));
            Router.push('/admin/users');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const fieldsToRender = [
      {
        'type': 'Text',
        'required': false,
        'id': 'fullName',
        'label': 'Full Name',
        'name': 'fullName'
      },
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
      },
      {
        'type': 'Email',
        'required': false,
        'id': 'email',
        'name': 'email',
        'label': 'Email'
      },
    ];
    return (
      <CreateLayout title="Dashboard" actions="create">
        <TwoColumn fieldsToRender={fieldsToRender} onSubmit={onSubmit} showBreadcrumb />
      </CreateLayout>
    );
  }

}

/*const onSubmit = async values => {
  console.log(this.props);
  axios.post(`${API}/users`, values)
    .then((response) => {
      //const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      //await sleep(300);
      window.alert(JSON.stringify(response, 0, 2));
      Router.push('/admin/users');
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const fieldsToRender = [
  {
    'type': 'Text',
    'required': false,
    'id': 'fullName',
    'label': 'Full Name',
    'name': 'fullName'
  },
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
  },
  {
    'type': 'Email',
    'required': false,
    'id': 'email',
    'name': 'email',
    'label': 'Email'
  },
];

const Dashboard = () => (
  <CreateLayout title="Dashboard" actions="create">
    <TwoColumn fieldsToRender={fieldsToRender} onSubmit={onSubmit} showBreadcrumb />
  </CreateLayout>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};*/

export default connect(state => state)(Dashboard);
