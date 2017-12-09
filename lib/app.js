const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sendEmailController = require('./controllers/sendEmail');

const STATIC_DIR_PATH = path.join(__dirname, '../static');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/email', sendEmailController);

// statics
app.use(express.static(STATIC_DIR_PATH));
app.all('*', (req, res) => res.sendFile(path.join(STATIC_DIR_PATH, 'index.html')));

module.exports = app;
