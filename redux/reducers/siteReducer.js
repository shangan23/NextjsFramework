import { SITE_SETTINGS } from '../types';

const initialState = {
  settings: null
};

export default (state = initialState, action) => {
  console.log('---- componentDidMount - redux reduce -----', action.type);
  switch (action.type) {
  case SITE_SETTINGS:
  case 'siteSetttings':
    console.log('---- componentDidMount - redux reduce -----');
    return { settings: action.payload };
  default:
    return state;
  }
};
