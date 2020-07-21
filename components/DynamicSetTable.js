import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  TableCell: {
    fontSize: '0.82rem',
    padding: theme.spacing(1.8)
  },
  TableCellHead: {
    fontSize: '0.85rem',
    fontWeight: 500,
    padding: theme.spacing(1)
  }
}));

export default function DynamicSetTable(columns, list) {
  const classes = useStyles();
  let rows, value, dataValue, dataType;

  list = columns['list'];
  rows = list;
  columns = columns['columns'];

  return (
    <Paper className={classes.root} elevation={0} variant="elevation">
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.options.display != false && column.type != 'Action') {
                  return (
                    <TableCell
                      className={classes.TableCellHead}
                      key={Math.random()}
                      align={'center'}
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
                <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()} onClick={() => handleCellClick(index, rows[index])}>
                  {columns.map((col) => {
                    if (col.options.display != false) {
                      dataValue = rows[index][col.id];
                      if (dataValue instanceof Object) {
                        dataValue = rows[index][col.id].name
                      }
                      dataType = col.type;
                      dataValue = (col.fk) ? rows[index][col.id] : dataValue
                      value = (col.options.customBodyRender) ? col.options.customBodyRender(dataValue, rows[index]) : dataValue;
                      if (dataType != 'Action') {
                        return (
                          <TableCell className={classes.TableCell} key={Math.random()} align={'center'}>
                            {value}
                          </TableCell>
                        );
                      }
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
