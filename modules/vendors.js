import Moment from 'react-moment';
import CellEdit from '../components/Table/CellEdit';
export default function columns(module, settings) {
  let columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        display: 'excluded',
      },
      type: 'Text',
      required: false,
      id: 'id',
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true
      },
      type: 'Text',
      required: false,
      id: 'name',
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
    },
    {
      name: 'mobile',
      label: 'Mobile',
      options: {
        filter: true,
        sort: false
      },
      type: 'Text',
      required: true,
      id: 'mobile',
    },
    {
      name: 'telephone',
      label: 'Telephone',
      options: {
        filter: true
      },
      type: 'Text',
      required: true,
      id: 'telephone',
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
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: false,
       // display: 'excluded',
      },
      type: 'TextArea',
      required: false,
      id: 'address',
    },
    {
      name: 'fk_createdBy',
      id: 'fk_createdBy',
      //reference: { id: 'createdBy', name: 'createdBy' },
      label: 'Created By',
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
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          return (
            <CellEdit module={module} cellData={tableMeta} />
          );
        }
      }
    },
  ];
  return columns;
}