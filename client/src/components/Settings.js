import React from 'react';
import Grid from '@material-ui/core/Grid';
import ThemeContainer from './containers/ThemeContainer';

const Settings = (props) => {
  return (
  	<Grid container
          direction="row"
          justify="center"
          alignItems="center">
	  	<Grid item xs={4}>
	    	<ThemeContainer />
	    </Grid>
	  </Grid>
  );
}

export default Settings;
