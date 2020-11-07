/**
 *
 * Achievement
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  redeem: {
    color: '#4caf50',
  },
  delete: {
    color: '#f50057',
  },
  cardPoints: {
    marginRight: '10px',
    color: theme.palette.primary.main,
  },
}));

function Achievement(props) {
  console.log('Ach props:', props);
  const classes = useStyles();
  const { title, content, image, points, className, isAchievement } = props;
  return (
    <div className={className}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        {!isAchievement && (
          <CardActions>
            <Tooltip title="Redeem">
              <Button
                disableRipple
                className={classes.redeem}
                size="medium"
                color="primary"
                startIcon={<CheckCircleIcon />}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                disableRipple
                size="medium"
                color="primary"
                className={classes.delete}
                startIcon={<HighlightOffIcon />}
              />
            </Tooltip>
            <Grid
              container
              justify="flex-end"
              alignItems="center"
              className={classes.cardPoints}
            >
              <StarIcon className={classes.star} fontSize="inherit" />
              {points}
            </Grid>
          </CardActions>
        )}
      </Card>
    </div>
  );
}

Achievement.propTypes = {};

export default memo(Achievement);
