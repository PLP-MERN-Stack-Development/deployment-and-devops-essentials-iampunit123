import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Users, 
  Calendar,
  Clock
} from 'lucide-react';

const TourCard = ({ tour }) => {
  const formatDuration = (days) => {
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    if (remainingDays === 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
    return `${weeks} week${weeks > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileH={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-safari-gold/20"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.coverImage?.url || tour.images?.[0]?.url || '/api/placeholder/400/300'}
          alt={tour.coverImage?.alt || tour.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {tour.featured && (
            <span className="bg-safari-gold text-safari-charcoal px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          <span className="bg-safari-charcoal/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            {tour.category}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold text-safari-charcoal">
            {tour.ratingsAverage || 4.5}
          </span>
          <span className="text-xs text-safari-earth">
            ({tour.ratingsQuantity || 0})
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          {tour.priceDiscount ? (
            <div className="flex items-end space-x-2">
              <span className="text-2xl font-bold text-white bg-safari-gold/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                ${tour.priceDiscount}
              </span>
              <span className="text-lg text-white line-through bg-safari-charcoal/70 backdrop-blur-sm px-2 py-1 rounded">
                ${tour.price}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-white bg-safari-gold/90 backdrop-blur-sm px-3 py-1 rounded-lg">
              ${tour.price}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-3 line-clamp-2">
          {tour.name}
        </h3>
        
        <p className="text-safari-earth mb-4 line-clamp-2 leading-relaxed">
          {tour.summary || tour.description}
        </p>

        {/* Tour Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-safari-earth text-sm">
            <Clock className="w-4 h-4 mr-2 text-safari-gold" />
            <span>{formatDuration(tour.duration)}</span>
          </div>
          <div className="flex items-center text-safari-earth text-sm">
            <Users className="w-4 h-4 mr-2 text-safari-gold" />
            <span>Max {tour.maxGroupSize} travelers</span>
          </div>
          <div className="flex items-center text-safari-earth text-sm">
            <MapPin className="w-4 h-4 mr-2 text-safari-gold" />
            <span className="capitalize">{tour.difficulty} level</span>
          </div>
          {tour.season && tour.season !== 'year-round' && (
            <div className="flex items-center text-safari-earth text-sm">
              <Calendar className="w-4 h-4 mr-2 text-safari-gold" />
              <span className="capitalize">Best in {tour.season}</span>
            </div>
          )}
        </div>

        {/* Highlights */}
        {tour.highlights && tour.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {tour.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-safari-sand/30 text-safari-earth px-2 py-1 rounded text-xs"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/tours/${tour._id}`}
          className="block w-full bg-safari-gold hover:bg-safari-savanna text-safari-charcoal text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          View Safari Details
        </Link>
      </div>
    </motion.div>
  );
};

export default TourCard;