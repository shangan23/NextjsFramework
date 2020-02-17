//import axios from 'axios';
import { connect } from 'react-redux';
//import { API } from '../config';
import initialize from '../../utils/initialize';
import User from '../../theming/layouts/user';
import RespTable from '../../components/Table';

const Dashboard = () => (
  <User title="Sales" actions="list">
    <RespTable />
  </User>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
