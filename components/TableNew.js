import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { RecordsPerPage } from '../config';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: theme.spacing(63.5),
    minHeight: theme.spacing(63.5),
  },
  TableCell: {
    fontSize: '0.85rem',
    padding:theme.spacing(1)
    //paddingTop: theme.spacing(0.5),
    //paddingRight: theme.spacing(1),
    //paddingLeft: theme.spacing(3)
  },
  TableCellHead: {
    fontSize: '0.85rem',
    fontWeight: 500,
    padding:theme.spacing(1)
    //paddingTop: theme.spacing(0.5),
    //paddingRight: theme.spacing(0),
    //paddingLeft: theme.spacing(3)
  }
}));

export default function RespTable(columns, list, module) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(RecordsPerPage);
  let rows, listCount, navigatePage, limit, value, dataValue;
  module = columns['module'];

  list = columns['list'].rows;
  rows = list;
  listCount = columns['list'].count;
  columns = columns['columns'];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    navigatePage = (Router.router.query.limit) ? `?limit=${Router.router.query.limit}&page=${newPage}` : `?limit=${RecordsPerPage}&page=${newPage}`;
    Router.push(`${Router.router.route}${navigatePage}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    limit = `?limit=${+event.target.value}&page=0`;
    Router.push(`${Router.router.route}${limit}`);
  };

  return (
    <Paper className={classes.root} elevation={0} variant="outlined">
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.options.display != false) {
                  return (
                    <TableCell
                      className={classes.TableCellHead}
                      key={Math.random()}
                      align={'left'}
                    //style={{ minWidth: 170 }}
                    >
                      {column.label}
                    </TableCell>
                  )
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()}>
                  {columns.map((col) => {
                    if (col.options.display != false) {
                      dataValue = rows[index][col.id];
                      dataValue = (col.fk) ? rows[index][col.id] : dataValue
                      value = (col.options.customBodyRender) ? col.options.customBodyRender(dataValue,rows[index]) : dataValue;
                      return (
                        <TableCell className={classes.TableCell} key={Math.random()} align={'left'}>
                          {value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={listCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
