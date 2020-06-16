import { NOTIFICATIONS, NOTIFICATIONS_CLOSE } from '../types';

const notifications = (data) => {
  let message;
  return (dispatch) => {
    if (data) {
      message = data.message;
    }
    dispatch({ type: NOTIFICATIONS, payload: message });
  };
};

const notificationsClose = () => {
  return (dispatch) => {
    dispatch({ type: NOTIFICATIONS_CLOSE, payload: null });
  };
};

export default {
  notifications,
  notificationsClose
};
