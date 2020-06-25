import React from 'react';
import initialize from '../../../utils/initialize';
import DynamicForm from '../../../components/Forms/UserDynamicFormGrid';
import { connect } from 'react-redux';
import absoluteUrl from "next-absolute-url";
import RespTable from '../../../components/TableNew';
import {
  Grid
} from '@material-ui/core';
import Router from 'next/router';
import { getCookie } from '../../../utils/cookie';
import moduleController from '../../../modules/controller';

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
  console.log('iServer module', module);
  queryParam = '?'
  queryParam += (searchParams.get('limit')) ? `limit=${searchParams.get('limit')}` : '';
  queryParam += (searchParams.get('page')) ? `&page=${searchParams.get('page')}` : '';
  data = await fetch(`${origin}/api/app/${module}${queryParam}`, { headers: headers });
  listing = await data.json();
  columnsList = await moduleController(module, cleanSettings);
  return { listing, module, columnsList }
};



class DynamicCreate extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    await initialize(ctx);
    const { req } = ctx;
    if (!req) {
      const fullUrl = `${window.location.protocol}//${window.location.hostname}${(window.location.port ? ':' + window.location.port : '')}`;
      const { query } = Router;
      let module = ctx.query.appId;
      console.log('iClient Router module', module);
      console.log('iClient ctx', ctx.query.appId);
      let queryParam = '?'
      queryParam += (query.limit) ? `limit=${query.limit}` : '';
      queryParam += (query.page) ? `&page=${query.page}` : '';
      const data = await fetch(`${fullUrl}/api/app/${module}${queryParam}`);
      const json = await data.json();
      return { listing: json, module: module };
    } else {
      const { listing, module, columnsList } = await frameURL(req);
      return { listing, module, columnsList };
    }
  }

  render() {
    const settingsData = {};
    const onSubmit = async values => {
      window.alert(JSON.stringify(values, 0, 2));
    };

    let module = this.props.module;
    let columnsList = moduleController(module, this.props.siteInfo);

    return (
      <Grid container spacing={1} key={`${Math.random()}`}>
        <Grid item xs={12} md={4} >
          <RespTable module={this.props.module} createLink={'tests'} list={this.props.listing} columns={columnsList} />
        </Grid>
        <Grid item xs={12} md={8}>
          <DynamicForm
            formTitle={'Create'}
            module={module}
            action="new"
            defaultValue={settingsData}
            onSubmit={onSubmit}
            buttonCancelText="Cancel"
            buttonSubmitText="Save"
          />
        </Grid>
      </Grid>
    );
  }

}

function mapStateToProps(state) {
  return {
    siteInfo: state.siteSettings.settings,
  };
}

export default connect(
  mapStateToProps
)(DynamicCreate);
