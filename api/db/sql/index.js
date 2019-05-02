const QueryFile = require('pg-promise').QueryFile,
	path = require('path');

// parse stand-alone SQL files for use with pg-promise
const sql = file => {
	const filePath = path.join(__dirname, file);
	const options = {
		minify: true,

		// static pre-formatting parameters
/*	params: {
			schema: 'public' // replaces ${schema~} with public
		}
		*/
	}

	const qf = new QueryFile(filePath, options);
	
	if (qf.error){
		console.log('QueryFile error: ', qf.error);
	}

	return qf;
}

module.exports = {
	users: {
		insert: sql('users/insert.sql'),
		insertIdentity: sql('users/insertIdentity.sql'),
		getByIdentifier: sql('users/getByIdentifier.sql'),
		getByProvider: sql('users/getByProvider.sql')
	},
  maps: {
    query: sql('maps/query.sql'),
    getGeoJSON: sql('maps/getGeoJSON.sql'),
    categories: sql('maps/categories.sql')
  }
}
