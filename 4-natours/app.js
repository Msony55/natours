const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middelware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //process data
app.use(express.static(`${__dirname}/public`)); //static data like image, html,png

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

// routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
