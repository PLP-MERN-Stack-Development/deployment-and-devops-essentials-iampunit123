import express from 'express';
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  getFeaturedTours,
} from '../controllers/tourController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { uploadTourImages, handleCloudinaryUpload } from '../middleware/upload.js';

// Import review router
import reviewRouter from './reviews.js';

const router = express.Router();

// Nested routes for reviews
router.use('/:tourId/reviews', reviewRouter);

// Public routes
router.get('/featured', getFeaturedTours);
router.get('/stats', getTourStats);
router.get('/monthly-plan/:year', getMonthlyPlan);
router.get('/tours-within/:distance/center/:latlng/unit/:unit', getToursWithin);
router.get('/distances/:latlng/unit/:unit', getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    handleCloudinaryUpload,
    updateTour
  )
  .delete(protect, restrictTo('admin'), deleteTour);

export default router;