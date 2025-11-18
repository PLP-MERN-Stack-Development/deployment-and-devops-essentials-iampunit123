import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DateSelector = ({ selectedDate, onDateChange, unavailableDates = [] }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(unavailable => 
      new Date(unavailable).toDateString() === date.toDateString()
    );
  };

  const isDatePast = (date) => {
    return date < new Date().setHours(0, 0, 0, 0);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isUnavailable = isDateUnavailable(date);
      const isPast = isDatePast(date);
      const isSelected = selectedDate && date.toDateString() === new Date(selectedDate).toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={day}
          onClick={() => !isUnavailable && !isPast && onDateChange(date)}
          disabled={isUnavailable || isPast}
          className={`h-10 rounded-lg transition-all ${
            isSelected
              ? 'bg-safari-gold text-white'
              : isToday
              ? 'bg-safari-gold/20 text-safari-charcoal'
              : isUnavailable || isPast
              ? 'bg-safari-sand/10 text-safari-earth cursor-not-allowed'
              : 'bg-white text-safari-charcoal hover:bg-safari-gold/10'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-safari-gold/20 p-6"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-safari-sand/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-safari-charcoal" />
        </button>
        
        <h3 className="text-lg font-display font-semibold text-safari-charcoal">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-safari-sand/10 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-safari-charcoal" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-safari-charcoal py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-safari-gold/20">
        <div className="flex items-center justify-center space-x-6 text-sm text-safari-earth">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-safari-gold rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-safari-gold/20 rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-safari-sand/10 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DateSelector;