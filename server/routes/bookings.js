import express from 'express';
import {
  getAllBookings,
  getMyBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  getBookingStats,
} from '../controllers/bookingController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/my-bookings', getMyBookings);
router.get('/stats', restrictTo('admin', 'lead-guide'), getBookingStats);

router
  .route('/')
  .get(restrictTo('admin', 'lead-guide'), getAllBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .patch(restrictTo('admin', 'lead-guide'), updateBooking);

router.patch('/:id/cancel', cancelBooking);

export default router;
