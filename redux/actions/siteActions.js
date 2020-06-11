import { SITE_SETTINGS } from '../types';
import { setCookie } from '../../utils/cookie';
//import Router from 'next/router';
// gets token from the api and stores it in the redux store and in cookie
const siteSettings = (settings) => {
  return (dispatch) => {
    setCookie('settings', JSON.stringify(settings));
    dispatch({ type: SITE_SETTINGS, payload: settings });
    //Router.push('/signin');
  };
};

// gets the token from the cookie and saves it in the store
const resettings = (settings) => {
  let cleanSettings = unescape(settings);
  cleanSettings= JSON.parse(cleanSettings);
  return (dispatch) => {
    dispatch({ type: SITE_SETTINGS, payload: cleanSettings });
  };
};

export default {
  siteSettings,
  resettings
};
