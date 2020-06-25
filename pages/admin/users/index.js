import React from 'react';
import { connect } from 'react-redux';
import RespTable from '../../../components/Table';
import moduleController from '../../../modules/controller';
import Router from 'next/router';

class userList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { listing: [] };
  }

  static async getInitialProps({ req }) {
    if (!req) {
      const fullUrl = `${window.location.protocol}//${window.location.hostname}${(window.location.port ? ':' + window.location.port : '')}`;
      const { query } = Router;
      let queryParam = '?'
      let url = fullUrl;
      queryParam += (query.limit) ? `limit=${query.limit}` : '';
      queryParam += (query.page) ? `&page=${query.page}` : '';
      const data = await fetch(`${url}/api/app/users${queryParam}`);
      const json = await data.json();
      return { listing: json };
    }
  }

  render() {
    let module = 'users';
    let columnsList = moduleController(module, this.props.siteDetails);
    return (
        <RespTable module={module} list={this.props.listing} columns={columnsList} createLink={'/admin/users/create'} />
    );
  }
}

const mapStateToProps = (state) => (
  {
    siteDetails: state.siteSettings.settings,
  }
);

export default connect(mapStateToProps)(userList);