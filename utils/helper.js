import Router from 'next/router';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export const getStateData = (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      if (getCookie('settings', ctx.req))
        ctx.store.dispatch(actions.resettings(getCookie('settings', ctx.req)));
    }
  } else {
    const user = ctx.store.getState().settings;
    if (user && (ctx.pathname === '/')) {
      setTimeout(function () {
        Router.push('/');
      }, 0);
    }
  }
}

export const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers, 
     * and you may want to customize it to your needs
     */
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}
