/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// Material UI

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import saga from './saga';
import reducer from './reducer';
import { makeSelectUsername } from './selectors';
import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';
import Navigation from '../../components/Navigation';
import { SprintPage } from '../SprintPage';
import { ChatPage } from '../ChatPage';
import { AchievementsPage } from '../AchievementsPage';
import { TeamPage } from '../TeamPage';
import { ActivitiesPage } from '../ActivitiesPage';
import { DashboardPage } from '../DashboardPage';

const key = 'home';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logoutButton: {
    marginRight: '10px',
  },
});

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  // Handlers

  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/sprint" component={SprintPage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/achievements" component={AchievementsPage} />
            <Route path="/team" component={TeamPage} />
            <Route path="/activities" component={ActivitiesPage} />
            <Route path="/dashboard" component={DashboardPage} />
          </Switch>
        </BrowserRouter>




    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
