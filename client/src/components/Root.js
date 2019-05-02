import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { apiRequest, logout, toggleLeftNav } from '../actions';
import { Route, withRouter, Link } from 'react-router-dom';

import { CssBaseline, Typography, CircularProgress, AppBar, Toolbar, Button, IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import LeftNavDrawer from './LeftNavDrawer';
import LoginForm from './LoginForm';
import Home from './Home';
import Settings from './Settings';
import ErrorSnackbar from './ErrorSnackbar';

const mapStateToProps = (state) => ( state );

const mapDispatchToProps = {
  apiRequest,
  logout,
  toggleLeftNav
}

const Root = (props) => {

  const theme = createMuiTheme({ palette: {type: props.theme}, typography: {useNextVariants: true} });

  return (
    <MuiThemeProvider theme={ theme }>
      <CssBaseline />
      <AppBar position="static" style={{marginBottom: '1em'}}>
        <Toolbar>
          <IconButton color="inherit" onClick={props.toggleLeftNav}>
            <MenuIcon />
          </IconButton>
          <LeftNavDrawer />
          <Typography color="inherit" variant="h6" className="flexGrow" align="center"> Flux Continuum </Typography>
          {
            props.user ?
            (<Button color="inherit" onClick={props.logout} > Logout </Button>)
            :
            (<Button color="inherit" component={props => <Link to="/login" {...props} />}> Login </Button>)
          }
        </Toolbar>
      </AppBar>
      {
        props.isLoading &&
        <div className="data-loading-container">
          <CircularProgress color="primary" variant="indeterminate" />
        </div>
      }

      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginForm} />
      <Route path="/settings" component={Settings} />
      <ErrorSnackbar />
    </MuiThemeProvider>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
