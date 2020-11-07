/**
 *
 * Points
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';
import './index.scss';

function createData(id, date, name, task, points) {
  return { id, date, name, task, points };
}

const data = [
  createData(0, '16 Mar, 2019', 'John Doe', 'Dashboard component', 5),
  createData(0, '16 Mar, 2019', 'John Doe', 'Dashboard component', 5),
  createData(0, '16 Mar, 2019', 'John Doe', 'Dashboard component', 5),
  createData(0, '16 Mar, 2019', 'John Doe', 'Dashboard component', 5),
];

const totalPoints = value =>
  value.reduce((total, arg) => total + arg.points, 0);

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  star: {
    marginRight: '5px',
    color: theme.palette.primary.main,
  },
}));
function preventDefault(event) {
  event.preventDefault();
}

function Points() {
  const classes = useStyles();
  return (
    <div>
      <Typography align="center" variant="h4">
        Total points
      </Typography>
      <Typography
        align="center"
        variant="h3"
        className="total-points-container"
      >
        <StarIcon className={classes.star} fontSize="inherit" />
        {totalPoints(data)}
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        className={classes.depositContext}
      >
        on 7 November, 2020
      </Typography>
      <div />
    </div>
  );
}

Points.propTypes = {};

export default memo(Points);
