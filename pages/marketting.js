//import axios from 'axios';
import { connect } from 'react-redux';
//import { API } from '../config';
import initialize from '../utils/initialize';
import User from '../theming/layouts/user';
import StickyHeadTable from '../components/Table';

const Dashboard = () => (
  <User title="Dashboard">
    <StickyHeadTable />.
  </User>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
