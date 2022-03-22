const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      maxlength: [100, 'maximum limit is 100 words'],
      minlength: [10, 'minimum limit is 10 words'],
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      required: [true, 'rating is required'],
      max: 5,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      require: [true, 'Review must belog to a tour'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true }, //???
    toObject: { virtuals: true }, //??
  }
);

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // });
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Reviews = mongoose.model('Reviews', reviewSchema);
module.exports = Reviews;
