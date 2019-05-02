const sql = require('../sql').users;

// repository pattern for use with pg-promise
class UsersRepository {
	constructor(db, pgp) {
		this.db = db;
		this.pgp = pgp;
	}

	checkIfExists(label, value) {
		return this.db.none(sql.getByIdentifier, [label, value])
			.catch(err => Promise.reject(new Error(`This ${label} is already in use`)));
	}

	getByIdentifier(label, value) {
		return this.db.one(sql.getByIdentifier, [label, value])
			.catch(err => Promise.reject(new Error('User not found')));
	}

	// params should contain {identifier, value, provider}
	getByProvider(params) {
		return this.db.one(sql.getByProvider, params)
			.catch(err => Promise.reject(new Error('User not found')));
	}

	// values should contain {email, username, password}
	insert(values) {
		return this.db.one(sql.insert, values)
			.catch(err => Promise.reject(new Error('Error creating new user')));
	}

	// values should contain {userId, identifier, provider}
	insertIdentity(values) {
		return this.db.one(sql.insertIdentity, values)
			.catch(err => Promise.reject(new Error('Unable to create identity')));
	}
}

module.exports = UsersRepository;