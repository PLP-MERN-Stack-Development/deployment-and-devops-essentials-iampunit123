import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Star, 
  MapPin, 
  Users, 
  Calendar, 
  Shield,
  Award,
  Heart
} from 'lucide-react';
import { useQuery } from 'react-query';
import { toursAPI } from '../utils/api';
import HeroSection from '../components/Shared/HeroSection';
import TourCard from '../components/Tours/TourCard';
import Testimonials from '../components/Shared/Testimonials';

const Home = () => {
  const { data: featuredTours, isLoading } = useQuery(
    'featuredTours',
    toursAPI.getFeatured,
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '5000+', label: 'Happy Travelers', icon: Users },
    { number: '50+', label: 'Safari Destinations', icon: MapPin },
    { number: '98%', label: 'Satisfaction Rate', icon: Star },
    { number: '15+', label: 'Years Experience', icon: Award },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Expert Safari Guides',
      description: 'Certified guides with 10+ years of wildlife expertise and local knowledge.',
      color: 'text-safari-forest'
    },
    {
      icon: Award,
      title: 'Luxury Accommodation',
      description: '5-star lodges and eco-friendly camps in prime wildlife locations.',
      color: 'text-safari-gold'
    },
    {
      icon: Heart,
      title: 'Conservation Focus',
      description: 'Supporting local communities and wildlife conservation efforts.',
      color: 'text-safari-sunset'
    },
    {
      icon: Calendar,
      title: 'Flexible Planning',
      description: 'Customizable itineraries and 24/7 support throughout your journey.',
      color: 'text-safari-sky'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="section-padding bg-safari-charcoal text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-safari-gold/20 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-safari-gold" />
                  </div>
                </div>
                <div className="text-3xl font-bold font-display text-safari-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-safari-sand font-sans">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-safari-charcoal mb-4">
              Why Choose <span className="text-gradient">SafariVista</span>?
            </h2>
            <p className="text-xl text-safari-earth max-w-2xl mx-auto">
              Experience Africa like never before with our premium safari adventures
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-safari-sand/10 rounded-2xl p-8 text-center card-hover border border-safari-gold/20"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-4">
                  {feature.title}
                </h3>
                <p className="text-safari-earth leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="section-padding bg-gradient-savanna">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Featured Safari Experiences
            </h2>
            <p className="text-xl text-safari-sand max-w-2xl mx-auto">
              Curated journeys showcasing Africa's most spectacular wildlife and landscapes
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-safari-gold"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredTours?.data?.tours?.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/tours"
              className="btn-primary bg-white text-safari-charcoal hover:bg-safari-sand hover:text-safari-charcoal"
            >
              Explore All Safaris
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="section-padding bg-safari-charcoal text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              Ready for Your <span className="text-safari-gold">African Adventure</span>?
            </h2>
            <p className="text-xl text-safari-sand mb-8">
              Join thousands of travelers who have experienced the magic of Africa with SafariVista
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tours"
                className="btn-primary bg-safari-gold hover:bg-safari-savanna text-safari-charcoal"
              >
                Book Your Safari
              </Link>
              <Link
                to="/contact"
                className="btn-secondary border-safari-gold text-safari-gold hover:bg-safari-gold hover:text-safari-charcoal"
              >
                Get Expert Advice
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;