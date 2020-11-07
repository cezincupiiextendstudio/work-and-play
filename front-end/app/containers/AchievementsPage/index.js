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

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectAchievementsPage from './selectors';
import Achievement from '../../components/Achievement';
import AvatarImg from '../../images/avatar.png';
import './index.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cardGrid: {
    margin: '25px',
  },
  achievementText: {
    margin: '35px',
    fontFamily: 'sans-serif',
  },
});

export function AchievementsPage() {
  useInjectReducer({ key: 'achievementsPage', reducer });
  useInjectSaga({ key: 'achievementsPage', saga });

  const classes = useStyles();
  console.log(require('../../images/avatar.png'));
  return (
    <div>
      <Helmet>
        <title>AchievementsPage</title>
        <meta name="description" content="Description of AchievementsPage" />
      </Helmet>
      <Typography variant="h3" align="center" className="achievements-typo">
        ACHIEVEMENTS
      </Typography>
      <Grid
        container
        direction="row"
        spacing={3}
        justify="center"
        className={classes.cardGrid}
      >
        <Grid item xs={12} md={4}>
          <Achievement
            title="Safari"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat, sapien a lobortis gravida, nisi magna blandit mi, a venenatis velit neque id metus. Praesent et libero euismod, rhoncus dui et, volutpat diam. In hac habitasse platea dictumst. Duis eleifend dui congue metus ultrices, sit amet suscipit nisi suscipit."
            image="https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
            points={250}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievement
            title="Birthday party"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat, sapien a lobortis gravida, nisi magna blandit mi, a venenatis velit neque id metus. Praesent et libero euismod, rhoncus dui et, volutpat diam. In hac habitasse platea dictumst. Duis eleifend dui congue metus ultrices, sit amet suscipit nisi suscipit."
            image="https://rockymountevents.com/wp-content/uploads/2018/09/birthday_celebration.jpg"
            points={100}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievement
            title="Climbing"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat, sapien a lobortis gravida, nisi magna blandit mi, a venenatis velit neque id metus. Praesent et libero euismod, rhoncus dui et, volutpat diam. In hac habitasse platea dictumst. Duis eleifend dui congue metus ultrices, sit amet suscipit nisi suscipit."
            image="https://mountaintrip.com/wp-content/uploads/2017/08/IMG_0002-e1519067218755.jpg"
            points={125}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievement
            title="Salarial bonus"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat, sapien a lobortis gravida, nisi magna blandit mi, a venenatis velit neque id metus. Praesent et libero euismod, rhoncus dui et, volutpat diam. In hac habitasse platea dictumst. Duis eleifend dui congue metus ultrices, sit amet suscipit nisi suscipit."
            image="https://images.barrons.com/im-200212?width=1280&size=1.77777778"
            points={200}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievement
            title="Skydiving"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat, sapien a lobortis gravida, nisi magna blandit mi, a venenatis velit neque id metus. Praesent et libero euismod, rhoncus dui et, volutpat diam. In hac habitasse platea dictumst. Duis eleifend dui congue metus ultrices, sit amet suscipit nisi suscipit."
            image="https://checkyeti.imgix.net/images/optimized/tandem-skydive-from-3000m-in-split-skydiving-tandem-group.jpg"
            points={190}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievement
            title="Beach vacation"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat, sapien a lobortis gravida, nisi magna blandit mi, a venenatis velit neque id metus. Praesent et libero euismod, rhoncus dui et, volutpat diam. In hac habitasse platea dictumst. Duis eleifend dui congue metus ultrices, sit amet suscipit nisi suscipit."
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat, sapien a lobortis gravida, nisi magna blandit mi, a venenatis velit neque id metus. Praesent et libero euismod, rhoncus dui et, volutpat diam. In hac habitasse platea dictumst. Duis eleifend dui congue metus ultrices, sit amet suscipit nisi suscipit."
            image="https://pix10.agoda.net/hotelImages/301716/-1/fe9724d8fb4da3dd4590353bd771a276.jpg?s=1024x768"
            points={300}
          />
        </Grid>
      </Grid>
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
