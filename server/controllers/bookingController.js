import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendBookingConfirmation } from '../utils/email.js';

export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate('tour', 'name price duration')
    .populate('user', 'name email');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});

export const getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('tour')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});

export const getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate('tour')
    .populate('user', 'name email phone');

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Check if user owns the booking or is admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to view this booking', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

export const createBooking = catchAsync(async (req, res, next) => {
  const { tourId, startDate, participants, specialRequirements, emergencyContact } = req.body;

  // Get tour and check availability
  const tour = await Tour.findById(tourId);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  // Create booking
  const booking = await Booking.create({
    tour: tourId,
    user: req.user.id,
    price: tour.price,
    startDate,
    participants,
    specialRequirements,
    emergencyContact,
    status: 'confirmed'
  });

  // Populate the booking for response
  await booking.populate('tour');
  await booking.populate('user', 'name email');

  // Send confirmation email
  try {
    await sendBookingConfirmation(booking, req.user);
  } catch (emailError) {
    console.error('Failed to send confirmation email:', emailError);
  }

  res.status(201).json({
    status: 'success',
    data: {
      booking
    }
  });
});

export const updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('tour').populate('user', 'name email');

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

export const cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Check if user owns the booking
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to cancel this booking', 403));
  }

  // Check if booking can be cancelled (e.g., not too close to start date)
  const daysUntilTour = Math.ceil((booking.startDate - new Date()) / (1000 * 60 * 60 * 24));
  if (daysUntilTour < 7) {
    return next(new AppError('Bookings can only be cancelled at least 7 days before the tour start date', 400));
  }

  booking.status = 'cancelled';
  await booking.save();

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

export const getBookingStats = catchAsync(async (req, res, next) => {
  const stats = await Booking.aggregate([
    {
      $match: { status: 'confirmed' }
    },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        totalRevenue: { $sum: '$totalAmount' },
        avgBookingValue: { $avg: '$totalAmount' }
      }
    }
  ]);

  const monthlyStats = await Booking.aggregate([
    {
      $match: { 
        status: 'confirmed',
        createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        bookings: { $sum: 1 },
        revenue: { $sum: '$totalAmount' }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      overview: stats[0] || { totalBookings: 0, totalRevenue: 0, avgBookingValue: 0 },
      monthlyStats
    }
  });
});