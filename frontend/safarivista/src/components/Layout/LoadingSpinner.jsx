import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'large', text = 'Loading...' }) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizes[size]} border-4 border-safari-gold/20 border-t-safari-gold rounded-full`}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-safari-charcoal font-sans"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 border-4 border-safari-gold/30 border-t-safari-gold rounded-full mx-auto mb-4"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center space-x-2"
      >
        <span className="text-2xl">🦁</span>
        <h2 className="text-xl font-display font-bold text-safari-charcoal">
          Safari<span className="text-safari-gold">Vista</span>
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-safari-earth mt-2"
      >
        Preparing your African adventure...
      </motion.p>
    </div>
  </div>
);

export default LoadingSpinner;