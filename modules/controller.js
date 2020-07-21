import users from './users';
import customers from './customers';
import vendors from './vendors';
import items from './items';
import subItems from './subItems';
import orders from './orders';
import inventory from './inventory';
import billsOfMaterial from './billsOfMaterial';
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
    case 'items':
      columns = items(module, settings);
      break;
    case 'subItems':
      columns = subItems(module, settings);
      break;
    case 'orders':
      columns = orders(module, settings);
      break;
    case 'inventory':
      columns = inventory(module, settings);
      break;
    case 'billsOfMaterial':
      columns = billsOfMaterial(module, settings);
      break;
  }
  return columns;
}