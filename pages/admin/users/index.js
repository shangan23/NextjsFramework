import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../../theming/layouts/isUsers';
import RespTable from '../../../components/Table';
import moduleController from '../../../modules/controller';

class userList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { listing: [] };
  }

  static async getInitialProps(ctx) {
    const { query } = ctx;
    let queryParam = '?'
    let url = (ctx.store.getState().siteSettings.settings.siteURL)?(ctx.store.getState().siteSettings.settings.siteURL):'';
    queryParam += (query.limit) ? `limit=${query.limit}` : '';
    queryParam += (query.page) ? `&page=${query.page}` : '';
    const data = await fetch(`${url}api/app/users${queryParam}`);
    const json = await data.json();
    return { listing: json };
  }

  render() {
    let module = 'users';
    let columnsList = moduleController(module, this.props.siteDetails);
    return (
      <Layout title="Users" actions="list">
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

export default connect(mapStateToProps)(userList);