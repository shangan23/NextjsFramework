import { combineReducers } from 'redux';
import authReducer from './authReducer';
import siteReducer from './siteReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  siteSettings: siteReducer
});

export default rootReducer;
