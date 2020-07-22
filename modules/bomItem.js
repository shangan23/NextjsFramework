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
      required: false,
      disabled:true,
      id: 'id',
      section: 'System Information'
    },
    {
      name: 'fk_itemId',
      id: 'fk_itemId',
      fk: true,
      module: 'items',
      moduleField: 'name',
      label: 'Item',
      isParent: true,
      options: {
        filter: true,
        customBodyRender: (value) => {
          return value.name;
        }
      },
      type: 'Lookup',
      required: true,
      section: 'Inventory Details'
    },
    {
      name: 'quantity',
      label: 'Quantity',
      options: {
        filter: true,
      },
      type: 'Text',
      required: true,
      id: 'quantity',
      section: 'Inventory Details'
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
      },
      type: 'TextArea',
      required: true,
      id: 'description',
      section: 'Inventory Details'
    },
    {
      name: 'fk_createdBy',
      id: 'fk_createdBy',
      fk: true,
      module: 'users',
      moduleField: 'fullName',
      label: 'Created By',
      disabled:true,
      options: {
        filter: true,
        customBodyRender: (value) => {
          return value.fullName;
        }
      },
      type: 'Lookup',
      required: true,
      section: 'System Information'
    },
    {
      name: 'fk_updatedBy',
      label: 'Updated By',
      fk: true,
      module: 'users',
      moduleField: 'fullName',
      disabled:true,
      options: {
        filter: false,
        customBodyRender: (value) => {
          return value.fullName;
        }
      },
      type: 'Lookup',
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