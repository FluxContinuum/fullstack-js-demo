const config = require('./config'),
	fs = require('fs'),
	db = require('./db'),
	https = require('https'),
	express = require('express'),
	cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
	morgan = require('morgan'),
	app = express(),
  authMiddleware = require('./auth'),
  users = require('./routes/users');

console.log(process.env.NODE_ENV+' environment started successfully');

if (process.env.NODE_ENV === 'development'){
	// in development, log to console
	app.use(morgan('dev'));
}else{
	// in production, log to file
	if (!fs.existsSync(config.logPath)){
		fs.mkdirSync(config.logPath, {recursive: true});
	}

	const logFileStream = fs.createWriteStream(`${config.logPath}`, {flags: 'a'});
	app.use(morgan('combined', {stream: logFileStream}));
}

// tell express how to parse requests
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// serve static files from react build
const clientRoot = './client/build';
app.use(express.static(clientRoot));

// force incoming traffic to SSL via middleware
app.use((req, res, next) => {
	if (!req.secure){
		return res.redirect(['https://', req.get('Host'), req.url].join(''));
	}
	next();
});

db.proc('version').then(res => {
	console.log('Successfully connected to ' + res.version);

	// configure routing
	app.get('/authtest', authMiddleware, (req, res) => {
		res.status(200).json('auth success');
	});
	
	app.use('/users', users);

	// catch all other requests not matching above paths
	app.get('*', (req, res) => {
		res.sendFile('index.html', { root: clientRoot });
	});

	// establish secure web server
	https.createServer({
		key: fs.readFileSync(config.sslKeyPath),
		cert: fs.readFileSync(config.sslCertPath),
		passphrase: config.sslPassphrase
	}, app).listen(config.port, () => {
		console.log('Listening on port ' + config.port);
	});
}).catch(err => {
	console.log('DB connection failed: ', err);
});