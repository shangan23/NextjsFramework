//import axios from 'axios';
import { connect } from 'react-redux';
//import { API } from '../config';
import initialize from '../utils/initialize';
import User from '../theming/layouts/user';

const Dashboard = () => (
  <User title="Dashboard">
    <strong className="is-size-2 has-text-primary">test</strong>.
  </User>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
