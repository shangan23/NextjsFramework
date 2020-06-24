import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../theming/layouts/isUsers';
import RespTable from '../../components/Table';
import moduleController from '../../modules/controller';

class appList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { listing: [] };
  }

  static async getInitialProps(ctx) {
    const { query, req } = ctx;
    let json = {};
    if (!req) {
      let queryParam = '?';
      let url = (ctx.store.getState().siteSettings.settings) ? (ctx.store.getState().siteSettings.settings.siteURL) : '';
      queryParam += (query.limit) ? `limit=${query.limit}` : '';
      queryParam += (query.page) ? `&page=${query.page}` : '';
      const data = await fetch(`${url}api/app/vendors${queryParam}`);
      json = await data.json();
    }
    return { listing: json };
  }

  render() {
    let module = 'vendors';
    let columnsList = moduleController(module, this.props.siteDetails);
      return (
      <Layout title="Vendors" actions="list">
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