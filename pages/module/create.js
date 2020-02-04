//import axios from 'axios';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import User from '../../theming/layouts/user';
import CreateLayout from '../../components/Create';

const Dashboard = () => (
  <User title="Dashboard">
    <CreateLayout />.
  </User>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
