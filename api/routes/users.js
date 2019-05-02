const express = require('express'),
	db = require('../db'),
	mailer = require('../config/mailer'),
	{ errorResponse, comparePw, hashPw, getAccessToken, getResetToken, verifyGoogle, verifyFacebook } = require('../utils');

// TODO: transactionalize registration process on shared connection
// abstract to unify third-party provider process

const router = express.Router();

// Register new account
router.post('/register', 
	(req, res, next) => {
		req.body.username = req.body.username.trim();
		req.body.email = req.body.email.trim();

		db.users.checkIfExists('username', req.body.username)
		.then(() => db.users.checkIfExists('email', req.body.email))
		.then(next)
		.catch(err => res.status(400).json(errorResponse(err)));
	}, (req, res) => {
		req.body.password = hashPw(req.body.password);

		db.users.insert(req.body)
		.then(user => {
			// insert identity
			db.users.insertIdentity({
				userId: user.id,
				providerId: req.body.username,
				provider: 'fluxcontinuum'
			})
			.then(identity => {
		//	res.cookie('token', token, { httpOnly: true, secure: true });
				const token = getAccessToken(user);
				return res.status(200).json({ username: user.username, at: token });
			})
			.catch(err => res.status(400).json(errorResponse(err)));
		})
		.catch(err => res.status(400).json(errorResponse(err)));
	}
);

// Login existing account
router.post('/login',
	(req, res) => {
		db.users.getByProvider({
			providerId: req.body.username.trim(),
			provider: 'fluxcontinuum'
		})
		.then(user => {
			const match = comparePw(req.body.password, user.password);

			if (!match){
				return res.status(401).json(errorResponse('Incorrect login'));
			}

			const token = getAccessToken(user);
			return res.status(200).json({ username: user.username, at: token });
		})
		.catch(err => res.status(404).json(errorResponse(err)));
	}
);

router.post('/login/google', 
	(req, res, next) => {
		// verify google token and retrieve useful data
		verifyGoogle(req.body.idToken)
		.then(payload => {
			res.locals.providerId = payload.sub;
			res.locals.email = payload.email;
			res.locals.img = payload.picture;
			res.locals.name = payload.given_name;
			res.locals.username = `GU${payload.sub}`;
			next();
		})
		.catch(err => res.status(401).json(errorResponse('Invalid credentials')));
	}, (req, res, next) => {
		// login if this user already exists
		db.users.getByProvider({
			providerId: res.locals.providerId,
			provider: req.body.provider
		})
		.then(user => {
			const token = getAccessToken(user);
			return res.status(200).json({ username: res.locals.name, at: token, img: res.locals.img });
		})
		.catch(err => { next() });
	}, (req, res) => {
		// when user not found, try to insert
		db.users.checkIfExists('email', res.locals.email)
		.then(() => db.users.insert({
			email: res.locals.email,
			username: res.locals.username,
			password: null,
			provider: req.body.provider
		}))
		.then(user => {
			// insert identity
			db.users.insertIdentity({
				userId: user.id,
				providerId: res.locals.providerId,
				provider: req.body.provider
			})
			.then(identity => {
				const token = getAccessToken(user);
				return res.status(200).json({ username: res.locals.name, at: token, img: res.locals.img });
			})
			.catch(err => res.status(400).json(errorResponse(err)));
		})
		.catch(err => res.status(400).json(errorResponse(err)));
	}
);

router.post('/login/facebook', (req, res, next) => {
		verifyFacebook(req.body.token)
		.then(payload => {
			/* payload structure:
				{
					data: {
						app_id, type, application, data_access_expires_at, expires_at, is_valid, scopes, user_id
					}
				} */
			if (!payload.data.is_valid){
				throw new Error('Invalid token');
			}else{
				res.locals.providerId = payload.data.user_id;
				res.locals.username = `FBU${payload.data.user_id}`;
				next();
			}
		})
		.catch(err => res.status(401).json(errorResponse('Invalid credentials')));
	}, (req, res, next) => {
		// login if this user already exists
		db.users.getByProvider({
			providerId: res.locals.providerId,
			provider: req.body.provider
		})
		.then(user => {
			const token = getAccessToken(user);
			return res.status(200).json({ username: res.locals.username, at: token });
		})
		.catch(err => { next() });
	}, (req, res) => {
		// when user not found, try to insert
		db.users.checkIfExists('email', req.body.email)
		.then(() => db.users.insert({
			email: req.body.email,
			username: res.locals.username,
			password: null,
			provider: req.body.provider
		}))
		.then(user => {
			// insert identity
			db.users.insertIdentity({
				userId: user.id,
				providerId: res.locals.providerId,
				provider: req.body.provider
			})
			.then(identity => {
				const token = getAccessToken(user);
				return res.status(200).json({ username: res.locals.username, at: token });
			})
			.catch(err => res.status(400).json(errorResponse(err)));
		})
		.catch(err => res.status(400).json(errorResponse(err)));
	}
);

// Logout, render auth invalid on client
router.post('/logout',
	(req, res) => {
	//	res.clearCookie('token', { httpOnly: true, secure: true });
		return res.status(200).json(null);;
	}	
);

// Request password reset email
router.post('/resetpw',
	(req, res) => {
		req.body.email = req.body.email.trim();

		db.users.getByIdentifier('email', req.body.email)
		.then(user => {
			const token = getResetToken(user);

			const mail = {
				from: config.supportEmail,
				to: user.email,
				subject: 'Password Reset Request',
				text:
					`A password reset was requested for your account.\n\n`+
					`Visit this link to reset your password:\n\n`+
					`${req.hostname}/resetpw/${token}`+
					`This link will expire in 24 hours. If unused, your password will remain unchanged.`
			}
		}).catch(err => res.status(404).json(errorResponse(err)));
	}
);

// Reset password from token
router.get('/resetpw')

module.exports = router;