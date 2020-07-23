import Moment from 'react-moment';
export default function columns(module, settings) {
  let columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        display: false,
      },
      type: 'Text',
      disabled:true,
      required: false,
      id: 'id',
      section: 'System Information'
    },
    {
      name: 'name',
      label: 'Name',
      primary: true,
      options: {
        filter: true
      },
      type: 'Text',
      required: false,
      id: 'name',
      section: 'Basic Information'
    },
    {
      name: 'sku',
      label: 'SKU',
      subPrimary:true,
      options: {
        filter: false,
        sort: false
      },
      type: 'Text',
      required: true,
      id: 'sku',
      section: 'Basic Information'
    },
    {
      name: 'units',
      label: 'Units',
      options: {
        filter: true,
        sort: false
      },
      type: 'Text',
      required: true,
      id: 'units',
      section: 'Basic Information'
    },
    {
      name: 'cost',
      label: 'Cost',
      options: {
        filter: true,
        customBodyRender: (value) => {
          return <span>&#8377;&nbsp;{value.toLocaleString('en-IN')}</span>;
        }
      },
      type: 'Currency',
      required: true,
      id: 'cost',
      section: 'Purchase Details'
    },
    {
      name: 'fk_vendorId',
      id: 'fk_vendorId',
      fk: true,
      module: 'vendors',
      moduleField: 'name',
      label: 'Vendor',
      options: {
        filter: true,
        customBodyRender: (value) => {
          return value.name;
        }
      },
      type: 'Lookup',
      required: true,
      section: 'Purchase Details'
    },
    {
      name: 'costDescription',
      label: 'Description',
      options: {
        filter: true
      },
      type: 'TextArea',
      required: true,
      id: 'costDescription',
      section: 'Purchase Details'
    },
    {
      name: 'openingStock',
      label: 'Opening Stock',
      options: {
        filter: true,
      },
      type: 'Text',
      required: false,
      id: 'openingStock',
      section: 'Inventory Details'
    },
    {
      name: 'preorderLevel',
      label: 'Low Stock Level',
      options: {
        filter: false,
      },
      type: 'Text',
      required: false,
      id: 'preorderLevel',
      section: 'Inventory Details'
    },
    {
      name: 'fk_createdBy',
      id: 'fk_createdBy',
      fk: true,
      module: 'users',
      moduleField: 'fullName',
      label: 'Created By',
      options: {
        filter: true,
        customBodyRender: (value) => {
          return value.fullName;
        }
      },
      type: 'Lookup',
      disabled:true,
      required: true,
      section: 'System Information'
    },
    {
      name: 'fk_updatedBy',
      label: 'Updated By',
      fk: true,
      module: 'users',
      moduleField: 'fullName',
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value.fullName;
        }
      },
      type: 'Lookup',
      disabled:true,
      required: true,
      id: 'fk_updatedBy',
      section: 'System Information'
    },
    {
      name: 'createdAt',
      id: 'createdAt',
      label: 'Created On',
      type: 'Date',
      disabled:true,
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Moment format={settings.dateFormat}>
              {value}
            </Moment>
          );
        }
      },
      section: 'System Information'
    },
    {
      name: 'updatedAt',
      id: 'createdAt',
      label: 'Updated On',
      type: 'Date',
      disabled:true,
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Moment format={settings.dateFormat}>
              {value}
            </Moment>
          );
        }
      },
      section: 'System Information'
    }
  ];
  return columns;
}