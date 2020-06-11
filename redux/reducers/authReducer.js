import { AUTHENTICATE, DEAUTHENTICATE, AUTH_ERROR } from '../types';

const initialState = {
  error: null,
  success: null,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATE:
    return { user: action.payload, success: 'Auth success ... loading ...', error: null };
  case AUTH_ERROR:
    return { error: action.error, token: null, success: null };
  case DEAUTHENTICATE:
    return { token: null, user: null, success: 'Signout success ...', error: null };
  default:
    return state;
  }
};
