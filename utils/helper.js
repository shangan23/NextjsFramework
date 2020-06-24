import Router from 'next/router';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function getStateData(ctx) {
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