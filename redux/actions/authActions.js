import Router from 'next/router';
//import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  if (type !== 'signin' && type !== 'signup') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    const data = {uname:email,password:password};
    fetch(`${API}/user/auth`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setCookie('token', data + '--' + password);
        Router.push('/dashboard');
        dispatch({ type: AUTHENTICATE, payload: data + '--' + password });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    /*axios.post(`${API}/${type}`, { email, password })
      .then((response) => {
        setCookie('token', response.data.token);
        Router.push('/');
        dispatch({type: AUTHENTICATE, payload: response.data.token});
      })
      .catch((err) => {
        throw new Error(err);
      });*/
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// gets the token from the cookie and saves it in the store
const forgotPassword = (email) => {
  return email;
};

// removing the token
const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
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
