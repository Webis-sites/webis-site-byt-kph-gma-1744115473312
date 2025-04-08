'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  // Café location coordinates (Tel Aviv as example)
  const position: [number, number] = [32.0853, 34.7818];
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      toast.success('ההודעה נשלחה בהצלחה!');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('אירעה שגיאה בשליחת הטופס. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cafeInfo = {
    name: 'בית קפה גמא',
    address: 'רחוב אלנבי 115, תל אביב',
    phone: '03-1234567',
    email: 'info@cafegamma.co.il',
    hours: {
      'ראשון-חמישי': '08:00 - 22:00',
      'שישי': '08:00 - 16:00',
      'שבת': '10:00 - 22:00'
    },
    social: {
      facebook: 'https://facebook.com/cafegamma',
      instagram: 'https://instagram.com/cafegamma',
      whatsapp: 'https://wa.me/9721234567'
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-primary text-gray-800 rtl" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2">צרו קשר</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto">
            אנחנו תמיד שמחים לשמוע מכם! השאירו פרטים ונחזור אליכם בהקדם
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glassmorphism-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">השאירו פרטים</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">שם מלא</label>
                <input
                  type="text"
                  id="name"
                  className={`neumorphic-input w-full ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="הכנס/י את שמך"
                  {...register('name', { required: 'שדה חובה' })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">טלפון</label>
                <input
                  type="tel"
                  id="phone"
                  className={`neumorphic-input w-full ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="הכנס/י מספר טלפון"
                  {...register('phone', { 
                    required: 'שדה חובה',
                    pattern: {
                      value: /^[0-9]{9,10}$/,
                      message: 'מספר טלפון לא תקין'
                    }
                  })}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">דוא"ל</label>
                <input
                  type="email"
                  id="email"
                  className={`neumorphic-input w-full ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="הכנס/י כתובת דוא״ל"
                  {...register('email', { 
                    required: 'שדה חובה',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'כתובת דוא״ל לא תקינה'
                    }
                  })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">הודעה</label>
                <textarea
                  id="message"
                  rows={4}
                  className={`neumorphic-input w-full ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="כתוב/י את הודעתך כאן..."
                  {...register('message', { required: 'שדה חובה' })}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              
              <motion.button
                type="submit"
                className="neumorphic-button w-full py-3 px-6 rounded-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    שולח...
                  </span>
                ) : 'שלח הודעה'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Cafe Info Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glassmorphism-card p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">{cafeInfo.name}</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="neumorphic-icon-container mr-4">
                    <FaMapMarkerAlt className="text-secondary" />
                  </div>
                  <span>{cafeInfo.address}</span>
                </li>
                <li className="flex items-center">
                  <div className="neumorphic-icon-container mr-4">
                    <FaPhone className="text-secondary" />
                  </div>
                  <a href={`tel:${cafeInfo.phone}`} className="hover:text-secondary transition-colors">
                    {cafeInfo.phone}
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="neumorphic-icon-container mr-4">
                    <FaEnvelope className="text-secondary" />
                  </div>
                  <a href={`mailto:${cafeInfo.email}`} className="hover:text-secondary transition-colors">
                    {cafeInfo.email}
                  </a>
                </li>
                <li className="flex items-start">
                  <div className="neumorphic-icon-container mr-4 mt-1">
                    <FaClock className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">שעות פעילות:</p>
                    <ul className="space-y-1">
                      {Object.entries(cafeInfo.hours).map(([day, hours]) => (
                        <li key={day} className="flex justify-between">
                          <span className="font-medium">{day}:</span>
                          <span>{hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>

              {/* Social Media Links */}
              <div className="mt-8">
                <p className="font-medium mb-3">עקבו אחרינו:</p>
                <div className="flex space-x-4 space-x-reverse">
                  <motion.a
                    href={cafeInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neumorphic-social-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-blue-600" />
                  </motion.a>
                  <motion.a
                    href={cafeInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neumorphic-social-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-pink-600" />
                  </motion.a>
                  <motion.a
                    href={cafeInfo.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neumorphic-social-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="text-green-500" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Map Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glassmorphism-card p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">מיקום</h3>
              <div className="h-80 rounded-xl overflow-hidden neumorphic-map-container">
                <MapContainer 
                  center={position} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      <div className="text-center">
                        <strong>{cafeInfo.name}</strong>
                        <p>{cafeInfo.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-left" rtl />
    </section>
  );
};

export default ContactSection;