import React from 'react';
import { connect } from 'react-redux';
import { API } from '../../../config';
import Layout from '../../../theming/layouts/isUsers';
import RespTable from '../../../components/Table';
import columns from '../../../modules/users';


class userList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listing: [] };
  }

  static async getInitialProps(ctx) {
    const data = await fetch(`${API}/users`, {
      headers: {
        'Authorization': 'Basic ' + ctx.store.getState().authentication.user['token']
      }
    });
    const json = await data.json();
    return { listing: json };
  }

  render() {

    let columnsList = columns(this.props.siteDetails);
    console.log(this.state.listing);
    return (
      <Layout title="Users" actions="list">
        <RespTable list={this.props.listing} columns={columnsList} />
      </Layout>
    );
  }
}



/*const userList = ({ list }, { siteDetails }) => (
  <Layout title="Users" actions="list">
    <RespTable list={list} columns={columns(siteDetails)} />
  </Layout>
);

userList.getInitialProps = async ctx => {
  initialize(ctx);
  const token = ctx.store.getState().authentication.user.token;
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    }
  };
  const res = await fetch(`${API}/users`, headers);
  const json = await res.json();
  return { list: json };
};*/

const mapStateToProps = (state) => (
  {
    siteDetails: state.siteSettings.settings,
    token: state.authentication.user,
  }
);

export default connect(mapStateToProps)(userList);