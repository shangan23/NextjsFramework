import ResponsiveTable from 'material-ui-next-responsive-table';
export default function RespTable() {
  const columns = [
    {
      key: 'id',
      label: 'ID',
      primary: true,
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'authors',
      label: 'Author(s)',
      render: (value) => value.join(', ')
    },
  ];

  const data = [
    {
      id: '1234',
      name: 'Foo',
      authors: ['Andy'],
    },
    {
      id: '4567',
      name: 'Bar',
      authors: ['Joe', 'Mike'],
    },
    {
      id: '4567',
      name: 'Bar',
      authors: ['Joe', 'Mike'],
    },
    {
      id: '4567',
      name: 'Bar',
      authors: ['Joe', 'Mike'],
    },
    {
      id: '4567',
      name: 'Bar',
      authors: ['Joe', 'Mike'],
    },
    {
      id: '4567',
      name: 'Bar',
      authors: ['Joe', 'Mike'],
    },
    {
      id: '4567',
      name: 'Bar',
      authors: ['Joe', 'Mike'],
    },
    {
      id: '4567',
      name: 'Bar',
      authors: ['Joe', 'Mike'],
    }
  ];


  return (
    <div style={{ width: '100%' }}>
      <ResponsiveTable
        columns={columns}
        data={data}
        count={200}
        page={0}
        rowsPerPage={10}
        showPagination={true}
      />
    </div>
  );
}
