export default function modules(module = null) {
  let modules = [
    {
      label: { singular: 'Item', plural: 'Items' },
      link: '/dashboard',
      icon: { type: 'material', name: 'DashboardIcon' },
      id: 'dashboard',
      as: null
    }, {
      label: { singular: 'Customer', plural: 'Customers' },
      link: '/app/customers',
      icon: { type: 'fontawsome', name: 'fa fa-address-card' },
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
        { id: 'subItems', lable: { singular: 'Sub Item', plural: 'Sub Items' }, link: null, as: null },
        { id: 'variants', lable: { singular: 'Adjust Variant', plural: 'Adjust Variants' }, link: null, as: null }
      ],
      as: '/app/[appId]'
    }, {
      label: { singular: 'Inventory', plural: 'Inventory' },
      link: '',
      icon: { type: 'fontawsome', name: 'fa fa-pallet' },
      id: 'inventory',
      menus: [
        { name: 'Stocks', link: '/app/inventory/stocks', icon: '', id: 'stocks' },
        { name: 'Adjustments', link: '/app/inventory/adjustments', icon: '', id: 'adjustments' }
      ]
    }, {
      name: 'Orders',
      link: '/app/orders',
      icon: { type: 'material', name: 'AddShoppingCartIcon' },
      id: 'orders',
      menus: [],
      as: null
    }
  ];

  if (!module)
    return modules;
  else
    return modules.filter((x) => x.id === module)[0];
}