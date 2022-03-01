var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const firstVersionRoute = require('./api/Routes/V1');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/v1', firstVersionRoute);
app.use(async (request, response, next) =>
  next(Error('Internet Server Error'))
);
app.use(async (err, request, response, next) => {
  response.status(err['status'] || 500).send({
    code: err['status'] || 500,
    status: err['name'] || 'Internal Server Error',
    message: err.message,
  });
});
module.exports = app;
