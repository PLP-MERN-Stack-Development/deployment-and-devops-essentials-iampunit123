import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { 
  Star, 
  MapPin, 
  Users, 
  Calendar,
  Clock,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toursAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Layout/LoadingSpinner';
import TourGallery from '../components/Tours/TourGallery';
import Button from '../components/UI/Button';

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: tour, isLoading, error } = useQuery(
    ['tour', id],
    () => toursAPI.getById(id),
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-safari-sand/10">
        <LoadingSpinner size="large" text="Loading safari details..." />
      </div>
    );
  }

  if (error || !tour?.data?.tour) {
    return (
      <div className="min-h-screen bg-safari-sand/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦒</div>
          <h2 className="text-2xl font-display text-safari-charcoal mb-2">
            Safari Not Found
          </h2>
          <p className="text-safari-earth mb-4">
            We couldn't find this safari tour.
          </p>
          <Button onClick={() => navigate('/tours')}>
            Browse All Safaris
          </Button>
        </div>
      </div>
    );
  }

  const tourData = tour.data.tour;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'included', label: 'What\'s Included' },
    { id: 'reviews', label: `Reviews (${tourData.ratingsQuantity || 0})` },
    { id: 'location', label: 'Location' },
  ];

  const formatDuration = (days) => {
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    if (remainingDays === 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
    return `${weeks} week${weeks > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container-custom px-4 pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Safaris</span>
        </Button>
      </div>

      {/* Hero Section with Gallery */}
      <section className="relative">
        <TourGallery 
          images={tourData.images} 
          coverImage={tourData.coverImage}
          tourName={tourData.name}
        />
      </section>

      {/* Main Content */}
      <div className="container-custom px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-safari-charcoal mb-2">
                    {tourData.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-safari-earth">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Multiple Locations</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>
                        {tourData.ratingsAverage || 4.5} ({tourData.ratingsQuantity || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="bg-safari-gold/20 text-safari-gold px-2 py-1 rounded text-sm font-semibold">
                        {tourData.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4 lg:mt-0">
                  <Button variant="ghost" size="small">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="small">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-lg text-safari-charcoal leading-relaxed">
                {tourData.description}
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="border-b border-safari-gold/20 mb-8">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-safari-gold text-safari-gold'
                        : 'border-transparent text-safari-earth hover:text-safari-charcoal'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-4">
                        Tour Summary
                      </h3>
                      <p className="text-safari-earth leading-relaxed">
                        {tourData.summary}
                      </p>
                    </div>

                    {tourData.highlights && tourData.highlights.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-safari-charcoal mb-3">
                          Experience Highlights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tourData.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-safari-gold rounded-full"></div>
                              <span className="text-safari-earth">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'itinerary' && tourData.itinerary && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-4">
                      Detailed Itinerary
                    </h3>
                    <div className="space-y-4">
                      {tourData.itinerary.map((day) => (
                        <div key={day.day} className="bg-safari-sand/10 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-safari-gold rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">Day {day.day}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-safari-charcoal mb-2">
                                {day.title}
                              </h4>
                              <p className="text-safari-earth mb-3 leading-relaxed">
                                {day.description}
                              </p>
                              
                              {day.accommodation && (
                                <div className="mb-2">
                                  <span className="text-sm font-semibold text-safari-charcoal">
                                    Accommodation:{' '}
                                  </span>
                                  <span className="text-sm text-safari-earth">
                                    {day.accommodation}
                                  </span>
                                </div>
                              )}

                              {day.meals && day.meals.length > 0 && (
                                <div className="mb-2">
                                  <span className="text-sm font-semibold text-safari-charcoal">
                                    Meals:{' '}
                                  </span>
                                  <span className="text-sm text-safari-earth">
                                    {day.meals.join(', ')}
                                  </span>
                                </div>
                              )}

                              {day.activities && day.activities.length > 0 && (
                                <div>
                                  <span className="text-sm font-semibold text-safari-charcoal">
                                    Activities:{' '}
                                  </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {day.activities.map((activity, index) => (
                                      <span
                                        key={index}
                                        className="bg-safari-gold/20 text-safari-charcoal px-2 py-1 rounded text-xs"
                                      >
                                        {activity}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'included' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-safari-charcoal mb-4">
                        ✅ What's Included
                      </h4>
                      <ul className="space-y-2">
                        {tourData.included?.map((item, index) => (
                          <li key={index} className="flex items-center space-x-3 text-safari-earth">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-safari-charcoal mb-4">
                        ❌ What's Not Included
                      </h4>
                      <ul className="space-y-2">
                        {tourData.excluded?.map((item, index) => (
                          <li key={index} className="flex items-center space-x-3 text-safari-earth">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-4">
                      Traveler Reviews
                    </h3>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🌟</div>
                      <p className="text-safari-earth">
                        Reviews will be displayed here once available.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-4">
                      Tour Locations
                    </h3>
                    <div className="bg-safari-sand/10 rounded-lg p-6">
                      <p className="text-safari-earth mb-4">
                        This safari takes you through multiple spectacular locations across Africa.
                        Detailed maps and location information will be provided upon booking.
                      </p>
                      <div className="h-64 bg-safari-gold/20 rounded-lg flex items-center justify-center">
                        <span className="text-safari-charcoal">Interactive Map Coming Soon</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-safari-gold/20 p-6">
                {/* Price */}
                <div className="mb-6">
                  {tourData.priceDiscount ? (
                    <div className="flex items-end space-x-2">
                      <span className="text-3xl font-bold text-safari-charcoal">
                        ${tourData.priceDiscount}
                      </span>
                      <span className="text-xl text-safari-earth line-through">
                        ${tourData.price}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        Save ${tourData.price - tourData.priceDiscount}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-safari-charcoal">
                      ${tourData.price}
                    </span>
                  )}
                  <span className="text-safari-earth block mt-1">per person</span>
                </div>

                {/* Tour Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-safari-gold/10">
                    <span className="text-safari-earth">Duration</span>
                    <span className="font-semibold text-safari-charcoal">
                      {formatDuration(tourData.duration)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-safari-gold/10">
                    <span className="text-safari-earth">Group Size</span>
                    <span className="font-semibold text-safari-charcoal">
                      Max {tourData.maxGroupSize} people
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-safari-gold/10">
                    <span className="text-safari-earth">Difficulty</span>
                    <span className="font-semibold text-safari-charcoal capitalize">
                      {tourData.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-safari-earth">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-safari-charcoal">
                        {tourData.ratingsAverage || 4.5}/5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <Button
                  onClick={() => navigate(`/booking/${tourData._id}`)}
                  size="large"
                  className="w-full mb-4"
                >
                  {isAuthenticated ? 'Book This Safari' : 'Sign in to Book'}
                </Button>

                {!isAuthenticated && (
                  <p className="text-center text-sm text-safari-earth">
                    <Link to="/login" className="text-safari-gold hover:underline">
                      Sign in
                    </Link>{' '}
                    to book this amazing safari
                  </p>
                )}

                {/* Quick Info */}
                <div className="mt-6 pt-6 border-t border-safari-gold/10">
                  <div className="flex items-center justify-center space-x-4 text-sm text-safari-earth">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Small groups</span>
                    </div>
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

export default TourDetail;