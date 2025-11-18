import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  User, 
  LogOut,
  Calendar,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Safari Tours', path: '/tours' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-safari-gold/20' 
          : 'bg-transparent'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-safari-charcoal text-safari-gold py-2 px-4">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+254 700 123 456</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 fill-current" />
            <span>5-Star Rated Safari Experiences</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container-custom px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-white">🦁</span>
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-safari-charcoal group-hover:text-safari-gold transition-colors">
                Safari<span className="text-safari-gold">Vista</span>
              </span>
              <span className="text-xs text-safari-earth font-sans -mt-1">
                Luxury African Safaris
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-sans font-medium transition-all duration-300 group ${
                  location.pathname === item.path
                    ? 'text-safari-gold'
                    : 'text-safari-charcoal hover:text-safari-gold'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-safari-gold transition-all duration-300 group-hover:w-full ${
                    location.pathname === item.path ? 'w-full' : ''
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/my-bookings"
                  className="flex items-center space-x-2 text-safari-charcoal hover:text-safari-gold transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Bookings</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 bg-safari-gold/10 hover:bg-safari-gold/20 px-4 py-2 rounded-lg transition-colors">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-safari-gold/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-safari-charcoal hover:bg-safari-gold/10 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="btn-secondary text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Join Adventure
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-safari-charcoal hover:text-safari-gold transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-safari-gold/20"
          >
            <div className="container-custom px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-safari-gold/10 text-safari-gold border-l-4 border-safari-gold'
                        : 'text-safari-charcoal hover:bg-safari-gold/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="border-t border-safari-gold/20 pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-4 py-2 bg-safari-gold/5 rounded-lg">
                        <User className="w-5 h-5 text-safari-gold" />
                        <span className="text-safari-charcoal">{user?.name}</span>
                      </div>
                      <Link
                        to="/my-bookings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 py-3 px-4 text-safari-charcoal hover:bg-safari-gold/5 rounded-lg transition-colors"
                      >
                        <Calendar className="w-5 h-5" />
                        <span>My Bookings</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 text-safari-charcoal hover:bg-safari-gold/5 rounded-lg transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="btn-secondary text-center"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="btn-primary text-center"
                      >
                        Join Adventure
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;