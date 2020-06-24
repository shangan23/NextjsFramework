import React from 'react';
import absoluteUrl from "next-absolute-url";
import Layout from '../../theming/layouts/isUsers';
import RespTable from '../../components/Table';
import moduleController from '../../modules/controller';
import { getCookie } from '../../utils/cookie';
//import fetch from "isomorphic-unfetch";

const Author = ({ listing, module, columnsList }) => {
  return (
    <Layout title={module} actions="list">
      <RespTable module={module} list={listing} columns={columnsList} />
    </Layout>
  );
};

Author.getInitialProps = async (ctx) => {
  const { req } = ctx;
  const { listing, module, columnsList } = await frameURL(req);
  return { listing: listing, module: module, columnsList: columnsList }
};

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
  let queryParam, data, listing, module = 'customers';
  let { origin, searchParams } = urlObj;
  queryParam = '?'
  queryParam += (searchParams.get('limit')) ? `limit=${searchParams.get('limit')}` : '';
  queryParam += (searchParams.get('page')) ? `&page=${searchParams.get('page')}` : '';
  data = await fetch(`${origin}/api/app/customers${queryParam}`, { headers: headers });
  listing = await data.json();
  columnsList = await moduleController(module, cleanSettings);
  return { listing, module, columnsList }
};

export default Author;