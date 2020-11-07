/**
 *
 * Task
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { Select } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';
import AvatarPng from '../../images/avatar.png';

import './index.scss';

function createData(name, user, priority, status, points) {
  return { name, user, priority, status, points };
}

const rows = [
  createData(
    'Implement UI',
    '../../images/avatar.png',
    'high',
    'Working on it',
    1,
  ),
  createData(
    'Implement UI',
    '../images/avatar.png',
    'high',
    'Working on it',
    2,
  ),
  createData(
    'Implement UI',
    '../images/avatar.png',
    'high',
    'Working on it',
    3,
  ),
  createData(
    'Implement UI',
    '../images/avatar.png',
    'high',
    'Working on it',
    4,
  ),
  createData(
    'Implement UI',
    '../images/avatar.png',
    'high',
    'Working on it',
    5,
  ),
];

console.log(rows);

const useStyles = makeStyles(theme => ({
  table: {
    // minWidth: 500,
  },
  tableContainer: {
    margin: '15px',
  },
  Avatar: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  },
  form: {
    minWidth: 120,
  },
  stars: {
    marginRight: '5px',
    color: theme.palette.primary.main,
  },
}));

const statusOp = [
  { id: 1, text: 'Not started', value: 'none', color: 'white' },
  { id: 2, text: 'Working on it', value: 'working', color: 'orange' },
  { id: 3, text: 'Stuck', value: 'stuck', color: 'red' },
  { id: 4, text: 'Done', value: 'done', color: 'green' },
];

const priorityOp = [
  { text: 'Low', value: 'low' },
  { text: 'Medium', value: 'medium' },
  { text: 'High', value: 'high' },
  { text: 'Critical', value: 'critical' },
];

function Task() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [statusColor, setStatusColor] = useState('');
  const onChange = value => {
    setAge(value.value);
    setStatusColor(value.id);
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {/* <Avatar src={row.user} /> */}
                  <img src={AvatarPng} className={classes.Avatar} />
                </TableCell>
                <TableCell align="right">
                  <Select className="status-container">
                    {priorityOp.map((value, index) => (
                      <MenuItem
                        value={value.value}
                        onClick={() => {
                          onChange(value);
                        }}
                      >
                        {value.text}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Select className="status-container">
                    {statusOp.map((value, index) => (
                      <MenuItem
                        value={value.value}
                        onClick={() => {
                          onChange(value);
                        }}
                      >
                        {value.text}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Grid container alignItems="center" justify="flex-end">
                    <StarIcon className={classes.stars} />
                    {row.points}
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

Task.propTypes = {};

export default memo(Task);
