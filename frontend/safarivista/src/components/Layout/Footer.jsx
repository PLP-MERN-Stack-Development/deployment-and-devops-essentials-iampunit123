import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Safari Experiences',
      links: [
        { name: 'Wildlife Safaris', href: '/tours?category=safari' },
        { name: 'Luxury Tours', href: '/tours?category=luxury' },
        { name: 'Adventure Trips', href: '/tours?category=adventure' },
        { name: 'Cultural Tours', href: '/tours?category=cultural' },
        { name: 'Photography Safaris', href: '/tours?category=photography' },
      ]
    },
    {
      title: 'Destinations',
      links: [
        { name: 'Kenya', href: '/destinations/kenya' },
        { name: 'Tanzania', href: '/destinations/tanzania' },
        { name: 'South Africa', href: '/destinations/south-africa' },
        { name: 'Botswana', href: '/destinations/botswana' },
        { name: 'Rwanda', href: '/destinations/rwanda' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Booking Terms', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Travel Insurance', href: '/insurance' },
      ]
    }
  ];

  return (
    <footer className="bg-safari-charcoal text-white">
      {/* Main Footer */}
      <div className="container-custom px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">🦁</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-white">
                  Safari<span className="text-safari-gold">Vista</span>
                </span>
                <span className="text-sm text-safari-sand">
                  Luxury African Safaris
                </span>
              </div>
            </Link>
            <p className="text-safari-sand mb-6 max-w-md">
              Experience the untamed beauty of Africa with our premium safari adventures. 
              From majestic wildlife encounters to luxurious accommodations, we create 
              unforgettable journeys into the heart of the wild.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-safari-gold/20 rounded-full flex items-center justify-center text-safari-gold hover:bg-safari-gold hover:text-safari-charcoal transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-safari-gold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-safari-sand hover:text-safari-gold transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-safari-gold/20">
        <div className="container-custom px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <MapPin className="w-5 h-5 text-safari-gold" />
              <span className="text-safari-sand text-sm">
                Nairobi, Kenya • Cape Town, South Africa
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Phone className="w-5 h-5 text-safari-gold" />
              <span className="text-safari-sand text-sm">
                +254 700 123 456
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Mail className="w-5 h-5 text-safari-gold" />
              <span className="text-safari-sand text-sm">
                hello@safarivista.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-safari-charcoal/80 border-t border-safari-gold/10">
        <div className="container-custom px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2 text-safari-sand text-sm">
              <span>© {currentYear} SafariVista. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
            <div className="flex items-center space-x-4 text-safari-sand text-sm">
              <span>Proudly supporting wildlife conservation</span>
              <div className="flex space-x-1">
                <span>🦁</span>
                <span>🐘</span>
                <span>🦒</span>
                <span>🦏</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;