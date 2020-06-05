import ResponsiveTable from 'material-ui-next-responsive-table';
export default function RespTable(columns,list) {
  list = columns['list'];
  let listCount = list.length;
  return (
    <div style={{ width: '100%' }}>
      <ResponsiveTable
        columns={columns['columns']}
        data={list}
        count={listCount}
        page={0}
        rowsPerPage={5}
        showPagination={true}
      />
    </div>
  );
}
