import { connect } from 'react-redux';
import { API } from '../../../config';
import initialize from '../../../utils/initialize';
import Layout from '../../../theming/layouts/isUsers';
import RestClient from '../../../utils/restClient';
//import RespTable from '../../../components/Table';
import RespTable from '../../../components/Table_new';
import {columns} from '../../../modules/users';
import AdminMenu from '../../../components/AdminMenu';

const userList = ({ list }) => (
  <Layout title="Users" actions="list">
    <AdminMenu />
    <RespTable list={list} columns={columns} />
  </Layout>
);

userList.getInitialProps = async ctx => {
  initialize(ctx);
  const token = ctx.store.getState().authentication.token;
  const header = {'Authorization':`Basic ${token}`};
  const rest = new RestClient();
  const json = await rest.get(`${API}/users`,header);
  return { list: json };
};

export default connect(state => state)(userList);
