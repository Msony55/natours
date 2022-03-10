const express = require('express');
// const tourController = require('../controllers/tourController');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const tourRouter = express.Router();

// tourRouter.param('id', checkId);

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
// .delete(tourController.deleteTour);

module.exports = tourRouter;
