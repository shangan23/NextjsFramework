import authActions from './authActions';
import siteActions from './siteActions';
import notifyActions from './notifyActions';

export default {
  ...authActions,
  ...siteActions,
  ...notifyActions
};
