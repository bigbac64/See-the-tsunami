const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const tsunamiRouter = require('./routes/tsunami');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: '*'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tsunami', tsunamiRouter);

// Error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err);
  res.status(err.status || 500).send(err.msg);
});

module.exports = app;
