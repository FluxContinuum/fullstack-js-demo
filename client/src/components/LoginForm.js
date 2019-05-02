import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerRequest, loginRequest } from '../actions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => {
	return {
    isLoading: state.isLoading,
    loggedIn: state.user ? true : false
  }
}

const mapDispatchToProps = {
	register: registerRequest,
	login: loginRequest
}

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      username: '',
			email: '',
			pw: '',
			confirmPw: '',
			btnDisabled: false,
			showConfirm: false,
      nameValid: true,
			emailValid: true,
			pwConfirmed: true,
			pwLongEnough: true
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.googleResponse = this.googleResponse.bind(this);
		this.facebookResponse = this.facebookResponse.bind(this);
    this.catchEnter = this.catchEnter.bind(this);
	}

	onInputChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			[name]: value
		});
	}

	handleLogin() {
		if (this.props.isLoading){
			return false;
		}

		this.setState({
      nameValid: this.state.username.length > 2 ? true : false,
			btnDisabled: true
		}, function(){
			if (this.state.nameValid){
				this.props.login({
					username: this.state.username, 
					password: this.state.pw
				});
			}

			this.setState({
				btnDisabled: false
			});
		});
	}

	handleRegister() {
		if (!this.state.showConfirm){
			this.setState({ showConfirm: true });
			return false;
		}

		if (this.props.isLoading){
			return false;
		}

		this.setState({
      nameValid: this.state.username.length > 2 ? true : false,
			emailValid: this.state.email.length > 4 ? true : false,
			pwLongEnough: this.state.pw.length > 4 ? true : false,
			pwConfirmed: this.state.pw === this.state.confirmPw ? true : false,
			btnDisabled: true
		}, function(){
			if (this.state.nameValid && this.state.emailValid && this.state.pwLongEnough && this.state.pwConfirmed){
				this.props.register({
          username: this.state.username,
					email: this.state.email, 
					password: this.state.pw
				});
			}

			this.setState({
				btnDisabled: false
			});
		});
	}

  catchEnter(e) {
    if (e.key === 'Enter'){
      if (this.state.showConfirm){
        this.handleRegister();
      }else{
        this.handleLogin();
      }

      e.preventDefault();
    }
  }

  googleResponse(res) {
  	if (res.error){
  		return false;
  	}

  	this.props.login({
			provider: 'google',
			idToken: res.getAuthResponse().id_token
		});
  }

  facebookResponse(res) {
  	if (!res.accessToken){
  		return false;
  	}

  	this.props.login({
  		provider: 'facebook',
  		token: res.accessToken,
  		email: res.email
  	});
  }

	render() {
    if (this.props.loggedIn){
      return (<Redirect to="/" />);
    }
    
		return (
			<div onKeyPress={this.catchEnter}>
				<Grid container
	        direction="row"
	        justify="center"
	        alignItems="center">
					<Grid item container xs={8}>
						<Grid item container direction="column" spacing={16}>
		        	<Grid item>
			          <TextField
			          	fullWidth
			          	label="Username"
			          	error={!this.state.nameValid}
			            helperText={this.state.nameValid ? '' : 'Must be at least 3 characters'}
			            name="username"
			            value={this.state.username}
			            onChange={this.onInputChange} />
							</Grid>
		        	<Grid item>
								<TextField
									fullWidth
									label="Password"
									error={!this.state.pwLongEnough}
									helperText={this.state.pwLongEnough ? '' : 'Must be at least 5 characters'}
									type="password"
									name="pw"
									value={this.state.pw}
									onChange={this.onInputChange} />
							</Grid>

						{
							this.state.showConfirm ? 
							<React.Fragment>
								<Grid item>
									<TextField
										fullWidth
										label="Email"
										error={!this.state.emailValid}
										helperText={this.state.emailValid ? '' : 'Required'}
										name="email"
										value={this.state.email}
										onChange={this.onInputChange} />
								</Grid>
								<Grid item>
									<TextField
										fullWidth
										label="Confirm Password"
										error={!this.state.pwConfirmed}
										helperText={this.state.pwConfirmed ? '' : 'Passwords do not match'}
										type="password"
										name="confirmPw"
										value={this.state.confirmPw}
										onChange={this.onInputChange} />
								</Grid>
								<Grid item>
									<FormButton label="Submit" color="secondary" disabled={this.state.btnDisabled} onClick={this.handleRegister} /> 
								</Grid>
								<Grid item>
									<FormButton label="Cancel" color="primary" disabled={this.state.btnDisabled} onClick={() => this.setState({ showConfirm: false })} /> 
								</Grid>
							</React.Fragment>
							:
							<React.Fragment>
								<Grid item>
									<FormButton label="Login" color="primary" disabled={this.state.btnDisabled} onClick={this.handleLogin} /> 
								</Grid>
								<Grid item>
									<FormButton label="Register" color="secondary" disabled={this.state.btnDisabled} onClick={this.handleRegister} /> 
								</Grid>
							</React.Fragment>
						}

							<Grid item container direction="row" justify="space-evenly" alignItems="center">
								<Grid item>
									<GoogleLogin
										clientId="704507078769-0mnmq17o32phb72rbllki1vfmlpnq73i.apps.googleusercontent.com"
										buttonText=""
										render={renderProps => (
											<IconButton onClick={renderProps.onClick}>
												<SvgIcon>
													<path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
												</SvgIcon>
											</IconButton>
										)}
										redirectUri="https://localhost:3001/login/google"
										resonseType="code"
										onSuccess={this.googleResponse}
										onFailure={this.googleResponse} />
								</Grid>

								<Grid item>
									<FacebookLogin
								    appId="2053503474745011"
								    textButton=""
										render={renderProps => (
											<IconButton onClick={renderProps.onClick}>
												<SvgIcon>
													<path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
												</SvgIcon>
											</IconButton>
										)}
								    fields="name,email,picture"
								    callback={this.facebookResponse} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const FormButton = props => {
	return (
		<Button fullWidth variant="contained"
			color={props.color}
			disabled={props.disabled}
			onClick={props.onClick} >
			{props.label}
		</Button>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
