import { format, formatDistance, formatRelative, isToday, isTomorrow, isYesterday } from 'date-fns';

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date, formatStr = 'PPP') => {
  if (!date) return '';
  return format(new Date(date), formatStr);
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return format(new Date(date), 'PPpp');
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  return formatRelative(new Date(date), new Date());
};

export const formatDistanceToNow = (date) => {
  if (!date) return '';
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const formatDuration = (days) => {
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  
  if (remainingDays === 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  }
  
  return `${weeks} week${weeks > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if the number has an international format
  if (cleaned.length > 10) {
    return `+${cleaned}`;
  }
  
  // Format as US number (xxx) xxx-xxxx
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatRating = (rating) => {
  if (!rating) return '0.0';
  return parseFloat(rating).toFixed(1);
};

export const formatParticipantCount = (participants) => {
  if (!participants) return '0 travelers';
  
  const total = (participants.adults || 0) + (participants.children || 0) + (participants.infants || 0);
  const parts = [];
  
  if (participants.adults) {
    parts.push(`${participants.adults} adult${participants.adults > 1 ? 's' : ''}`);
  }
  if (participants.children) {
    parts.push(`${participants.children} child${participants.children > 1 ? 'ren' : ''}`);
  }
  if (participants.infants) {
    parts.push(`${participants.infants} infant${participants.infants > 1 ? 's' : ''}`);
  }
  
  return parts.join(', ');
};

export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};