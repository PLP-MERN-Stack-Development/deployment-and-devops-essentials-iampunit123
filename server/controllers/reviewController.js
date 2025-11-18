import Review from '../models/Review.js';
import Tour from '../models/Tour.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter)
    .populate('user', 'name photo')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate('user', 'name photo')
    .populate('tour', 'name');

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  // Check if user has already reviewed this tour
  const existingReview = await Review.findOne({
    tour: req.body.tour,
    user: req.body.user
  });

  if (existingReview) {
    return next(new AppError('You have already reviewed this tour', 400));
  }

  // Check if user has booked this tour
  const Booking = (await import('../models/Booking.js')).default;
  const hasBooking = await Booking.findOne({
    tour: req.body.tour,
    user: req.body.user,
    status: 'completed'
  });

  if (!hasBooking && req.user.role !== 'admin') {
    return next(new AppError('You can only review tours you have completed', 400));
  }

  const newReview = await Review.create(req.body);

  await newReview.populate('user', 'name photo');

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Check if user owns the review or is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to update this review', 403));
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('user', 'name photo');

  res.status(200).json({
    status: 'success',
    data: {
      review: updatedReview
    }
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Check if user owns the review or is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to delete this review', 403));
  }

  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const markReviewHelpful = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  const userId = req.user.id;
  const hasMarkedHelpful = review.helpful.users.includes(userId);

  if (hasMarkedHelpful) {
    // Remove helpful mark
    review.helpful.users.pull(userId);
    review.helpful.count = Math.max(0, review.helpful.count - 1);
  } else {
    // Add helpful mark
    review.helpful.users.push(userId);
    review.helpful.count += 1;
  }

  await review.save();

  res.status(200).json({
    status: 'success',
    data: {
      review,
      action: hasMarkedHelpful ? 'removed' : 'added'
    }
  });
});

export const addReviewResponse = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Only admin or lead-guide can respond to reviews
  if (!['admin', 'lead-guide'].includes(req.user.role)) {
    return next(new AppError('You do not have permission to respond to reviews', 403));
  }

  review.response = {
    message: req.body.message,
    respondedBy: req.user.id,
    respondedAt: new Date()
  };

  await review.save();
  await review.populate('response.respondedBy', 'name');

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});