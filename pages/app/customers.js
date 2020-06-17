import React from 'react';
import { connect } from 'react-redux';
import { API, RecordsPerPage } from '../../config';
import Layout from '../../theming/layouts/isUsers';
import RespTable from '../../components/Table';
import moduleController from '../../modules/controller';

class appList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { listing: [] };
  }

  static async getInitialProps(ctx) {
    const { query } = ctx;
    console.log(ctx.store.getState().authentication);
    let queryParam = '?'
    queryParam += (query.limit) ? `limit=${query.limit}` : '';
    queryParam += (query.page) ? `&page=${query.page}` : '';
    queryParam = (queryParam == '?') ? `?limit=${RecordsPerPage}` : queryParam;
    const data = await fetch(`${API}/customers${queryParam}`, {
      headers: {
        'Authorization': 'Basic ' + ctx.store.getState().authentication.user['token']
      }
    });
    const json = await data.json();
    return { listing: json };
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
    token: state.authentication.user,
  }
);

export default connect(mapStateToProps)(appList);