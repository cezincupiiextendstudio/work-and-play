/**
 *
 * SprintPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeSelectSprintPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Task from '../../components/Task';
import { useApi } from '../../utils/useApi';

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalpaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: 'none',
  },
  modalContainer: {
    minWidth: '300px',
  },
  modalButton: {
    width: '100px',
    marginTop: '20px',
  },
}));

export function SprintPage() {
  const classes = useStyles();
  useInjectReducer({ key: 'sprintPage', reducer });
  useInjectSaga({ key: 'sprintPage', saga });
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(async () => {
    const response = await useApi('sprint-details/');
    console.log(response);
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Grid
              item
              container
              color="primary"
              alignItems="center"
              justify="center"
              xs={12}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={!!isDisabled}
                onClick={handleOpen}
              >
                Join team
              </Button>
            </Grid>
          </Grid>
        </Container>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.modalpaper}>
              <Grid
                container
                direction="column"
                className={classes.modalContainer}
                alignItems="center"
              >
                <Typography align="center">Password</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.modalButton}
                >
                  Submit
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>
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
