/**
 *
 * RecentTasks
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';

function createData(id, date, name, task, points) {
  return { id, date, name, task, points };
}

const rows = [
  createData(0, '16 Mar, 2019', 'John Doe', 'Dashboard component', '5'),
  createData(0, '16 Mar, 2019', 'John Doe', 'Dashboard component', '5'),
  createData(0, '16 Mar, 2019', 'John Doe', 'Dashboard component', '5'),
  createData(0, '16 Mar, 2019', 'John Doe', 'Dashboard component', '5'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  star: {
    marginRight: '5px',
    color: theme.palette.primary.main,
  },
}));

function RecentTasks() {
  const classes = useStyles();
  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Task</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.task}</TableCell>
              <TableCell align="right">
                <Grid container alignItems="center" justify="flex-end">
                  <StarIcon className={classes.star} />
                  {row.points}
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

RecentTasks.propTypes = {};

export default memo(RecentTasks);
