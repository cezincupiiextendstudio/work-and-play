/**
 *
 * TeamPage
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
import makeSelectTeamPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function TeamPage() {
  useInjectReducer({ key: 'teamPage', reducer });
  useInjectSaga({ key: 'teamPage', saga });

  return (
    <div>
      <Helmet>
        <title>TeamPage</title>
        <meta name="description" content="Description of TeamPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TeamPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamPage: makeSelectTeamPage(),
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
)(TeamPage);
