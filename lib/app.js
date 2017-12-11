const path = require('path');

const express = require('express');

const STATIC_DIR_PATH = path.join(__dirname, '../static');

const app = express();

app.use(express.static(STATIC_DIR_PATH));
app.get('/pm/:hash', require('./controllers/personalisedController'));
app.all('*', (req, res) => res.sendFile(path.join(STATIC_DIR_PATH, 'index.html')));

module.exports = app;
