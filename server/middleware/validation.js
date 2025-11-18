import { body, param, query } from 'express-validator';
import { validationResult } from 'express-validator';
import AppError from '../utils/appError.js';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return next(new AppError(errorMessages.join('. '), 400));
  }
  next();
};

// Auth validations
export const validateSignup = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('passwordConfirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  handleValidationErrors
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Tour validations
export const validateTour = [
  body('name')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('Tour name must be between 10 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 50 })
    .withMessage('Description must be at least 50 characters long'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 day'),
  body('maxGroupSize')
    .isInt({ min: 1, max: 50 })
    .withMessage('Group size must be between 1 and 50'),
  body('difficulty')
    .isIn(['easy', 'medium', 'difficult'])
    .withMessage('Difficulty must be easy, medium, or difficult'),
  body('category')
    .isIn(['safari', 'beach', 'mountain', 'cultural', 'adventure', 'luxury'])
    .withMessage('Invalid tour category'),
  handleValidationErrors
];

// Booking validations
export const validateBooking = [
  body('tourId')
    .isMongoId()
    .withMessage('Invalid tour ID'),
  body('startDate')
    .isISO8601()
    .withMessage('Please provide a valid start date')
    .custom((value) => {
      const startDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return startDate >= today;
    })
    .withMessage('Start date must be in the future'),
  body('participants.adults')
    .isInt({ min: 1, max: 10 })
    .withMessage('Number of adults must be between 1 and 10'),
  body('participants.children')
    .isInt({ min: 0, max: 10 })
    .withMessage('Number of children must be between 0 and 10'),
  body('participants.infants')
    .isInt({ min: 0, max: 5 })
    .withMessage('Number of infants must be between 0 and 5'),
  handleValidationErrors
];

// Review validations
export const validateReview = [
  body('review')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review must be between 10 and 1000 characters'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  handleValidationErrors
];

// User validations
export const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .matches(/^\+?[\d\s-()]{10,}$/)
    .withMessage('Please provide a valid phone number'),
  handleValidationErrors
];