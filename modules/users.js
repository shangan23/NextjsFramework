module.exports = {
  columns: [
    {
      name: 'fullName',
      label:'Name',
      options: {
        filter: true
      }
    },
    {
      name: 'uname',
      label:'Username',
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: 'password',
      label:'Password',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'email',
      label:'Email',
      options: {
        filter: true
      }
    },
    {
      name: 'createdAt',
      label:'Created On',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'updatedAt',
      label:'Updated On',
      options: {
        filter: true,
        sort: false
      }
    }
  ]
};