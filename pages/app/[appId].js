import React from 'react';
import RespTable from '../../components/TableNew';
import moduleController from '../../modules/controller';
import { connect } from 'react-redux';
import Router from 'next/router';
import absoluteUrl from "next-absolute-url";
import { getCookie } from '../../utils/cookie';
import initialize from '../../utils/initialize';

const frameURL = async (req) => {
  let user, host, settings, cleanUser, cleanSettings, columnsList, urlObj, headers = {};
  user = getCookie('user', req);
  settings = getCookie('settings', req);
  cleanUser = unescape(user);
  cleanUser = JSON.parse(cleanUser);
  cleanSettings = unescape(settings);
  cleanSettings = JSON.parse(cleanSettings);
  headers['Authorization'] = `Basic ${cleanUser.token}`;
  headers['Content-Type'] = 'application/json';
  host = absoluteUrl(req, req.headers.host);
  urlObj = new URL(`${host.origin}${req.url}`);
  let queryParam, data, listing, module;
  console.log(urlObj);
  let { origin, searchParams, pathname } = urlObj;
  module = pathname.replace('/app/', '');
  console.log('iServer query',searchParams);
  console.log('iServer module',module);
  queryParam = '?'
  queryParam += (searchParams.get('limit')) ? `limit=${searchParams.get('limit')}` : '';
  queryParam += (searchParams.get('page')) ? `&page=${searchParams.get('page')}` : '';
  queryParam += (searchParams.get('filter')) ? `&filter=${searchParams.get('filter')}` : '';
  console.log('iServer filter',`${origin}/api/app/${module}${queryParam}`);
  data = await fetch(`${origin}/api/app/${module}${queryParam}`, { headers: headers });
  listing = await data.json();
  columnsList = await moduleController(module, cleanSettings);
  return { listing, module, columnsList }
};

class DynamicList extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    await initialize(ctx);
    const { req } = ctx;
    if (!req) {
      const fullUrl = `${window.location.protocol}//${window.location.hostname}${(window.location.port ? ':' + window.location.port : '')}`;
      const { query } = ctx;
      let module = query.appId;
      console.log('iClient Router module',module);
      console.log('iClient ctx',ctx.query.appId);
      console.log('iClient query',query);
      let queryParam = '?'
      queryParam += (query.limit) ? `limit=${query.limit}` : '';
      queryParam += (query.page) ? `&page=${query.page}` : '';
      queryParam += (query.filter) ? `&filter=${query.filter}` : '';
      console.log('iClient filter',`${fullUrl}/api/app/${module}${queryParam}`);
      const data = await fetch(`${fullUrl}/api/app/${module}${queryParam}`);
      const json = await data.json();
      return { listing: json, module: module };
    } else {
      const { listing, module, columnsList } = await frameURL(req);
      return { listing, module, columnsList };
    }
  }

  render() {
    let module = this.props.module;
    let columnsList = moduleController(module, this.props.siteInfo);
    return (
      <RespTable module={module} createLink={'tests'} list={this.props.listing} columns={columnsList} />
    );
  }
}

const mapStateToProps = (state) => (
  {
    // isAuthenticated: !!state.authentication.user,
    siteInfo: state.siteSettings.settings
  }
);

export default connect(mapStateToProps)(DynamicList);
