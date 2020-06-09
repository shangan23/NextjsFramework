import MUIDataTable from 'mui-datatables';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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
  columns = columns['columns'];
  let listCount = list.length;

  const options = {
    serverSide: true,
    filter: false,
    download:false,
    print:false,
    filterType: 'dropdown',
    search: false,
    count: listCount
  };
  return (<Box width="100%">
    <MUIDataTable
      title={'Users List'}
      data={list}
      columns={columns}
      options={options}
      height="100%"
    />
    <Fab href="/admin/users/create" color="primary" aria-label="add" className={classes.fab}>
      <AddIcon />
    </Fab></Box>);
}



