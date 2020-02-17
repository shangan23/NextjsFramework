//import axios from 'axios';
import { connect } from 'react-redux';
//import { API } from '../config';
import initialize from '../utils/initialize';
import Dashboard from '../theming/layouts/dashboard';
import SimpleCard from '../components/Widgets/Card';
import ImgMediaCard from '../components/Widgets/MediaCard';
import { Grid } from '@material-ui/core';

const DashboardPage = () => (
  <Dashboard title="Dashboard" actions="dashlets">
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <SimpleCard />
      </Grid>
      <Grid item xs={12} md={4}>
        <SimpleCard />
      </Grid>
      <Grid item xs={12} md={4}>
        <SimpleCard />
      </Grid>
      <Grid item xs={12} md={12}>
        <ImgMediaCard />
      </Grid>
    </Grid>
  </Dashboard>
);

DashboardPage.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(DashboardPage);
