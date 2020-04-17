const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour Must Have a Name!'],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A Tour Mush Have a Duration!'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A Tour Mush Have a Group Size!'],
    },
    difficulty: {
      type: String,
      required: [true, 'A Tour Must have a Difficulty value !'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A Tour Must Have a Price!!'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A Tour Must Have a Description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A Tour Must Have a Cover Image!'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE runs before .save() and .create()
tourSchema.pre('save', function () {
  console.log(this);
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
