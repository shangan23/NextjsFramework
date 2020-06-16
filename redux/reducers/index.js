import { combineReducers } from 'redux';
import authReducer from './authReducer';
import siteReducer from './siteReducer';
import notifyReducer from './notifyReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  siteSettings: siteReducer,
  notifications: notifyReducer
});

export default rootReducer;
