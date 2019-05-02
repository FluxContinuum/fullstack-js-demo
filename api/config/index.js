require('dotenv').config();

// these variables must be defined in a .env file at the api project root
const environment = {
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	},
	facebook: {
		clientID: process.env.FACEBOOK_CLIENT_ID,
		secret: process.env.FACEBOOK_SECRET
	},
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		secret: process.env.GOOGLE_SECRET
	},
	jwtSecret: process.env.JWT_SECRET,
	port: process.env.PORT,
	sslPassphrase: process.env.SSL_PASSPHRASE,
	supportEmail: process.env.SUPPORT_EMAIL,
}

const config = {
	...environment,
	logPath: './logs/http/log.txt',
	sslKeyPath: './ssl/key.pem',
	sslCertPath: './ssl/cert.pem'
}

module.exports = config;