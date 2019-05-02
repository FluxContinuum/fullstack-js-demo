import React from 'react';
import { connect } from 'react-redux';
import { toggleLeftNav } from '../actions';
import { CloseRounded, HomeRounded, SettingsRounded } from '@material-ui/icons';
import { Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
  open: state.leftNav
});

const mapDispatchToProps = {
  toggleLeftNav: toggleLeftNav
}

const LeftNavDrawer = ({ open, toggleLeftNav }) => {
  const navLinks = [
    {text: "Home", path: "/", icon: <HomeRounded />},
    {text: "Settings", path: "/settings", icon: <SettingsRounded />}
  ].map((item, index) => {
    return (
      <Link to={item.path} key={item.path}>
        <ListItem button>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      </Link>
    );
  });

  const drawer = (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <IconButton onClick={toggleLeftNav}>
            <CloseRounded />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center" style={{marginRight: '1em'}}> Flux Continuum </Typography>
        </Grid>
      </Grid>
      <Divider />
      <List component="nav">
        {navLinks}
      </List>
    </div>
  );

  return (
    <Drawer open={open} ModalProps={{onBackdropClick: toggleLeftNav}}>
      {drawer}
    </Drawer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavDrawer);