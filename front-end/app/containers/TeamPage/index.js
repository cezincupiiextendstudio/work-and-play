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
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeSelectTeamPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './index.scss';
import Achievement from '../../components/Achievement';

export function TeamPage() {
  useInjectReducer({ key: 'teamPage', reducer });
  useInjectSaga({ key: 'teamPage', saga });

  return (
    <div>
      <Helmet>
        <title>TeamPage</title>
        <meta name="description" content="Description of TeamPage" />
      </Helmet>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" className="team-typo">
            Your Team
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievement
            title="Cezin Cupii"
            content="CEO & 3rd year Cybernetics student"
            image="https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-9/67838654_2558883204143495_6230900525949255680_o.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_eui2=AeEZk5Q5xoulm0HAt3E9nJ-Ws6qldVFiSn6zqqV1UWJKftGSfLYoG5Bi4h7bqQTX3DOyAqtVcCvKhg5Q2MKnaD6g&_nc_ohc=50mWZqmIvHsAX_l-TOB&_nc_ht=scontent.fotp3-3.fna&oh=71516dd7adc598b67be0e68d138741f5&oe=5FCDB55C"
            className="team-card"
            isAchievement
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievement
            title="Catalin Atanase"
            content="CTO & 2nd year Cybernetics student"
            image="https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-9/116911028_3142949029133233_1656520571407094767_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGbmOc1wPiJGwqy-oUvIA8Y94R3Kz0bhc_3hHcrPRuFz940kWF56-J5Xd1TzZ72SfnjahC001IBdaBSlCIymn7G&_nc_ohc=NMHhezD-W3IAX_c_va-&_nc_ht=scontent.fotp3-3.fna&oh=ceeae15f2db1a4d4da50d095d5122614&oe=5FCB42B5"
            points={250}
            className="team-card"
            isAchievement
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievement
            title="Cebuc Catalin"
            content="CMO & 3rd year Cybernetics student "
            image="https://i.ibb.co/J7ZGSKT/56742578-2341362302569971-820500441874825216-o.jpg"
            points={250}
            className="team-card"
            isAchievement
          />
        </Grid>
      </Grid>
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
