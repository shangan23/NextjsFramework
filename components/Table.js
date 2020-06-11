import MUIDataTable from 'mui-datatables';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
//import CustomToolbar from './TableToolbar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5.5),
    right: theme.spacing(2),
  },
}));

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiTypography: {
      h6: {
        fontSize: '1.2em'
      }
    }
  }
});

export default function RespTable(columns, list) {
  const classes = useStyles();
  list = columns['list'];
  columns = columns['columns'];
  let listCount = list.length;

  const options = {
    serverSide: true,
    filter: true,
    download: false,
    print: false,
    viewColumns: true,
    filterType: 'dropdown',
    search: false,
    selectToolbarPlacement: 'replace',
    count: listCount,
    fixedHeader: true,
    setTableProps: () => {
      return {
        padding: 'none',

        // material ui v4 only
        size: 'small',
      };
    },
    customToolbar: null,
    /*customToolbar: () => {
      return (
        <CustomToolbar />
      );
    }*/
  };
  return (<Box width="100%">
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={'USERS'}
        data={list}
        columns={columns}
        options={options}
        height="100%"
      /></MuiThemeProvider>
    <Fab href="/admin/users/create" color="primary" aria-label="add" className={classes.fab}>
      <AddIcon />
    </Fab></Box>);
}



