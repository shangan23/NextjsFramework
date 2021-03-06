import { SITE_SETTINGS } from '../types';

const initialState = {
  settings: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SITE_SETTINGS:
  case 'siteSetttings':
    return { settings: action.payload };
  default:
    return state;
  }
};
