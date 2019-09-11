'use strict';

const express = require('express'),
  router = express.Router(),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const routes = require('./routes/index.js');
app.use('/', routes(router));

// 404
app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route '+req.url+' not found.' });
});

// 500 - Any server error
app.use(function(err, req, res, next) {
  return res.status(500).send({ error: err.message });
});

app.listen(port);

module.exports = app;






