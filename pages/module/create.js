//import axios from 'axios';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import CreateLayout from '../../theming/layouts/create';
import CreateComponent from '../../components/Create';
//import CreateLayout from '../../components/CreateRFF';

const Dashboard = () => (
  <CreateLayout title="Dashboard" actions="create">
    <CreateComponent />
  </CreateLayout>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
