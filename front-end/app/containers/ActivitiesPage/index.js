/**
 *
 * ActivitiesPage
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
import makeSelectActivitiesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ActivitiesPage() {
  useInjectReducer({ key: 'activitiesPage', reducer });
  useInjectSaga({ key: 'activitiesPage', saga });

  return (
    <div>
      <Helmet>
        <title>ActivitiesPage</title>
        <meta name="description" content="Description of ActivitiesPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ActivitiesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activitiesPage: makeSelectActivitiesPage(),
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
)(ActivitiesPage);
