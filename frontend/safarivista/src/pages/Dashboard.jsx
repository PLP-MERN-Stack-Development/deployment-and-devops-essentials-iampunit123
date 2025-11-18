import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Users,
  CreditCard,
  Settings,
  Heart,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';
import { bookingsAPI, toursAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Layout/LoadingSpinner';
import Button from '../components/UI/Button';

const Dashboard = () => {
  const { user } = useAuth();
  
  const { data: bookings } = useQuery(
    'myBookings',
    bookingsAPI.getMyBookings,
    { enabled: !!user }
  );

  const { data: featuredTours } = useQuery(
    'featuredTours',
    toursAPI.getFeatured,
    { enabled: !!user }
  );

  const userBookings = bookings?.data?.bookings || [];
  const upcomingTrips = userBookings.filter(b => b.status === 'confirmed').slice(0, 2);
  const recentBookings = userBookings.slice(0, 3);

  const stats = [
    {
      icon: Calendar,
      label: 'Total Bookings',
      value: userBookings.length,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: MapPin,
      label: 'Upcoming Trips',
      value: userBookings.filter(b => b.status === 'confirmed').length,
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Star,
      label: 'Reviews Written',
      value: '0',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: Award,
      label: 'Safari Level',
      value: 'Explorer',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  if (!user) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-safari-sand/10">
      {/* Header */}
      <section className="bg-gradient-savanna text-white py-12">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">
                Welcome back, {user.name}! 🦁
              </h1>
              <p className="text-xl text-safari-sand">
                Ready for your next African adventure?
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Link to="/tours">
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white text-white">
                  Book New Safari
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-safari-gold/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color} mb-3`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-safari-charcoal mb-1">
                        {stat.value}
                      </div>
                      <div className="text-safari-earth text-sm">
                        {stat.label}
                      </div>
                    </div>
                    {index === 3 && (
                      <div className="text-right">
                        <div className="text-xs text-safari-earth mb-1">Next Level</div>
                        <div className="text-sm font-semibold text-safari-gold">Adventurer</div>
                        <div className="w-20 bg-safari-sand/30 rounded-full h-2 mt-1">
                          <div className="bg-safari-gold rounded-full h-2 w-1/2"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Upcoming Trips */}
            {upcomingTrips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-safari-gold/20 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-semibold text-safari-charcoal">
                    🗓️ Upcoming Trips
                  </h2>
                  <Link to="/my-bookings">
                    <Button variant="ghost" size="small">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {upcomingTrips.map((booking) => (
                    <div key={booking._id} className="flex items-center space-x-4 p-4 bg-safari-sand/10 rounded-lg">
                      <img
                        src={booking.tour?.coverImage?.url}
                        alt={booking.tour?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-safari-charcoal">
                          {booking.tour?.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-safari-earth mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{booking.tour?.duration} days</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{booking.participants.adults + booking.participants.children} travelers</span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/my-bookings`}>
                        <Button size="small">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-safari-gold/20 p-6"
            >
              <h2 className="text-2xl font-display font-semibold text-safari-charcoal mb-6">
                📈 Recent Activity
              </h2>

              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between p-4 border border-safari-gold/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {booking.status === 'confirmed' ? <Calendar className="w-5 h-5" /> :
                           booking.status === 'pending' ? <Clock className="w-5 h-5" /> :
                           <Users className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-semibold text-safari-charcoal">
                            {booking.status === 'confirmed' ? 'Booking Confirmed' :
                             booking.status === 'pending' ? 'Payment Pending' :
                             'Booking Updated'}
                          </div>
                          <div className="text-sm text-safari-earth">
                            {booking.tour?.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-safari-charcoal">
                          ${booking.totalAmount?.toFixed(2)}
                        </div>
                        <div className="text-xs text-safari-earth">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-lg font-semibold text-safari-charcoal mb-2">
                    No Recent Activity
                  </h3>
                  <p className="text-safari-earth mb-4">
                    Start your African adventure by booking your first safari!
                  </p>
                  <Link to="/tours">
                    <Button>
                      Explore Safaris
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-safari-gold/20 p-6"
            >
              <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-4">
                ⚡ Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/tours">
                  <Button variant="secondary" className="w-full justify-start">
                    <MapPin className="w-5 h-5 mr-3" />
                    Book New Safari
                  </Button>
                </Link>
                <Link to="/my-bookings">
                  <Button variant="secondary" className="w-full justify-start">
                    <Calendar className="w-5 h-5 mr-3" />
                    Manage Bookings
                  </Button>
                </Link>
                <Button variant="secondary" className="w-full justify-start">
                  <CreditCard className="w-5 h-5 mr-3" />
                  Payment Methods
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Settings className="w-5 h-5 mr-3" />
                  Account Settings
                </Button>
              </div>
            </motion.div>

            {/* Recommended Safaris */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-safari-gold/20 p-6"
            >
              <h3 className="text-xl font-display font-semibold text-safari-charcoal mb-4">
                🌟 Recommended for You
              </h3>
              <div className="space-y-4">
                {featuredTours?.data?.tours?.slice(0, 2).map((tour) => (
                  <Link
                    key={tour._id}
                    to={`/tours/${tour._id}`}
                    className="block group"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-safari-gold/10 group-hover:border-safari-gold/30 transition-colors">
                      <img
                        src={tour.coverImage?.url || tour.images?.[0]?.url}
                        alt={tour.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-safari-charcoal group-hover:text-safari-gold transition-colors line-clamp-1">
                          {tour.name}
                        </div>
                        <div className="text-sm text-safari-earth">
                          ${tour.price} • {tour.duration} days
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/tours" className="block mt-4">
                <Button variant="ghost" size="small" className="w-full">
                  View All Recommendations
                </Button>
              </Link>
            </motion.div>

            {/* Loyalty Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-sunset text-white rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8" />
                <div>
                  <h3 className="font-display font-semibold">Safari Explorer</h3>
                  <p className="text-safari-sand text-sm">Your current status</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to Adventurer</span>
                  <span>2/4 trips</span>
                </div>
                <div className="w-full bg-safari-sand/30 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-1/2"></div>
                </div>
              </div>

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Completed Trips</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Spent</span>
                  <span className="font-semibold">$2,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Member Since</span>
                  <span className="font-semibold">2024</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;