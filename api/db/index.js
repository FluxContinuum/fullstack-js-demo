const config = require('../config').db,
	repos = require('./repos');

// pg-promise initialization options
const initOpts = {
	extend(obj, dc) {
		//	dc (Database Context) is useful when extending multiple databases with different access APIs
		//	Do not use require() here
		obj.users = new repos.Users(obj, pgp);
	}
}

const pgp = require('pg-promise')(initOpts);
const db = pgp(config);

// Load and initialize diagnostics
const diagnostics = require('./diagnostics');
diagnostics.init(initOpts);

// If need access to the library's root (pgp object), do it via db.$config.pgp
module.exports = db;