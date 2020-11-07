/**
 *
 * AchievementsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAchievementsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function AchievementsPage() {
  useInjectReducer({ key: 'achievementsPage', reducer });
  useInjectSaga({ key: 'achievementsPage', saga });

  return (
    <div>
      <Helmet>
        <title>AchievementsPage</title>
        <meta name="description" content="Description of AchievementsPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AchievementsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  achievementsPage: makeSelectAchievementsPage(),
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
)(AchievementsPage);
