import { SITE_SETTINGS } from '../types';
//import Router from 'next/router';
// gets token from the api and stores it in the redux store and in cookie
const siteSettings = (settings) => {
  console.log(settings);
  return (dispatch) => {
    dispatch({ type: SITE_SETTINGS, payload: settings });
    //Router.push('/signin');
  };
};

export default {
  siteSettings
};
