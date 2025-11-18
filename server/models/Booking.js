import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a tour']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price']
  },
  participants: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    },
    infants: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Booking must have a start date']
  },
  endDate: Date,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentIntentId: String,
  specialRequirements: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  totalAmount: Number
}, {
  timestamps: true
});

// Calculate end date and total amount
bookingSchema.pre('save', function(next) {
  if (this.startDate && this.tour) {
    // This will be populated in controller
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate() + this.tour.duration);
  }
  
  this.totalAmount = this.price * (this.participants.adults + this.participants.children * 0.7);
  next();
});

export default mongoose.model('Booking', bookingSchema);