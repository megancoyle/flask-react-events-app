import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'event_title', label: 'Title', minWidth: 170 },
  { id: 'event_date', label: 'Date', minWidth: 100 },
  { 
    id: 'check_in_from',
    label: 'Check in from',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'check_in_to',
    label: 'Check in to',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'qualifications',
    label: 'Qualifications',
    minWidth: 200
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const EventTable = (props) => {
  const classes = useStyles();
  const events = props.events;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length > 0 && events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = item[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'event_date' ? moment(item.event_date).format('MM/DD/YYYY') : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={events.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EventTable;
