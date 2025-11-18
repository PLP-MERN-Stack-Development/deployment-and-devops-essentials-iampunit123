import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TourCard from './TourCard';

const TourGrid = ({ tours, viewMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <AnimatePresence>
          {tours.map((tour) => (
            <motion.div
              key={tour._id}
              variants={itemVariants}
              layout
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {tours.map((tour) => (
          <motion.div
            key={tour._id}
            variants={itemVariants}
            layout
          >
            <TourCard tour={tour} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TourGrid;
