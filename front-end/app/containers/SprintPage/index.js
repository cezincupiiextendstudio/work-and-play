/**
 *
 * SprintPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import makeSelectSprintPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Task from '../../components/Task';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {

    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export function SprintPage() {
  const classes = useStyles();
  useInjectReducer({ key: 'sprintPage', reducer });
  useInjectSaga({ key: 'sprintPage', saga });

  return (
    <div>
      <Helmet>
        <title>SprintPage</title>
        <meta name="description" content="Description of SprintPage" />
      </Helmet>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Task />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

SprintPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sprintPage: makeSelectSprintPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SprintPage);
