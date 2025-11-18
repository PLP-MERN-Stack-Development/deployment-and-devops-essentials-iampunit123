import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-safari-charcoal/70 to-safari-charcoal/50"></div>
      </div>
      
      {/* Animated Wildlife Silhouettes */}
      <div className="absolute inset-0 overflow-hidden">
        {['🦁', '🐘', '🦒', '🦏'].map((animal, index) => (
          <motion.span
            key={animal}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 0.1, y: -100 }}
            transition={{
              duration: 15 + index * 2,
              repeat: Infinity,
              delay: index * 3,
              ease: "linear"
            }}
            className="absolute text-6xl"
            style={{
              left: `${20 + index * 20}%`,
              bottom: '-50px'
            }}
          >
            {animal}
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-safari-gold/20 backdrop-blur-sm border border-safari-gold/30 rounded-full px-6 py-3 mb-8"
          >
            <span className="text-safari-gold font-sans text-sm font-medium">
              🎖️ Luxury African Safari Experts
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
          >
            <span className="block">African</span>
            <span className="text-gradient bg-gradient-sunset">Adventure</span>
            <span className="block">Awaits</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the untamed beauty of Africa with our exclusive luxury safaris. 
            Where every sunrise brings new adventures and every sunset tells a story.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/tours"
              className="btn-primary bg-safari-gold hover:bg-safari-savanna text-safari-charcoal text-lg px-8 py-4"
            >
              🦁 Explore Safaris
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="btn-secondary border-white text-white hover:bg-white hover:text-safari-charcoal text-lg px-8 py-4"
              >
                Start Your Journey
              </Link>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '5000+', label: 'Happy Travelers' },
              { number: '98%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-safari-gold">
                  {stat.number}
                </div>
                <div className="text-safari-sand text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-safari-sand"
        >
          <span className="text-sm mb-2">Scroll to Explore</span>
          <div className="w-6 h-10 border-2 border-safari-gold rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-safari-gold rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;