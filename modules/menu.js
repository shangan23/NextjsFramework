export default function modules(module = null) {
  let modules = [
    {
      label: { singular: 'Dashboard', plural: 'Dashboard' },
      link: '/dashboard',
      icon: { type: 'material', name: 'DashboardIcon' },
      id: 'dashboard',
      as: null
    }, {
      label: { singular: 'Customer', plural: 'Customers' },
      link: '/app/customers',
      icon: { type: 'material', name: 'ContactsIcon' },
      id: 'customers',
      as: '/app/[appId]'
    }, {
      label: { singular: 'Vendor', plural: 'Vendors' },
      link: '/app/vendors',
      icon: { type: 'material', name: 'RecentActorsIcon' },
      id: 'vendors',
      menus: [],
      as: '/app/[appId]'
    }, {
      link: '/app/items',
      label: { singular: 'Item', plural: 'Items' },
      icon: { type: 'material', name: 'AppsIcon' },
      id: 'items',
      subApp: [
        { id: 'subItems', lable: { singular: 'Sub Item', plural: 'Sub Items' }, link: null, as: 'null' },
        { id: 'inventory', lable: { singular: 'Inventory', plural: 'Inventory' }, link: null, as: null }
      ],
      as: '/app/[appId]'
    }, {
      label: { singular: 'Inventory', plural: 'Inventory' },
      link: '/app/inventory',
      icon: { type: 'material', name: 'AssignmentIcon' },
      id: 'inventory',
      menus: [],
      as: '/app/[appId]'
    }, {
      name: 'billsOfMaterial',
      label: { singular: 'Bills Of Material', plural: 'Bills Of Materials' },
      link: '/app/billsOfMaterial',
      icon: { type: 'material', name: 'PlaylistAddCheckIcon' },
      id: 'billsOfMaterial',
      menus: [],
      subApp: [
        { id: 'bomItems', lable: { singular: 'BOM Item', plural: 'BOM Items' }, link: null, as: null },
      ],
      as: null
    }, {
      name: 'SalesOrders',
      label: { singular: 'Sales Order', plural: 'Sales Orders' },
      link: '/app/orders',
      icon: { type: 'material', name: 'ShoppingCartIcon' },
      id: 'orders',
      menus: [],
      as: null
    }, {
      name: 'ProductionOrders',
      label: { singular: 'Purchase Order', plural: 'Production Orders' },
      link: '/app/productionOrders',
      icon: { type: 'material', name: 'BuildIcon' },
      id: 'ProductionOrders',
      menus: [],
      as: null
    }
  ];

  if (!module)
    return modules;
  else
    return modules.filter((x) => x.id === module)[0];
}