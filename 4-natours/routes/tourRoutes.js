/* eslint-disable prettier/prettier */
const express = require('express');
// const tourController = require('../controllers/tourController');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  alisTopTours,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require("./reviewRoutes");

const tourRouter = express.Router();

tourRouter.use('/:tourId/reviews', reviewRouter);

// tourRouter.route('/:tourId/reviews').post(protect, restrictTo, createReview);

tourRouter.route('/top-5-cheap').get(alisTopTours, getAllTours);
tourRouter.route('/tour-stats').get(getTourStats);
tourRouter.route('/monthly-plan/:year').get(protect, restrictTo('admin','lead-guide','guide'),getMonthlyPlan);

// tourRouter.param('id', checkId);

tourRouter.route('/')
  .get(protect, getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour)
    .delete(protect, restrictTo('admin','lead-guide'), deleteTour);

tourRouter.route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin','lead-guide'),updateTour)
  .delete(protect, restrictTo('admin','lead-guide'), deleteTour);
// .delete(tourController.deleteTour);


module.exports = tourRouter;
