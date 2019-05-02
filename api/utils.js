const config = require('./config'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

// helper for making 3rd-party GET requests
const getFrom = url => {
	return new Promise((resolve, reject) => {
		const lib = url.startsWith('https') ? require('https') : require('http');

		let req = lib.get(url, res => {
			if (res.statusCode < 200 || res.statusCode > 299){
				reject(new Error(`Request failed ${res.statusCode}`));
			}

			let body = [];

			res.on('data', data => { body.push(data) });
			res.on('end', () => { resolve(body.join('')) });
		});

		req.on('error', err => { reject(err) });
	});
}

// handling errors returned to client
exports.errorResponse = err => {
	return {
		error: true,
		message: err.message || err
	}
}

// user/auth helpers
exports.hashPw = password => {
	return bcrypt.hashSync(password, 12);
}

exports.comparePw = (a, b) => {
	return bcrypt.compareSync(a, b);
}

exports.getAccessToken = user => {
	return jwt.sign({id: user.id, username: user.username, exp: Math.floor(Date.now() / 1000) + (60*60)}, config.jwtSecret);
}

exports.getResetToken = user => {
	return jwt.sign({id: user.id, exp: Math.floor(Date.now() / 1000) + (24*60*60)}, config.jwtSecret);
}

exports.verifyAccessToken = token => {
	return jwt.verify(token, config.jwtSecret);
}

// google token verification 
exports.verifyGoogle = async (token) => {
	const { OAuth2Client } = require('google-auth-library');
	const googleClient = new OAuth2Client(config.google.clientID);

	const ticket = await googleClient.verifyIdToken({
		idToken: token,
		audience: config.google.clientID
	});

	const payload = ticket.getPayload();
	return payload;
}

// facebook identity verification, takes a user's access token
exports.verifyFacebook = async (token) => {
/* 
	// old method, can now just pass app ID and secret delimited with a pipe as the access token in the debug request
	let appUrl = 'https://graph.facebook.com/oauth/access_token';
	appUrl += `?client_id=${config.facebook.clientID}&client_secret=${config.facebook.secret}&grant_type=client_credentials`;

	const appResponse = JSON.parse(await getFrom(appUrl));
	const appToken = appResponse.access_token;

	let tokenUrl = 'https://graph.facebook.com/debug_token';
	tokenUrl += `?input_token=${token}&access_token=${appToken}`;
*/
	let tokenUrl = 'https://graph.facebook.com/debug_token';
	tokenUrl += `?input_token=${token}&access_token=${config.facebook.clientID}|${config.facebook.secret}`;

	const tokenResponse = JSON.parse(await getFrom(tokenUrl));

	return tokenResponse;
}