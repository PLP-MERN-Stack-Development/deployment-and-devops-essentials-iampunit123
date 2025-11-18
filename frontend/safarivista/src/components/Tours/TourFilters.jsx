import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import Button from '../UI/Button';

const TourFilters = ({ filters, onFilterChange, onClearFilters, isOpen, onToggle }) => {
  const categories = [
    { value: 'safari', label: 'Wildlife Safari', icon: '🦁' },
    { value: 'luxury', label: 'Luxury Tour', icon: '🏨' },
    { value: 'adventure', label: 'Adventure', icon: '🧗' },
    { value: 'cultural', label: 'Cultural', icon: '🌍' },
    { value: 'beach', label: 'Beach', icon: '🏖️' },
    { value: 'mountain', label: 'Mountain', icon: '⛰️' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy', description: 'Light walking, comfortable pace' },
    { value: 'medium', label: 'Moderate', description: 'Regular walking, some challenges' },
    { value: 'difficult', label: 'Challenging', description: 'Demanding hikes, rugged terrain' }
  ];

  const durations = [
    { value: '1-3', label: '1-3 days' },
    { value: '4-7', label: '4-7 days' },
    { value: '8-14', label: '8-14 days' },
    { value: '15+', label: '15+ days' }
  ];

  const seasons = [
    { value: 'year-round', label: 'Year Round' },
    { value: 'summer', label: 'Summer' },
    { value: 'winter', label: 'Winter' },
    { value: 'spring', label: 'Spring' },
    { value: 'autumn', label: 'Autumn' }
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <Button
        variant="secondary"
        onClick={onToggle}
        className="lg:hidden flex items-center space-x-2"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </Button>

      {/* Filter Panel */}
      <motion.div
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -320,
          opacity: isOpen ? 1 : 0 
        }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white shadow-2xl lg:shadow-none border-r border-safari-gold/20 lg:border-none p-6 overflow-y-auto ${
          isOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-semibold text-safari-charcoal">
            Refine Your Search
          </h3>
          <button
            onClick={onToggle}
            className="lg:hidden text-safari-earth hover:text-safari-charcoal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-semibold text-safari-charcoal mb-3">Safari Type</h4>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => onFilterChange({ 
                    category: filters.category === category.value ? '' : category.value 
                  })}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    filters.category === category.value
                      ? 'bg-safari-gold/10 border border-safari-gold'
                      : 'bg-safari-sand/10 hover:bg-safari-sand/20'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="flex-1 text-safari-charcoal">
                    {category.label}
                  </span>
                  {filters.category === category.value && (
                    <div className="w-2 h-2 bg-safari-gold rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold text-safari-charcoal mb-3">Price Range</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-safari-earth mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                  className="w-full p-2 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-safari-gold"
                />
              </div>
              <div>
                <label className="block text-sm text-safari-earth mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="$5000"
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                  className="w-full p-2 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-safari-gold"
                />
              </div>
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <h4 className="font-semibold text-safari-charcoal mb-3">Difficulty Level</h4>
            <div className="space-y-2">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty.value}
                  onClick={() => onFilterChange({ 
                    difficulty: filters.difficulty === difficulty.value ? '' : difficulty.value 
                  })}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    filters.difficulty === difficulty.value
                      ? 'bg-safari-gold/10 border border-safari-gold'
                      : 'bg-safari-sand/10 hover:bg-safari-sand/20'
                  }`}
                >
                  <div className="font-medium text-safari-charcoal">
                    {difficulty.label}
                  </div>
                  <div className="text-sm text-safari-earth">
                    {difficulty.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <h4 className="font-semibold text-safari-charcoal mb-3">Duration</h4>
            <div className="grid grid-cols-2 gap-2">
              {durations.map(duration => (
                <button
                  key={duration.value}
                  onClick={() => onFilterChange({ duration: duration.value })}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    filters.duration === duration.value
                      ? 'bg-safari-gold text-white'
                      : 'bg-safari-sand/10 text-safari-charcoal hover:bg-safari-sand/20'
                  }`}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          </div>

          {/* Season */}
          <div>
            <h4 className="font-semibold text-safari-charcoal mb-3">Best Season</h4>
            <select
              value={filters.season}
              onChange={(e) => onFilterChange({ season: e.target.value })}
              className="w-full p-3 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-safari-gold"
            >
              <option value="">Any Season</option>
              {seasons.map(season => (
                <option key={season.value} value={season.value}>
                  {season.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <Button
            variant="secondary"
            onClick={onClearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default TourFilters;