import express from 'express';
import {
  getAllUsers,
  getUser,
  getMe,
  updateMe,
  deleteMe,
  updateUser,
  deleteUser
} from '../controllers/userController.js';


import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// User routes for logged-in users
router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

// Admin only routes
router.use(restrictTo('admin'));

router
  .route('/')
  .get(getAllUsers);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;