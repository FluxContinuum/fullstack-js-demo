import React from 'react';
//import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { Divider, Grid, Typography } from '@material-ui/core';

const Home = (props) => {
	const frontEnd = ["React", "React Router", "Redux", "Redux Saga", "Material UI"];
	const backEnd = ["Node.js", "Express", "PostgreSQL", "PG-Promise", "PG-Monitor"];

//	const isSm = useMediaQuery('(min-width:600px)');

  return (
  	<Grid container direction="column" justify="center" alignItems="center" spacing={16} style={{margin: 0, width: '100%'}}>
  		<Grid item xs={8}>
		  	<Typography color="default" variant="h6" align="center">Welcome</Typography>
		  	<Divider variant="fullWidth" />
	  	</Grid>
  		<Grid item xs={8}>
		  	<Typography color="default" variant="body1" align="left">
		  		The goal of this publication is to convey an ability to architect a full stack, end-to-end solution implementing many standard patterns for React and Node.js.
		  		The app exposes a RESTful Express API over SSL using JSON web tokens for authentication and authorization, with a basic responsive interface from Google's material design specification.
		  		The source code includes implementations pulled from various private projects, ranging from naive to complete with best practices, aiming to illustrate an iterative and incremental development methodology.
		  		The source composition aims to demonstrate an appreciation for abstraction and separation of concerns, implementing some common patterns that help to avoid conflicts when collaborating with a team.
		  		While there are many third-party libraries integrated with both the front and back ends, the core technologies used are listed below:
		  	</Typography>
	  	</Grid>
	  	<Grid item container xs={8} justify="center">
	  		<Grid item xs={12} sm={4}>
	  			<Typography color="default" variant="h6" align="left">Front End</Typography>
		  		<ul>
		  			{ frontEnd.map((el, idx) => <Typography color="default" variant="body2" key={idx}><li> {el} </li></Typography>) }
		  		</ul>
		  	</Grid>
	  		<Grid item xs={12} sm={4}>
	  			<Typography color="default" variant="h6" align="left">Back End</Typography>
		  		<ul>
		  			{ backEnd.map((el, idx) => <Typography color="default" variant="body2" key={idx}><li> {el} </li></Typography>) }
		  		</ul>
		  	</Grid>
		  </Grid>
		  <Grid item xs={8}>
		  	<Typography color="default" variant="body2" align="center">
		  		This app is for demonstrative purposes and serves as a staging ground for developmental experimentation.
		  	</Typography>
		  </Grid>
  	</Grid>
  );
}

export default Home;
