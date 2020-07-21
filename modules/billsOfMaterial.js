import Moment from 'react-moment';
import CellEdit from '../components/Table/CellEditDialog';
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
      id: 'id',
      section: 'System Information'
    },
    {
      name: 'fk_itemId',
      id: 'fk_itemId',
      fk: true,
      module: 'items',
      moduleField: 'name',
      label: 'Items',
      options: {
        filter: true,
        customBodyRender: (value) => {
          return value.name;
        }
      },
      type: 'Lookup',
      required: true,
      section: 'Stock Details'
    },
    {
      name: 'fk_itemId',
      id: 'fk_itemId',
      fk: true,
      module: 'items',
      moduleField: 'sku',
      label: 'Item Code',
      options: {
        filter: true,
        customBodyRender: (value) => {
          return value.sku;
        }
      },
      type: 'Lookup',
      required: true,
      section: 'Stock Details'
    },
    {
      name: 'code',
      label: 'Bill Code',
      options: {
        filter: false,
      },
      primary:true,
      type: 'Text',
      required: true,
      id: 'code',
      section: 'Stock Details'
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: false,
      },
      type: 'TextArea',
      required: false,
      id: 'description',
      section: 'Stock Details'
    },
    {
      name: 'fk_createdBy',
      id: 'fk_createdBy',
      fk: true,
      label: 'Created By',
      module: 'users',
      moduleField: 'fullName',
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