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
  };
}

export const validateFields = (values, fieldsToRender, fromFilter = false) => {
  const errors = {};
  var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  var curencyRegex = /^(?:0|[1-9]\d*)(?:\.(?!.*000)\d+)?$/;
  fieldsToRender.map((data, index) => {
    if (fieldsToRender[index]['type']) {
      let name = (fieldsToRender[index]['name']).toString();
      let label = (fieldsToRender[index]['label']).toString();
      let type = (fieldsToRender[index]['type']).toString();
      let required = (fieldsToRender[index]['required']);
      required = (fromFilter) ? false : required;
      switch (type) {
        case 'Autocomplete':
          if ((values[name].length == 0) && required)
            errors[name] = label + ' required';
          break;
        case 'Currency':
          if ((!values[name]) && required)
            errors[name] = label + ' required';
          else {
            if (!curencyRegex.test(values[name]) && values[name])
              errors[name] = label + ' invalid';
          }
          break;
        case 'DynamicSet':
          //window.alert(JSON.stringify(values[name],0,2));
         // if (!values[name] && required)
          //  errors[name] = label + ' required';
          break;
        case 'Email':
          if ((!values[name]) && required)
            errors[name] = label + ' required';
          else {
            if (!regex.test(values[name]) && values[name])
              errors[name] = label + ' invalid';
          }
          break;
        default:
          if (!values[name] && required)
            errors[name] = label + ' required';
          break;
      }
    }
  }
  );
  return errors;
};
