//import axios from 'axios';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import Layout from '../../theming/layouts/isUsers';
import CreateComponent from '../../components/Create';
//import Layout from '../../components/CreateRFF';

const Dashboard = () => (
  <Layout title="Dashboard" actions="create">
    <CreateComponent />
  </Layout>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
