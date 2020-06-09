import ResponsiveTable from 'material-ui-next-responsive-table';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function RespTable(columns, list) {
  const classes = useStyles();
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
        aria-label="a dense table"
      />
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}
