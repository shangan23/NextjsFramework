import Router from 'next/router';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function (ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      if(getCookie('user', ctx.req))
        ctx.store.dispatch(actions.reauthenticate(getCookie('user', ctx.req)));
      ctx.store.dispatch(actions.resettings(getCookie('settings', ctx.req)));
    }
  } else {
    const user = ctx.store.getState().authentication.user;
    if (user && (ctx.pathname === '/signin')) {
      setTimeout(function () {
        Router.push('/');
      }, 0);
    }
  }


}
