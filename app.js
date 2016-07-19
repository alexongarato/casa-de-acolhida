var express = require('express');
var path = require('path');
var api = require('./api');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

module.exports = app;