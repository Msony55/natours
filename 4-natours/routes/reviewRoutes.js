const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllReview,
  createReview,
} = require('../controllers/reviewController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route('/')
  .get(getAllReview)
  .post(protect, restrictTo('user'), createReview);

module.exports = reviewRouter;
