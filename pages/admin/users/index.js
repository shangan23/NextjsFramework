import { connect } from 'react-redux';
import { API } from '../../../config';
import initialize from '../../../utils/initialize';
import User from '../../../theming/layouts/user';
import RespTable from '../../../components/Table';

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'uname',
    label: 'User Name',
    primary: true,
  },
  {
    key: 'password',
    label: 'Password'
  },
  {
    key: 'createdAt',
    label: 'Created On'
  },
  {
    key: 'updatedAt',
    label: 'Updated On'
  }
];


const userList = ({ list }) => (
  <User title="Sales" actions="list">
    <RespTable list={list} columns={columns} />
  </User>
);

userList.getInitialProps = async ctx => {
  initialize(ctx);
  const res = await fetch(`${API}/users`);
  const json = await res.json();
  return {list:json};
};

export default connect(state => state)(userList);
