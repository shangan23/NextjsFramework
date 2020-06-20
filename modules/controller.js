import users from './users';
import customers from './customers';
import vendors from './vendors';
export default function columns(module, settings) {
  let columns = [];
  switch (module) {
    case 'users':
      columns = users(module, settings);
      break;
    case 'customers':
      columns = customers(module, settings);
      break;
    case 'vendors':
      columns = vendors(module, settings);
      break;
  }
  return columns;
}