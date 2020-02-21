import ResponsiveTable from 'material-ui-next-responsive-table';
export default function RespTable() {
  const columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Name',
      primary: true,
    },
    {
      key: 'authors',
      label: 'Author(s)',
      render: (value) => value.join(', '),
      primary: true,
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
