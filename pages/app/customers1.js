import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../theming/layouts/isUsers';
import RespTable from '../../components/TableNew';
import moduleController from '../../modules/controller';
import Router from 'next/router';

class appList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { listing: [] };
  }

  static async getInitialProps({ req }) {
    if (!req) {
      const fullUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      const { query } = Router;
      let queryParam = '?'
      let url = fullUrl;
      queryParam += (query.limit) ? `limit=${query.limit}` : '';
      queryParam += (query.page) ? `&page=${query.page}` : '';
      const data = await fetch(`${url}/api/app/customers${queryParam}`);
      const json = await data.json();
      return { listing: json };
    }
  }

  render() {
    let module = 'customers';
    let columnsList = moduleController(module, this.props.siteDetails);
    return (
      <Layout title="Customers" actions="list">
        <RespTable module={module} list={this.props.listing} columns={columnsList} />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => (
  {
    siteDetails: state.siteSettings.settings,
  }
);

export default connect(mapStateToProps)(appList);