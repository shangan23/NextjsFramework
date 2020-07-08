//import axios from 'axios';
import { connect } from 'react-redux';
//import { API } from '../config';
import initialize from '../utils/initialize';
import CountCard from '../components/Widgets/CountCard';
import { Grid } from '@material-ui/core';
import LineChartWidget from '../components/Widgets/Charts/Line';
import PieChartWidget from '../components/Widgets/Charts/Pie';
import DoughnutChartWidget from '../components/Widgets/Charts/Doughnut';
import BarChartWidget from '../components/Widgets/Charts/Bar';
import TableWidget from '../components/Widgets/Charts/Table';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function fetchCount(app) {
  fetch(`api/app/${app}`)
    .then((res) => res.json())
    .then((data) => {
    });
}

function fetchChartData(app) {
  fetch(`api/app/${app}`)
    .then((res) => res.json())
    .then((data) => {
    });
}

function fetchTableData(app) {
  fetch(`api/app/${app}`)
    .then((res) => res.json())
    .then((data) => {
    });
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submittedValues: undefined };
  }

  async componentDidMount() {
    /*  const books = await APIManager.fetchBooks();
      const authors = await APIManager.fetchAuthor();
      const shops = await APIManager.fetchShops();
  
  
      this.handleBooks(books);
      this.handleAuthors(authors);
      this.handleShops(shops);*/
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <CountCard type="users" />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <CountCard type="spares" />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <CountCard type="specifications" />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <CountCard type="products" />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card elevation={0} variant="outlined">
            <CardContent>
              <Typography color="primary" variant="body1">
                Top 5 Orders
            </Typography><br />
              <TableWidget />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card elevation={0} variant="outlined">
            <CardContent>
              <Typography color="primary" variant="body1">
                Product By Spares
            </Typography>
              <PieChartWidget />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card elevation={0} variant="outlined">
            <CardContent>
              <Typography color="primary" variant="body1">
                Product By Spares
            </Typography>
              <DoughnutChartWidget />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card elevation={0} variant="outlined">
            <CardContent>
              <Typography color="primary" variant="body1">
                Word of the Day
            </Typography>
              <LineChartWidget />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card elevation={0} variant="outlined">
            <CardContent>
              <Typography color="primary" variant="body1">
                Top 5 Orders
            </Typography>
              <BarChartWidget />
            </CardContent>
          </Card>
        </Grid>
      </Grid>);
  }

}

Dashboard.getInitialProps = async ctx => {
  initialize(ctx);
};

export default connect(state => state)(Dashboard);
