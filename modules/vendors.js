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
      subPrimary:true,
      type: 'Text',
      required: false,
      id: 'id',
      section: 'System Information',
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
      section: 'Basic Information',
    },
    {
      name: 'contactName',
      label: 'Contact Name',
      options: {
        filter: false,
        sort: false
      },
      type: 'Text',
      required: true,
      id: 'contactName',
      section: 'Basic Information',
    },
    {
      name: 'number',
      label: 'Number',
      options: {
        filter: true,
        sort: false
      },
      type: 'Text',
      required: true,
      id: 'number',
      section: 'Communication',
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true
      },
      type: 'Email',
      required: true,
      id: 'email',
      section: 'Communication',
    },
    {
      name: 'designation',
      label: 'Designation',
      options: {
        filter: true,
      },
      type: 'Text',
      required: false,
      id: 'designation',
      section: 'Basic Information',
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: false,
        display: false,
      },
      type: 'TextArea',
      required: false,
      id: 'address',
      section: 'Communication',
    },
    {
      name: 'fk_createdBy',
      id: 'fk_createdBy',
      //reference: { id: 'createdBy', name: 'createdBy' },
      label: 'Created By',
      section: 'System Information',
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
    },
    {
      name: 'fk_updatedBy',
      //reference: { id: 'updatedBy', name: 'updatedBy' },
      label: 'Updated By',
      module: 'users',
      section: 'System Information',
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
    },
    {
      name: 'createdAt',
      label: 'Created On',
      id: 'createdAt',
      name: 'createdAt',
      section: 'System Information',
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
      }
    },
    {
      name: 'updatedAt',
      label: 'Updated On',
      id:'updatedAt',
      name:'updatedAt',
      section: 'System Information',
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
      }
    }
  ];
  return columns;
}