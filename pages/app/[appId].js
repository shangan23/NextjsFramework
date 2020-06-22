import React from "react";
import absoluteUrl from "next-absolute-url";
import Layout from '../../theming/layouts/isUsers';
import RespTable from '../../components/Table';
import moduleController from '../../modules/controller';
import { getCookie } from '../../utils/cookie';
import fetch from 'node-fetch';

function appPages({ listing, module, columnsList }) {
  return (
    <RespTable module={module} list={listing} columns={columnsList} />
  );
}

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  let user, host, queryParam, urlObj, data, json, cleanUser, columnsList, cleanSettings, settings, headers = {};
  user = getCookie('user', req);
  settings = getCookie('settings', req);
  cleanUser = unescape(user);
  cleanUser = JSON.parse(cleanUser);
  headers['Authorization'] = `Basic ${cleanUser.token}`;
  headers['Content-Type'] = 'application/json';
  host = absoluteUrl(req, req.headers.host);
  urlObj = new URL(`${host.origin}${req.url}`);
  let { origin, searchParams } = urlObj;
  queryParam = '?'
  queryParam += (searchParams.get('limit')) ? `limit=${searchParams.get('limit')}` : '';
  queryParam += (searchParams.get('page')) ? `&page=${searchParams.get('page')}` : '';
  console.log(`${origin}/api/app/customers${queryParam}`, { headers: headers });
  data = await fetch(`${origin}/api/app/customers${queryParam}`, { headers: headers });
  json = await data.json();
  columnsList = await moduleController(module, cleanSettings);
  return { props: { listing: json, module: 'customers', columnsList: columnsList } }
}

export default appPages;