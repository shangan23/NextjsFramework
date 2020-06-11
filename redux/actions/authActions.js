import Router from 'next/router';
import { AUTHENTICATE, DEAUTHENTICATE, AUTH_ERROR } from '../types';
import { API, MSG } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ uname, password }) => {
  return (dispatch) => {
    fetch(`${API}/users/auth`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { uname: uname, password: password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch({ type: AUTH_ERROR, error: MSG.authError });
          //throw Error(MSG.authError);
        } else {
          setCookie('user', data);
          dispatch({ type: AUTHENTICATE, payload: data });
          Router.push('/dashboard');
        }
      });
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (user) => {
  let cleanUser = unescape(user);
  cleanUser= JSON.parse(cleanUser);
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: cleanUser });
  };
};

// gets the token from the cookie and saves it in the store
const forgotPassword = (uname) => {
  return uname;
};

// removing the token
const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('user');
    Router.push('/signin');
    dispatch({ type: DEAUTHENTICATE });
  };
};


export default {
  authenticate,
  reauthenticate,
  deauthenticate,
  forgotPassword,
};
