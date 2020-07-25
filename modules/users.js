import Moment from 'react-moment';
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
      subPrimary: true,
      required: false,
      id: 'id',
      section: 'System Information'
    },
    {
      name: 'fullName',
      label: 'Name',
      primary: true,
      options: {
        filter: true
      },
      type: 'Text',
      required: false,
      id: 'fullName',
      section: 'Basic Information'
    },
    {
      name: 'uname',
      label: 'Username',
      options: {
        filter: true,
        sort: false
      },
      type: 'Text',
      required: true,
      id: 'uname',
      section: 'Basic Information'
    },
    {
      name: 'password',
      label: 'Password',
      options: {
        filter: false,
        sort: false
      },
      type: 'Password',
      required: true,
      id: 'password',
      section: 'Basic Information'
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: true
      },
      type: 'Text',
      required: true,
      id: 'role',
      section: 'Basic Information'
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
      section: 'Basic Information'
    },
    {
      name: 'isAdmin',
      label: 'Administrator',
      options: {
        filter: true,
        customBodyRender: (value) => {
          return <div>{value ? 'True' : 'False'}</div>;
        }
      },
      type: 'Switch',
      required: false,
      id: 'isAdmin',
      data: [
        { label: '', value: '1' }
      ],
      section: 'Basic Information'
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
      id: 'updatedAt',
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