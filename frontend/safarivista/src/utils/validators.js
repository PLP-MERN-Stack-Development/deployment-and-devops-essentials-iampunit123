export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    requirements: {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers
    }
  };
};

export const validateName = (name) => {
  return name && name.length >= 2 && name.length <= 50;
};

export const validateTourData = (data) => {
  const errors = {};

  if (!data.name || data.name.length < 10) {
    errors.name = 'Tour name must be at least 10 characters long';
  }

  if (!data.description || data.description.length < 50) {
    errors.description = 'Description must be at least 50 characters long';
  }

  if (!data.price || data.price < 0) {
    errors.price = 'Price must be a positive number';
  }

  if (!data.duration || data.duration < 1) {
    errors.duration = 'Duration must be at least 1 day';
  }

  if (!data.maxGroupSize || data.maxGroupSize < 1) {
    errors.maxGroupSize = 'Group size must be at least 1';
  }

  if (!data.difficulty || !['easy', 'medium', 'difficult'].includes(data.difficulty)) {
    errors.difficulty = 'Please select a valid difficulty level';
  }

  if (!data.category || !['safari', 'luxury', 'adventure', 'cultural', 'beach', 'mountain'].includes(data.category)) {
    errors.category = 'Please select a valid category';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateBookingData = (data) => {
  const errors = {};

  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  } else if (new Date(data.startDate) < new Date().setHours(0, 0, 0, 0)) {
    errors.startDate = 'Start date must be in the future';
  }

  if (!data.participants || !data.participants.adults || data.participants.adults < 1) {
    errors.participants = 'At least one adult is required';
  }

  if (data.participants && data.participants.adults + data.participants.children + data.participants.infants === 0) {
    errors.participants = 'At least one participant is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateReviewData = (data) => {
  const errors = {};

  if (!data.review || data.review.length < 10) {
    errors.review = 'Review must be at least 10 characters long';
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Rating must be between 1 and 5';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    maxWidth,
    maxHeight
  } = options;

  const errors = [];

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${(maxSize / 1024 / 1024).toFixed(2)}MB`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateCoordinates = (lat, lng) => {
  const latValid = lat >= -90 && lat <= 90;
  const lngValid = lng >= -180 && lng <= 180;
  
  return latValid && lngValid;
};