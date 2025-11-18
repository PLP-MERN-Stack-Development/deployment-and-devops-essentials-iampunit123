import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  ClockIcon,
  Eye,
  Download
} from 'lucide-react';
import { bookingsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Layout/LoadingSpinner';
import Button from '../components/UI/Button';

const MyBookings = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  
  const { data: bookings, isLoading, error } = useQuery(
    'myBookings',
    bookingsAPI.getMyBookings,
    {
      enabled: !!user,
    }
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'completed':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings?.data?.bookings?.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  }) || [];

  const statusCounts = {
    all: bookings?.data?.bookings?.length || 0,
    confirmed: bookings?.data?.bookings?.filter(b => b.status === 'confirmed').length || 0,
    pending: bookings?.data?.bookings?.filter(b => b.status === 'pending').length || 0,
    completed: bookings?.data?.bookings?.filter(b => b.status === 'completed').length || 0,
    cancelled: bookings?.data?.bookings?.filter(b => b.status === 'cancelled').length || 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-safari-sand/10">
        <LoadingSpinner text="Loading your bookings..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-safari-sand/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦒</div>
          <h2 className="text-2xl font-display text-safari-charcoal mb-2">
            Couldn't Load Bookings
          </h2>
          <p className="text-safari-earth mb-4">
            There was an error loading your bookings.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-safari-sand/10">
      {/* Header */}
      <section className="bg-gradient-savanna text-white py-16">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              My Safari Bookings
            </h1>
            <p className="text-xl text-safari-sand max-w-2xl mx-auto">
              Manage your upcoming adventures and explore your booking history
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom px-4 py-8">
        {/* Stats and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Bookings', count: statusCounts.all },
                { key: 'confirmed', label: 'Confirmed', count: statusCounts.confirmed },
                { key: 'pending', label: 'Pending', count: statusCounts.pending },
                { key: 'completed', label: 'Completed', count: statusCounts.completed },
                { key: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                    filter === tab.key
                      ? 'bg-safari-gold text-safari-charcoal border-safari-gold'
                      : 'bg-white text-safari-charcoal border-safari-gold/30 hover:bg-safari-gold/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="bg-safari-charcoal/10 text-safari-charcoal px-2 py-1 rounded-full text-sm">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            {filteredBookings.length === 0 && statusCounts.all > 0 && (
              <Button
                variant="secondary"
                onClick={() => setFilter('all')}
              >
                View All Bookings
              </Button>
            )}
          </div>
        </motion.div>

        {/* Bookings Grid */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🐘</div>
            <h3 className="text-2xl font-display text-safari-charcoal mb-2">
              {statusCounts.all === 0 ? 'No Bookings Yet' : 'No Matching Bookings'}
            </h3>
            <p className="text-safari-earth mb-6 max-w-md mx-auto">
              {statusCounts.all === 0 
                ? "You haven't booked any safaris yet. Start your African adventure today!"
                : `No ${filter} bookings found. Try changing your filter.`
              }
            </p>
            {statusCounts.all === 0 && (
              <Link to="/tours">
                <Button>
                  Explore Safaris
                </Button>
              </Link>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6"
          >
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-safari-gold/20"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Tour Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={booking.tour?.coverImage?.url || booking.tour?.images?.[0]?.url}
                        alt={booking.tour?.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-2">
                            {booking.tour?.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-safari-earth mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>Multiple Locations</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{booking.tour?.duration} days</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>
                                {booking.participants.adults + booking.participants.children} travelers
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-semibold ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </div>
                      </div>

                      {/* Booking Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-safari-earth">Start Date</div>
                          <div className="font-semibold text-safari-charcoal">
                            {new Date(booking.startDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-safari-earth">Participants</div>
                          <div className="font-semibold text-safari-charcoal">
                            {booking.participants.adults} adults, {booking.participants.children} children
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-safari-earth">Total Amount</div>
                          <div className="font-semibold text-safari-gold">
                            ${booking.totalAmount?.toFixed(2) || '0.00'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-safari-earth">Booking Date</div>
                          <div className="font-semibold text-safari-charcoal">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Link to={`/tours/${booking.tour?._id}`}>
                          <Button variant="secondary" size="small">
                            <Eye className="w-4 h-4 mr-2" />
                            View Tour
                          </Button>
                        </Link>
                        
                        {booking.status === 'confirmed' && (
                          <>
                            <Button variant="secondary" size="small">
                              <Download className="w-4 h-4 mr-2" />
                              Download Itinerary
                            </Button>
                            <Button variant="secondary" size="small">
                              Modify Booking
                            </Button>
                          </>
                        )}

                        {booking.status === 'pending' && (
                          <Button variant="secondary" size="small">
                            Complete Payment
                          </Button>
                        )}

                        {(booking.status === 'confirmed' || booking.status === 'pending') && (
                          <Button variant="danger" size="small">
                            Cancel Booking
                          </Button>
                        )}

                        {booking.status === 'completed' && (
                          <Button variant="secondary" size="small">
                            Write Review
                          </Button>
                        )}
                      </div>

                      {/* Special Requirements */}
                      {booking.specialRequirements && (
                        <div className="mt-4 p-3 bg-safari-sand/10 rounded-lg">
                          <div className="text-sm font-semibold text-safari-charcoal mb-1">
                            Special Requirements:
                          </div>
                          <div className="text-sm text-safari-earth">
                            {booking.specialRequirements}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline for Confirmed Bookings */}
                {booking.status === 'confirmed' && (
                  <div className="border-t border-safari-gold/20 bg-safari-sand/5 px-6 py-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-safari-charcoal">Booking Confirmed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-safari-gold rounded-full"></div>
                        <span className="text-safari-earth">Pre-trip Information Sent</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-safari-gold/30 rounded-full"></div>
                        <span className="text-safari-earth">Safari Adventure</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-safari-gold/30 rounded-full"></div>
                        <span className="text-safari-earth">Completed</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Upcoming Trips Section */}
        {statusCounts.confirmed > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-display font-semibold text-safari-charcoal mb-6">
              🎉 Upcoming Adventures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings
                .filter(booking => booking.status === 'confirmed')
                .slice(0, 3)
                .map((booking) => (
                  <div key={booking._id} className="bg-white rounded-2xl shadow-lg border border-safari-gold/20 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Calendar className="w-6 h-6 text-safari-gold" />
                      <div>
                        <div className="font-semibold text-safari-charcoal">
                          {new Date(booking.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-safari-earth">
                          {Math.ceil((new Date(booking.startDate) - new Date()) / (1000 * 60 * 60 * 24))} days to go
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-safari-charcoal mb-2 line-clamp-2">
                      {booking.tour?.name}
                    </h3>
                    <div className="text-sm text-safari-earth mb-4">
                      {booking.participants.adults + booking.participants.children} travelers
                    </div>
                    <Button size="small" className="w-full">
                      View Details
                    </Button>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;