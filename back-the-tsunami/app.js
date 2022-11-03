const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const tsunamiRouter = require('./routes/tsunami');
const pluginsRouter = require('./routes/plugins');

const app = express();

// option de l'application express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(cors({
  origin: process.env.CORS
}));

// routage de l'API
app.use('/', indexRouter);
app.use('/tsunami', tsunamiRouter);
app.use('/plugins', pluginsRouter);

// Error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err);
  res.status(err.status || 500).send(err.msg);
});

module.exports = app;
