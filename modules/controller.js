import users from './users';
export default function columns(module, settings) {
  let columns = [];
  if (module == 'users') {
    return users(settings);
  }
  return columns;
}