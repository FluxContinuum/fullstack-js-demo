const nodemailer = require('nodemailer');

const options = {
	host: 'smtp-relay.gmail.com',
	port: 587
}

const transporter = nodemailer.createTransport(options);

module.exports = transporter;