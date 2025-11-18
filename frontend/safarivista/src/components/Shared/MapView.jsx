import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Maximize2 } from 'lucide-react';

const MapView = ({ locations, height = '400px' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simple static map implementation
  // In production, i will  integrate with Google Maps, Mapbox, or Leaflet v4
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg border border-safari-gold/20 overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : 'relative'
      }`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-safari-gold/20">
        <div className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-safari-gold" />
          <h3 className="font-display font-semibold text-safari-charcoal">
            Safari Destinations
          </h3>
        </div>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 hover:bg-safari-sand/10 rounded-lg transition-colors"
        >
          <Maximize2 className="w-4 h-4 text-safari-charcoal" />
        </button>
      </div>

      {/* Simple Map Placeholder */}
      <div className="relative h-[calc(100%-80px)] bg-safari-sand/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-2">
            Interactive Map
          </h3>
          <p className="text-safari-earth mb-4 max-w-md">
            Map integration ready. Connect with Google Maps, Mapbox, or Leaflet in production.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-safari-earth">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-safari-gold" />
              <span>Kenya</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-safari-gold" />
              <span>Tanzania</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-safari-gold" />
              <span>South Africa</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapView;