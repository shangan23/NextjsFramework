import { NOTIFICATIONS, NOTIFICATIONS_CLOSE } from '../types';

const initialState = {
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case NOTIFICATIONS:
  case 'notifications':
    return { message: action.payload };
  case NOTIFICATIONS_CLOSE:
  case 'notificationsClose':
    return { message: null };
  default:
    return state;
  }
};
