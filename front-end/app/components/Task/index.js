/**
 *
 * Task
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import AvatarPng from '../../images/avatar.png';

import './index.scss';
import { useApi } from '../../utils/useApi';

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
  { id: 1, text: 'Not started', value: '', color: 'white' },
  { id: 2, text: 'Working on it', value: 10, color: 'orange' },
  { id: 3, text: 'Stuck', value: 20, color: 'red' },
  { id: 4, text: 'Done', value: 30, color: 'green' },
];

const priorityOp = [
  { text: 'Low', value: '' },
  { text: 'Medium', value: '10' },
  { text: 'High', value: '15' },
  { text: 'Critical', value: '20' },
];

function Task() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [statusColor, setStatusColor] = useState('');
  const onChange = value => {
    setAge(value.value);
    setStatusColor(value.id);
  };

  const [data, setData] = useState({});
  const [dataSprint, setDataSprint] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { ok, data, error } = await useApi({ url: 'sprint-details/1/' });
      console.log(ok, data, error);
      if (ok) {
        console.log('data: ', data);
        setData(data);
        setDataSprint(data.sprint_tasks);
      }
    }

    fetchData();
    console.log('data1: ', data);
  }, []);
  if (data) {
    console.log('DATA SPRINT TASK:', dataSprint);
  }
  console.log('PRIORITY OP:', priorityOp);

  return (
    <>
      {dataSprint ? (
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
              {dataSprint.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {/* <Avatar src={row.user} /> */}
                    <img
                      src={row.user.user_profile.image}
                      className={classes.Avatar}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Select
                      className="status-container"
                      style={{ backgroundColor: statusColor }}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>select the value</em>
                      </MenuItem>
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
                    <Select
                      className="status-container"
                      defaultValue="notstarted"
                      displayEmpty
                    >
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
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

Task.propTypes = {};

export default memo(Task);
