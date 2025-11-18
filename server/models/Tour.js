import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Tour description is required']
  },
  summary: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: [true, 'Tour duration is required'],
    min: [1, 'Duration must be at least 1 day']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Group size is required'],
    min: [1, 'Group size must be at least 1']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty must be easy, medium, or difficult'
    }
  },
  price: {
    type: Number,
    required: [true, 'Tour price is required'],
    min: [0, 'Price must be positive']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) must be below regular price'
    }
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  images: [{
    url: String,
    alt: String
  }],
  startDates: [Date],
  locations: [{
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String,
    day: Number
  }],
  guides: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  included: [String],
  excluded: [String],
  highlights: [String],
  category: {
    type: String,
    enum: ['safari', 'beach', 'mountain', 'cultural', 'adventure', 'luxury'],
    required: true
  },
  season: {
    type: String,
    enum: ['year-round', 'summer', 'winter', 'spring', 'autumn'],
    default: 'year-round'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

// Indexes for performance
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ startDates: 1 });
tourSchema.index({ locations: '2dsphere' });

const Tour = mongoose.models.Tour || mongoose.model('Tour', tourSchema);

export default Tour;