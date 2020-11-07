/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import AboutPage from 'containers/AboutPage';
import GlobalStyle from '../../global-styles';
import { LoginPage } from '../LoginPage';
import { SprintPage } from '../SprintPage';
import { ChatPage } from '../ChatPage';
import { AchievementsPage } from '../AchievementsPage';
import { TeamPage } from '../TeamPage';
import { ActivitiesPage } from '../ActivitiesPage';
import { DashboardPage } from '../DashboardPage';
const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  height: 100vh;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/sprint" component={SprintPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/achievements" component={AchievementsPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/activities" component={ActivitiesPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
