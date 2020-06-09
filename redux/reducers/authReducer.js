import { AUTHENTICATE, DEAUTHENTICATE,AUTH_ERROR } from '../types';

const initialState = {
  token: null,
  error: null,
  success:null
};

export default (state = initialState, action) => {
  switch(action.type) {
  case AUTHENTICATE:
    return { token: action.payload, success:'Auth success ... loading ...',error: null};
  case AUTH_ERROR:
    return { error: action.error,token:null,success:null};
  case DEAUTHENTICATE:
    return { token: null,success:'Signout success ...',error: null};
  default:
    return state;
  }
};
