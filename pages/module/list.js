//import axios from 'axios';
import { connect } from 'react-redux';
//import { API } from '../config';
import initialize from '../../utils/initialize';
import Layout from '../../theming/layouts/isUsers';
import RespTable from '../../components/Table';

const Dashboard = () => (
  <Layout title="Sales" actions="list">
    <RespTable />
  </Layout>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
