import axios from 'axios';
import Router from 'next/router';
import { API } from '../../../config';
import { connect } from 'react-redux';
import initialize from '../../../utils/initialize';
import CreateLayout from '../../../theming/layouts/create';
import TwoColumn from '../../../components/Forms/TwoColumn';

const onSubmit = async values => {
  axios.post(`${API}/users`, values)
    .then((response) => {
      //const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      //await sleep(300);
      window.alert(JSON.stringify(response, 0, 2));
      Router.push('/admin/users/list');
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const fieldsToRender = [
  {
    'type': 'Text',
    'required': true,
    'id': 'standard',
    'label': 'User Name',
    'name': 'uname'
  },
  {
    'type': 'Password',
    'required': true,
    'id': 'standard',
    'name': 'password',
    'label': 'Password'
  }
];

const Dashboard = () => (
  <CreateLayout title="Dashboard" actions="create">
    <TwoColumn fieldsToRender={fieldsToRender} onSubmit={onSubmit} />
  </CreateLayout>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
