import express from 'express';
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  getReview,
  markReviewHelpful,
  addReviewResponse,
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

router.patch('/:id/helpful', protect, markReviewHelpful);
router.patch('/:id/respond', protect, restrictTo('admin', 'lead-guide'), addReviewResponse);

export default router;