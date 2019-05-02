const { errorResponse, getAccessToken, verifyAccessToken } = require('./utils');

const verifyToken = (req, res, next) => {
//	const { token } = req.cookies;

	const { authorization } = req.headers;
	
	if (!authorization){
		return res.status(401).json(errorResponse('Missing credentials'));
	}

	// attempt to decode the user token and attach it to the response object for this request
	try {
		const token = authorization.split(' ')[1];
		const decoded = verifyAccessToken(token);
		res.locals.auth = decoded;
		next();
	} catch(err) {
		return res.status(403).json(errorResponse('Invalid credentials'));
	}
}

module.exports = verifyToken;