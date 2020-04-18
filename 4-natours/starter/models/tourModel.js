const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour Must Have a Name!'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A Tour name must have less than or equal to 40 characters',
      ],
      minlength: [
        10,
        'A Tour name must have more than or equal to 10 characters',
      ],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy , medium , difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A Tour Must Have a Price!!'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // The this keyword will only work when creating a new document
          return val < this.price;
        },
        message: 'Discount Price ({VALUE}) Should be Below the Regular Price!!',
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
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
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will Save Document !!');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  // tourSchema.pre('find', function (next) {
  this.find({
    secretTour: { $ne: true },
  });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`The Query Took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
