export const APP_CONFIG = {
  name: 'SafariVista',
  version: '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  supportEmail: 'support@safarivista.com',
  phone: '+254 700 123 456',
  address: 'Nairobi, Kenya'
};

export const TOUR_CATEGORIES = {
  SAFARI: 'safari',
  LUXURY: 'luxury',
  ADVENTURE: 'adventure',
  CULTURAL: 'cultural',
  BEACH: 'beach',
  MOUNTAIN: 'mountain'
};

export const TOUR_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  DIFFICULT: 'difficult'
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  KES: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' }
};

export const LANGUAGES = {
  en: 'English',
  sw: 'Swahili',
  fr: 'French',
  de: 'German'
};

export const SEASONS = {
  YEAR_ROUND: 'year-round',
  SUMMER: 'summer',
  WINTER: 'winter',
  SPRING: 'spring',
  AUTUMN: 'autumn'
};

export const PARTICIPANT_TYPES = {
  ADULTS: 'adults',
  CHILDREN: 'children',
  INFANTS: 'infants'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'safarivista_token',
  USER_DATA: 'safarivista_user',
  CART_ITEMS: 'safarivista_cart',
  USER_PREFERENCES: 'safarivista_preferences'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};

export const SUCCESS_MESSAGES = {
  BOOKING_CREATED: 'Booking created successfully!',
  BOOKING_CANCELLED: 'Booking cancelled successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.'
};