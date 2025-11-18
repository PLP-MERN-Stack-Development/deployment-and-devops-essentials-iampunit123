import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'The luxury safari experience exceeded all expectations. Our guide was incredibly knowledgeable and the accommodations were breathtaking. Truly a once-in-a-lifetime adventure!',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      tour: 'Premium Serengeti Adventure'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      rating: 5,
      text: 'From the wildlife sightings to the cultural experiences, every moment was magical. The attention to detail and personalized service made this trip unforgettable.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      tour: 'Kenyan Wilderness Explorer'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'London, UK',
      rating: 5,
      text: 'As a solo traveler, I felt completely safe and well taken care of. The small group size allowed for intimate wildlife encounters and meaningful connections.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      tour: 'Botswana Delta Discovery'
    }
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
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-safari-charcoal mb-4">
            Traveler Stories
          </h2>
          <p className="text-xl text-safari-earth max-w-2xl mx-auto">
            Discover why thousands of adventurers trust SafariVista for their African dreams
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-safari-sand/10 rounded-2xl p-6 relative border border-safari-gold/20 card-hover"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-safari-gold/20">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-safari-charcoal leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-safari-charcoal">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-safari-earth">
                    {testimonial.location}
                  </div>
                  <div className="text-xs text-safari-gold font-semibold">
                    {testimonial.tour}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '4.9/5', label: 'Average Rating' },
              { number: '2K+', label: 'Happy Travelers' },
              { number: '98%', label: 'Recommend Us' },
              { number: '50+', label: 'Safari Experts' }
            ].map((stat, index) => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-safari-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-safari-earth">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;