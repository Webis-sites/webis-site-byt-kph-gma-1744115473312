'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isSameDay } from 'date-fns';
import { he } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiMessageSquare, FiCheck, FiX } from 'react-icons/fi';

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
  guests: number;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
];

const BookingSystem: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>();

  useEffect(() => {
    // Generate next 14 days for the calendar
    const days: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      days.push(addDays(today, i));
    }
    
    setCalendarDays(days);
  }, []);

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTime) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log({
      ...data,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime
    });
    
    // Show confirmation and reset form
    setShowConfirmation(true);
    reset();
    setSelectedDate(null);
    setSelectedTime(null);
    
    // Hide confirmation after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  return (
    <div className="font-sans rtl" dir="rtl">
      <div className="max-w-4xl mx-auto p-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="booking-card"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">הזמנת שולחן בבית קפה גמא</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Calendar Section */}
            <div className="mb-8">
              <label className="form-label">
                <FiCalendar className="inline-block ml-2" />
                בחר תאריך
              </label>
              
              <div className="calendar-container">
                <div className="calendar-days">
                  {calendarDays.map((day) => (
                    <motion.button
                      key={day.toISOString()}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`calendar-day ${selectedDate && isSameDay(day, selectedDate) ? 'calendar-day-selected' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="day-name">{format(day, 'EEE', { locale: he })}</div>
                      <div className="day-number">{format(day, 'd')}</div>
                      <div className="day-month">{format(day, 'MMM', { locale: he })}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {!selectedDate && (
                <p className="text-red-500 text-sm mt-2">אנא בחר תאריך</p>
              )}
            </div>
            
            {/* Time Slots Section */}
            <div className="mb-8">
              <label className="form-label">
                <FiClock className="inline-block ml-2" />
                בחר שעה
              </label>
              
              <div className="time-slots-container">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`time-slot ${selectedTime === time ? 'time-slot-selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </motion.button>
                ))}
              </div>
              
              {!selectedTime && (
                <p className="text-red-500 text-sm mt-2">אנא בחר שעה</p>
              )}
            </div>
            
            {/* Personal Details Form */}
            <div className="form-glass-card">
              <div className="mb-4">
                <label className="form-label">
                  <FiUser className="inline-block ml-2" />
                  שם מלא
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  placeholder="ישראל ישראלי"
                  {...register('name', { 
                    required: 'שדה חובה',
                    minLength: { value: 2, message: 'שם קצר מדי' } 
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="form-label">
                  <FiPhone className="inline-block ml-2" />
                  טלפון
                </label>
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                  placeholder="050-1234567"
                  {...register('phone', { 
                    required: 'שדה חובה',
                    pattern: { 
                      value: /^0\d{1,2}[-\s]?\d{7,8}$/, 
                      message: 'מספר טלפון לא תקין' 
                    } 
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="form-label">
                  <FiMail className="inline-block ml-2" />
                  דוא"ל
                </label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="your@email.com"
                  {...register('email', { 
                    required: 'שדה חובה',
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                      message: 'כתובת דוא"ל לא תקינה' 
                    } 
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="form-label">
                  <FiUser className="inline-block ml-2" />
                  מספר סועדים
                </label>
                <select
                  className="form-input"
                  {...register('guests', { required: true })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">
                  <FiMessageSquare className="inline-block ml-2" />
                  בקשות מיוחדות
                </label>
                <textarea
                  className="form-input min-h-[100px]"
                  placeholder="בקשות מיוחדות, הערות או העדפות"
                  {...register('specialRequests')}
                />
              </div>
            </div>
            
            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting || !selectedDate || !selectedTime}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  מעבד...
                </span>
              ) : (
                'הזמן שולחן'
              )}
            </motion.button>
          </form>
        </motion.div>
        
        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="confirmation-modal"
            >
              <div className="confirmation-content">
                <div className="confirmation-icon">
                  <FiCheck size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">ההזמנה התקבלה בהצלחה!</h3>
                <p>קיבלנו את הזמנתך ונשלח אישור לדוא"ל שלך בקרוב.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="close-button"
                  onClick={() => setShowConfirmation(false)}
                >
                  <FiX size={24} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingSystem;