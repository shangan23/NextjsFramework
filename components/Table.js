import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Toolbar from './Table/Toolbar';
import ToolbarSelectRows from './Table/ToolbarSelectRows';

const useStyles = makeStyles((theme) => ({
  empty: {
    height: theme.padding
  }
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

export default function RespTable(columns, list, module) {
  const classes = useStyles();

  module = columns['module'];
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
    customToolbar: () => {
      return (
        <Toolbar module={module} />
      );
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <ToolbarSelectRows selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows}  module={module} />
    ),
    onRowsDelete: (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data.map(d => list[d.dataIndex].id);
      console.log(idsToDelete);
    }
  };
  return (<Box width="100%">
    <MuiThemeProvider classNames={classes.empty} theme={getMuiTheme()}>
      <MUIDataTable
        title={'USERS'}
        data={list}
        columns={columns}
        options={options}
        height="100%"
      /></MuiThemeProvider>
  </Box>);
}



