import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock,
  CreditCard,
  Shield,
  Check
} from 'lucide-react';
import { toursAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Layout/LoadingSpinner';
import Button from '../components/UI/Button';

const Booking = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    participants: {
      adults: 1,
      children: 0,
      infants: 0
    },
    specialRequirements: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });

  const { data: tour, isLoading } = useQuery(
    ['tour', tourId],
    () => toursAPI.getById(tourId),
    {
      enabled: !!tourId && isAuthenticated,
    }
  );

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { from: `/booking/${tourId}` } 
      });
    }
  }, [isAuthenticated, navigate, tourId]);

  if (!isAuthenticated) {
    return <LoadingSpinner text="Redirecting to login..." />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-safari-sand/10">
        <LoadingSpinner text="Loading booking details..." />
      </div>
    );
  }

  const tourData = tour?.data?.tour;

  if (!tourData) {
    return (
      <div className="min-h-screen bg-safari-sand/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦒</div>
          <h2 className="text-2xl font-display text-safari-charcoal mb-2">
            Tour Not Found
          </h2>
          <Button onClick={() => navigate('/tours')}>
            Browse Safaris
          </Button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    const adultPrice = tourData.price;
    const childPrice = tourData.price * 0.7; // 30% discount for children
    return (
      (bookingData.participants.adults * adultPrice) +
      (bookingData.participants.children * childPrice)
    );
  };

  const updateParticipants = (type, value) => {
    setBookingData(prev => ({
      ...prev,
      participants: {
        ...prev.participants,
        [type]: Math.max(0, value)
      }
    }));
  };

  const steps = [
    { number: 1, title: 'Dates & Group', completed: step > 1 },
    { number: 2, title: 'Details & Requirements', completed: step > 2 },
    { number: 3, title: 'Review & Pay', completed: step > 3 },
  ];

  return (
    <div className="min-h-screen bg-safari-sand/10 py-8">
      <div className="container-custom px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-safari-charcoal mb-4">
            Book Your Safari Adventure
          </h1>
          <p className="text-xl text-safari-earth max-w-2xl mx-auto">
            Complete your booking for <strong>{tourData.name}</strong>
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <React.Fragment key={stepItem.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                    stepItem.completed || step === stepItem.number
                      ? 'bg-safari-gold border-safari-gold text-white'
                      : 'bg-white border-safari-gold/30 text-safari-earth'
                  }`}>
                    {stepItem.completed ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{stepItem.number}</span>
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    stepItem.completed || step === stepItem.number
                      ? 'text-safari-gold'
                      : 'text-safari-earth'
                  }`}>
                    {stepItem.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    stepItem.completed ? 'bg-safari-gold' : 'bg-safari-gold/30'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              {/* Step 1: Dates & Group */}
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-display font-semibold text-safari-charcoal">
                    Select Dates & Group Size
                  </h2>

                  {/* Start Date */}
                  <div>
                    <label className="block text-lg font-semibold text-safari-charcoal mb-4">
                      <Calendar className="w-5 h-5 inline mr-2" />
                      Preferred Start Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        startDate: e.target.value
                      }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-4 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      required
                    />
                    <p className="text-sm text-safari-earth mt-2">
                      Please select your preferred start date. We'll confirm availability within 24 hours.
                    </p>
                  </div>

                  {/* Participants */}
                  <div>
                    <label className="block text-lg font-semibold text-safari-charcoal mb-4">
                      <Users className="w-5 h-5 inline mr-2" />
                      Group Composition
                    </label>
                    
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between p-4 bg-safari-sand/10 rounded-lg">
                        <div>
                          <div className="font-semibold text-safari-charcoal">Adults (13+ years)</div>
                          <div className="text-sm text-safari-earth">${tourData.price} per person</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateParticipants('adults', bookingData.participants.adults - 1)}
                            disabled={bookingData.participants.adults <= 1}
                            className="w-8 h-8 rounded-full border border-safari-gold text-safari-gold disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {bookingData.participants.adults}
                          </span>
                          <button
                            onClick={() => updateParticipants('adults', bookingData.participants.adults + 1)}
                            disabled={bookingData.participants.adults >= tourData.maxGroupSize}
                            className="w-8 h-8 rounded-full border border-safari-gold text-safari-gold disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between p-4 bg-safari-sand/10 rounded-lg">
                        <div>
                          <div className="font-semibold text-safari-charcoal">Children (2-12 years)</div>
                          <div className="text-sm text-safari-earth">${(tourData.price * 0.7).toFixed(0)} per person (30% off)</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateParticipants('children', bookingData.participants.children - 1)}
                            disabled={bookingData.participants.children <= 0}
                            className="w-8 h-8 rounded-full border border-safari-gold text-safari-gold disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {bookingData.participants.children}
                          </span>
                          <button
                            onClick={() => updateParticipants('children', bookingData.participants.children + 1)}
                            className="w-8 h-8 rounded-full border border-safari-gold text-safari-gold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between p-4 bg-safari-sand/10 rounded-lg">
                        <div>
                          <div className="font-semibold text-safari-charcoal">Infants (Under 2 years)</div>
                          <div className="text-sm text-safari-earth">Free of charge</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateParticipants('infants', bookingData.participants.infants - 1)}
                            disabled={bookingData.participants.infants <= 0}
                            className="w-8 h-8 rounded-full border border-safari-gold text-safari-gold disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {bookingData.participants.infants}
                          </span>
                          <button
                            onClick={() => updateParticipants('infants', bookingData.participants.infants + 1)}
                            className="w-8 h-8 rounded-full border border-safari-gold text-safari-gold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-safari-earth mt-4">
                      Maximum group size: {tourData.maxGroupSize} people
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!bookingData.startDate || bookingData.participants.adults === 0}
                    >
                      Continue to Details
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Details & Requirements */}
              {step === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-display font-semibold text-safari-charcoal">
                    Additional Details
                  </h2>

                  {/* Special Requirements */}
                  <div>
                    <label className="block text-lg font-semibold text-safari-charcoal mb-4">
                      Special Requirements
                    </label>
                    <textarea
                      value={bookingData.specialRequirements}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        specialRequirements: e.target.value
                      }))}
                      placeholder="Any dietary restrictions, mobility requirements, or special requests?"
                      rows={4}
                      className="w-full p-4 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-safari-gold"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <label className="block text-lg font-semibold text-safari-charcoal mb-4">
                      Emergency Contact
                    </label>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={bookingData.emergencyContact.name}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          emergencyContact: {
                            ...prev.emergencyContact,
                            name: e.target.value
                          }
                        }))}
                        className="w-full p-4 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={bookingData.emergencyContact.phone}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          emergencyContact: {
                            ...prev.emergencyContact,
                            phone: e.target.value
                          }
                        }))}
                        className="w-full p-4 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      />
                      <input
                        type="text"
                        placeholder="Relationship"
                        value={bookingData.emergencyContact.relationship}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          emergencyContact: {
                            ...prev.emergencyContact,
                            relationship: e.target.value
                          }
                        }))}
                        className="w-full p-4 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      />
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                    >
                      Review & Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Pay */}
              {step === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-display font-semibold text-safari-charcoal">
                    Review & Confirm Booking
                  </h2>

                  {/* Booking Summary */}
                  <div className="bg-safari-sand/10 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-safari-charcoal">
                      Booking Summary
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-safari-earth">Tour:</span>
                        <div className="font-semibold">{tourData.name}</div>
                      </div>
                      <div>
                        <span className="text-safari-earth">Start Date:</span>
                        <div className="font-semibold">
                          {new Date(bookingData.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-safari-earth">Duration:</span>
                        <div className="font-semibold">{tourData.duration} days</div>
                      </div>
                      <div>
                        <span className="text-safari-earth">Participants:</span>
                        <div className="font-semibold">
                          {bookingData.participants.adults} adults,{' '}
                          {bookingData.participants.children} children,{' '}
                          {bookingData.participants.infants} infants
                        </div>
                      </div>
                    </div>

                    {bookingData.specialRequirements && (
                      <div>
                        <span className="text-safari-earth">Special Requirements:</span>
                        <div className="font-semibold">{bookingData.specialRequirements}</div>
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-lg font-semibold text-safari-charcoal mb-4">
                      <CreditCard className="w-5 h-5 inline mr-2" />
                      Payment Method
                    </label>
                    <div className="border border-safari-gold/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span>Credit/Debit Card</span>
                        <div className="flex space-x-2">
                          <span className="text-2xl">💳</span>
                          <span className="text-2xl">🔒</span>
                        </div>
                      </div>
                      <p className="text-sm text-safari-earth mt-2">
                        Secure payment processed by Stripe. Your payment information is encrypted.
                      </p>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 text-safari-gold focus:ring-safari-gold"
                    />
                    <label htmlFor="terms" className="text-sm text-safari-charcoal">
                      I agree to the{' '}
                      <a href="#" className="text-safari-gold hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and understand that this booking is subject to our{' '}
                      <a href="#" className="text-safari-gold hover:underline">
                        Cancellation Policy
                      </a>
                    </label>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button>
                      <Shield className="w-5 h-5 mr-2" />
                      Complete Secure Payment
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-safari-gold/20 p-6">
                <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-4">
                  Booking Summary
                </h3>

                {/* Tour Info */}
                <div className="flex space-x-4 mb-4">
                  <img
                    src={tourData.coverImage?.url || tourData.images?.[0]?.url}
                    alt={tourData.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-safari-charcoal line-clamp-2">
                      {tourData.name}
                    </h4>
                    <div className="flex items-center space-x-1 text-sm text-safari-earth mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{tourData.difficulty} • {tourData.duration} days</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Adults × {bookingData.participants.adults}</span>
                    <span>${(tourData.price * bookingData.participants.adults).toFixed(2)}</span>
                  </div>
                  {bookingData.participants.children > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Children × {bookingData.participants.children}</span>
                      <span>${(tourData.price * 0.7 * bookingData.participants.children).toFixed(2)}</span>
                    </div>
                  )}
                  {bookingData.participants.infants > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Infants × {bookingData.participants.infants}</span>
                      <span>Free</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-safari-gold/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-safari-charcoal">Total</span>
                    <span className="text-2xl font-bold text-safari-gold">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-safari-earth mt-2">
                    Includes all taxes and fees
                  </p>
                </div>

                {/* Features */}
                <div className="mt-6 space-y-2 text-sm text-safari-earth">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure booking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-safari-gold" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-safari-gold" />
                    <span>Small group experience</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;