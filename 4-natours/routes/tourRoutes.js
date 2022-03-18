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

const tourRouter = express.Router();
tourRouter.route('/top-5-cheap')
  .get(alisTopTours, getAllTours);

tourRouter.route('/tour-stats').get(getTourStats);
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan);

// tourRouter.param('id', checkId);

tourRouter.route('/')
  .get(protect, getAllTours)
  .post(protect, createTour);

tourRouter.route('/:id')
  .get(getTour).patch(updateTour)
  .delete(protect, restrictTo('admin','lead-guide'), deleteTour);
// .delete(tourController.deleteTour);

module.exports = tourRouter;
