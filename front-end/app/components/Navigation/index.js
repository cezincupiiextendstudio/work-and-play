/**
 *
 * Navigation
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExtensionIcon from '@material-ui/icons/Extension';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import messages from './messages';

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

const Navigation = ({ children }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [auth, setAUth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const logout = () => {};
  const handleClose = () => {};

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const drawerOptions = [
    {
      text: 'Current sprint',
      link: '/sprint',
    },
    {
      text: 'Chat',
      link: '/chat',
    },
    {
      text: 'Achievements',
      link: '/achievements',
    },
  ];

  const drawerGeneralOptions = [
    {
      text: 'Team',
      link: '/team',
    },
    {
      text: 'Activities',
      link: '/activities',
    },
    {
      text: 'Dashboard',
      link: '/dashboard',
    },
  ];

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid container direction="column">
        <Grid item xs={12}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
          </List>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <List>
            {drawerOptions.map((value, index) => (
              <ListItem
                button
                key={value.text}
                component={Link}
                to={value.link}
              >
                <ListItemIcon>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {index % 3 === 0 ? (
                    <DonutLargeIcon />
                  ) : index % 3 === 1 ? (
                    <ChatIcon />
                  ) : (
                    <EmojiEventsIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={value.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <List>
            {drawerGeneralOptions.map((value, index) => (
              <ListItem
                button
                key={value.text}
                component={Link}
                to={value.link}
              >
                <ListItemIcon>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {index % 3 === 0 ? (
                    <ContactsIcon />
                  ) : index % 3 === 1 ? (
                    <ExtensionIcon />
                  ) : (
                    <DashboardIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={value.text} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Grid container justify="space-between">
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Work and play</Typography>

            <Drawer
              anchor="left"
              open={state.left}
              onClose={toggleDrawer('left', false)}
              className="drawer-container"
            >
              {list('left')}
            </Drawer>
          </Toolbar>
          {auth && (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
                className={classes.logoutButton}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          )}
        </Grid>
      </AppBar>


    </>
  );
};

Navigation.propTypes = {};

export default memo(Navigation);
