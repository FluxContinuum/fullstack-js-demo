const passport = require('passport'),
	db = require('../db'),
	{ comparePw } = require('../utils'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use('local',
	new LocalStrategy(function(username, password, done){
		db.users.getByIdentifier('username', username)
		.then(user => {
			const match = comparePw(password, user.password);

			if (!match){
				return done(null, false, { message: 'Incorrect password' });
			}

			return done(null, user);
		}).catch(err => {
			return done(null, false, { message: 'User not found' });
		});
	})
);

module.exports = passport;