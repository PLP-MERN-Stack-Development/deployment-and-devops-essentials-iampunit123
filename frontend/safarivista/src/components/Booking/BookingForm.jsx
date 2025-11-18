import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, Users, FileText } from 'lucide-react';
import Button from '../../components/UI/Button';

const BookingForm = ({ tour, onSubmit, loading }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const participants = watch('participants', { adults: 1, children: 0, infants: 0 });

  const calculateTotal = () => {
    const adultPrice = tour.price;
    const childPrice = tour.price * 0.7;
    return (
      (participants.adults * adultPrice) +
      (participants.children * childPrice)
    );
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Start Date */}
      <div>
        <label className="block text-lg font-semibold text-safari-charcoal mb-3">
          <Calendar className="w-5 h-5 inline mr-2" />
          Preferred Start Date
        </label>
        <input
          type="date"
          {...register('startDate', { required: 'Start date is required' })}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-4 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-safari-gold"
        />
        {errors.startDate && (
          <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>
        )}
      </div>

      {/* Participants */}
      <div>
        <label className="block text-lg font-semibold text-safari-charcoal mb-3">
          <Users className="w-5 h-5 inline mr-2" />
          Group Composition
        </label>
        
        <div className="space-y-4">
          {[
            { key: 'adults', label: 'Adults (13+ years)', price: tour.price },
            { key: 'children', label: 'Children (2-12 years)', price: tour.price * 0.7 },
            { key: 'infants', label: 'Infants (Under 2 years)', price: 0 }
          ].map((type) => (
            <div key={type.key} className="flex items-center justify-between p-4 bg-safari-sand/10 rounded-lg">
              <div>
                <div className="font-semibold text-safari-charcoal">{type.label}</div>
                <div className="text-sm text-safari-earth">
                  {type.price > 0 ? `$${type.price} per person` : 'Free of charge'}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    const current = participants[type.key] || 0;
                    if (current > 0) {
                      // Update logic would go here
                    }
                  }}
                  disabled={(participants[type.key] || 0) <= 0}
                  className="w-8 h-8 rounded-full border border-safari-gold text-safari-gold disabled:opacity-30"
                >
                  -
                </button>
                <span className="font-semibold w-8 text-center">
                  {participants[type.key] || 0}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = participants[type.key] || 0;
                    const totalParticipants = Object.values(participants).reduce((a, b) => a + b, 0);
                    if (totalParticipants < tour.maxGroupSize) {
                      // Update logic would go here
                    }
                  }}
                  disabled={Object.values(participants).reduce((a, b) => a + b, 0) >= tour.maxGroupSize}
                  className="w-8 h-8 rounded-full border border-safari-gold text-safari-gold disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-safari-earth mt-2">
          Maximum group size: {tour.maxGroupSize} people
        </p>
      </div>

      {/* Special Requirements */}
      <div>
        <label className="block text-lg font-semibold text-safari-charcoal mb-3">
          <FileText className="w-5 h-5 inline mr-2" />
          Special Requirements
        </label>
        <textarea
          {...register('specialRequirements')}
          placeholder="Any dietary restrictions, mobility requirements, or special requests?"
          rows={4}
          className="w-full p-4 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-safari-gold"
        />
      </div>

      {/* Total Display */}
      <div className="bg-safari-gold/10 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-safari-charcoal">Total Amount</span>
          <span className="text-2xl font-bold text-safari-gold">
            ${calculateTotal().toFixed(2)}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Continue to Payment
      </Button>
    </motion.form>
  );
};

export default BookingForm;