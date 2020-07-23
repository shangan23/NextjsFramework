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
      primary:true,
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
      subPrimary:true,
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
      name: 'onAvailable',
      label: 'On Available',
      options: {
        filter: false,
      },
      type: 'Text',
      required: true,
      id: 'onAvailable',
      section: 'Stock Details'
    },
    {
      name: 'onOrder',
      label: 'On Order',
      options: {
        filter: false,
      },
      type: 'Text',
      required: false,
      id: 'onOrder',
      section: 'Stock Details'
    },
    {
      name: 'onHand',
      label: 'On Hand',
      options: {
        filter: false,
      },
      type: 'Text',
      required: false,
      id: 'onHand',
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