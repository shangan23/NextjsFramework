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
      subPrimary:true,
      required: false,
      id: 'id',
      section: 'System Information'
    },
    {
      name: 'name',
      label: 'Name',
      primary:true,
      options: {
        filter: true
      },
      type: 'Text',
      required: false,
      id: 'name',
      section: 'Basic Information'
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
      section: 'Basic Information'
    },
    {
      name: 'contactMobile',
      label: 'Mobile',
      options: {
        filter: true,
        sort: false
      },
      type: 'Text',
      required: true,
      id: 'contactMobile',
      section: 'Communication'
    },
    {
      name: 'contactTelephone',
      label: 'Telephone',
      options: {
        filter: true
      },
      type: 'Text',
      required: true,
      id: 'contactTelephone',
      section: 'Communication'
    },
    {
      name: 'contactEmail',
      label: 'Email',
      options: {
        filter: true
      },
      type: 'Email',
      required: true,
      id: 'contactEmail',
      section: 'Communication'
    },
    {
      name: 'contactDesignation',
      label: 'Designation',
      options: {
        filter: true,
      },
      type: 'Text',
      required: false,
      id: 'contactDesignation',
      section: 'Basic Information'
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
      section: 'Communication'
    },
    {
      name: 'fk_createdBy',
      id: 'fk_createdBy',
      fk: true,
      label: 'Created By',
      module:'users',
      moduleField:'fullName',
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
      module:'users',
      moduleField:'fullName',
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
      id:'createdAt',
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
      id:'createdAt',
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