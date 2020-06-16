import React from 'react';
import { connect } from 'react-redux';
import { API } from '../../../config';
import Layout from '../../../theming/layouts/isUsers';
import RespTable from '../../../components/Table';
import moduleController from '../../../modules/controller';

class userList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { listing: [] };
  }

  static async getInitialProps(ctx) {
    const {query} = ctx;
    const data = await fetch(`${API}/users?perPage=${query.perPage}`, {
      headers: {
        'Authorization': 'Basic ' + ctx.store.getState().authentication.user['token']
      }
    });
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
    token: state.authentication.user,
  }
);

export default connect(mapStateToProps)(userList);