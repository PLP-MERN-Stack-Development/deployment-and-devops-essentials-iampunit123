import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { 
  Filter, 
  Grid, 
  List, 
  Search,
  MapPin,
  Calendar
} from 'lucide-react';
import { toursAPI } from '../utils/api';
import TourCard from '../components/Tours/TourCard';
import TourGrid from '../components/Tours/TourGrid';
import TourFilters from '../components/Tours/TourFilters';
import LoadingSpinner from '../components/Layout/LoadingSpinner';

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    duration: searchParams.get('duration') || '',
    sort: searchParams.get('sort') || 'name'
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const { data: tours, isLoading, error } = useQuery(
    ['tours', filters],
    () => toursAPI.getAll(filters),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
    }
  );

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      difficulty: '',
      minPrice: '',
      maxPrice: '',
      duration: '',
      sort: 'name'
    });
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-safari-sand/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦒</div>
          <h2 className="text-2xl font-display text-safari-charcoal mb-2">
            Safari Not Found
          </h2>
          <p className="text-safari-earth mb-4">
            We couldn't load the tours. Please try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-safari-sand/10">
      {/* Header */}
      <section className="bg-gradient-savanna text-white py-20">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Discover African
              <span className="block text-safari-gold">Safari Adventures</span>
            </h1>
            <p className="text-xl text-safari-sand max-w-2xl mx-auto mb-8">
              Explore our curated collection of premium safari experiences across Africa's most spectacular destinations
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-safari-charcoal w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search safaris by name, destination, or activity..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange({ search: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-safari-charcoal placeholder-safari-earth focus:outline-none focus:ring-2 focus:ring-safari-gold"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-24">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4"
              >
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-safari-gold" />
                  <span className="font-semibold text-safari-charcoal">
                    Filters & Sort
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-safari-earth">
                    {tours?.data?.tours?.length || 0} tours
                  </span>
                  <div className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </div>
              </button>

              {/* Filters */}
              <AnimatePresence>
                {(showFilters || window.innerWidth >= 1024) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
                  >
                    {/* View Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-safari-charcoal">
                          View:
                        </span>
                      </div>
                      <div className="flex bg-safari-sand/20 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 rounded ${viewMode === 'grid' ? 'bg-safari-gold text-white' : 'text-safari-charcoal'}`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 rounded ${viewMode === 'list' ? 'bg-safari-gold text-white' : 'text-safari-charcoal'}`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <h3 className="font-semibold text-safari-charcoal mb-3">
                        Safari Type
                      </h3>
                      <div className="space-y-2">
                        {categories.map(category => (
                          <button
                            key={category.value}
                            onClick={() => handleFilterChange({ 
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

                    {/* Price Filter */}
                    <div>
                      <h3 className="font-semibold text-safari-charcoal mb-3">
                        Price Range
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder="Min $"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange({ minPrice: e.target.value })}
                          className="w-full p-2 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-safari-gold"
                        />
                        <input
                          type="number"
                          placeholder="Max $"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange({ maxPrice: e.target.value })}
                          className="w-full p-2 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-safari-gold"
                        />
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <button
                      onClick={clearFilters}
                      className="w-full py-3 text-safari-gold border border-safari-gold rounded-lg hover:bg-safari-gold hover:text-white transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-2xl font-display font-semibold text-safari-charcoal">
                  {tours?.data?.tours?.length || 0} Safari Adventures
                </h2>
                <p className="text-safari-earth mt-1">
                  Discover your perfect African journey
                </p>
              </div>
              
              {/* Sort */}
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange({ sort: e.target.value })}
                className="mt-2 sm:mt-0 px-4 py-2 border border-safari-gold/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-safari-gold"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="ratingsAverage">Highest Rated</option>
                <option value="duration">Duration</option>
              </select>
            </div>

            {/* Loading State */}
            {isLoading && <LoadingSpinner text="Loading amazing safaris..." />}

            {/* Tours Grid */}
            {!isLoading && tours?.data?.tours && (
              <TourGrid 
                tours={tours.data.tours} 
                viewMode={viewMode}
              />
            )}

            {/* Empty State */}
            {!isLoading && (!tours?.data?.tours || tours.data.tours.length === 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🐘</div>
                <h3 className="text-2xl font-display text-safari-charcoal mb-2">
                  No Safaris Found
                </h3>
                <p className="text-safari-earth mb-6 max-w-md mx-auto">
                  We couldn't find any safaris matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Show All Safaris
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;