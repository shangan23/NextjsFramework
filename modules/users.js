module.exports = {
  columns: [
    {
      name: 'fullName',
      label: 'Name',
      options: {
        filter: true
      },
      type: 'Text',
      required: false,
      id: 'fullName',
    },
    {
      name: 'uname',
      label: 'Username',
      options: {
        filter: false,
        sort: false
      },
      type: 'Text',
      required: true,
      id: 'uname',
    },
    {
      name: 'password',
      label: 'Password',
      options: {
        filter: true,
        sort: false
      },
      type: 'Password',
      required: true,
      id: 'password',
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
      name: 'isAdmin',
      label: 'Is Administrator?',
      options: {
        filter: true
      },
      type: 'Switch',
      required: false,
      id: 'isAdmin',
      data:[
        { label: '', value: '1' }
      ]
    },
    {
      name: 'createdAt',
      label: 'Created On',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'updatedAt',
      label: 'Updated On',
      options: {
        filter: true,
        sort: false
      }
    }
  ]
};