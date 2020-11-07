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
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import StarIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useApi } from '../../utils/useApi';
import Task from '../../components/Task';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSprintPage from './selectors';

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
  table: {
    // minWidth: 500,
  },
  tableContainer: {
    margin: '15px',
  },
  Avatar: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  },
  form: {
    minWidth: 120,
  },
  stars: {
    marginRight: '5px',
    color: theme.palette.primary.main,
  },
}));

export function SprintPage() {
  const classes = useStyles();
  useInjectReducer({ key: 'sprintPage', reducer });
  useInjectSaga({ key: 'sprintPage', saga });
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [age, setAge] = React.useState('');
  const [statusColor, setStatusColor] = useState('');
  const onChange = value => {
    setAge(value.value);
    setStatusColor(value.id);
  };

  const [data, setData] = useState({});
  const [dataSprint, setDataSprint] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { ok, data, error } = await useApi({ url: 'sprint-details/3/' });
      console.log(ok, data, error);
      if (ok) {
        console.log('data: ', data);
        setData(data);
        setDataSprint(data.sprint_tasks);
      }
    }

    fetchData();
    console.log('data1: ', data);
  }, []);
  if (data) {
    console.log('DATA SPRINT:', dataSprint);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statusOp = [
    { id: 1, text: 'Not started', value: '', color: 'white' },
    { id: 2, text: 'Working on it', value: 10, color: 'orange' },
    { id: 3, text: 'Stuck', value: 20, color: 'red' },
    { id: 4, text: 'Done', value: 30, color: 'green' },
  ];

  const priorityOp = [
    { text: 'Low', value: '' },
    { text: 'Medium', value: '10' },
    { text: 'High', value: '15' },
    { text: 'Critical', value: '20' },
  ];

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
                {dataSprint ? (
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">User</TableCell>
                          <TableCell align="right">Priority</TableCell>
                          <TableCell align="right">Status</TableCell>
                          <TableCell align="right">Points</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataSprint.map(row => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">
                              {/* <Avatar src={row.user} /> */}
                              <img
                                src={row.user.user_profile.image}
                                className={classes.Avatar}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Select
                                className="status-container"
                                style={{ backgroundColor: statusColor }}
                                displayEmpty
                              >
                                <MenuItem value="">
                                  <em>select the value</em>
                                </MenuItem>
                                {priorityOp.map((value, index) => (
                                  <MenuItem
                                    value={value.value}
                                    onClick={() => {
                                      onChange(value);
                                    }}
                                  >
                                    {value.text}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell align="right">
                              <Select
                                className="status-container"
                                defaultValue="notstarted"
                                displayEmpty
                              >
                                {statusOp.map((value, index) => (
                                  <MenuItem
                                    value={value.value}
                                    onClick={() => {
                                      onChange(value);
                                    }}
                                  >
                                    {value.text}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell align="right">
                              <Grid
                                container
                                alignItems="center"
                                justify="flex-end"
                              >
                                <StarIcon className={classes.stars} />
                                {row.points}
                              </Grid>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <CircularProgress />
                )}
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
        {/* {data ? ( */}
        {/*  data.sprint_tasks.map(el => { */}
        {/*    <p>{el.description}</p>; */}
        {/*  }) */}
        {/* ) : ( */}
        {/*  <p>loading</p> */}
        {/* )} */}

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
