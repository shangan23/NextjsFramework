//import axios from 'axios';
import { connect } from 'react-redux';
//import { API } from '../config';
import initialize from '../utils/initialize';
import Layout from '../theming/layouts/isUsers';
import SimpleCard from '../components/Widgets/Card';
import CountCard from '../components/Widgets/CountCard';
import ImgMediaCard from '../components/Widgets/MediaCard';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const Dashboard = () => (
  <Layout title="Dashboard" actions="dashlets">
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <CountCard type="users"/>
      </Grid>
      <Grid item xs={3}>
        <CountCard type="spares"/>
      </Grid>
      <Grid item xs={3}>
        <CountCard type="specifications"/>
      </Grid>
      <Grid item xs={3}>
        <CountCard type="products"/>
      </Grid>
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
  </Layout>
);

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
