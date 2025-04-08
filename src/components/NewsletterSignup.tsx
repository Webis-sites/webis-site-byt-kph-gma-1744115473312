'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  email: string;
}

const NewsletterSignup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Reset validation state when user types
    if (isValid !== null) setIsValid(null);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setIsValid(false);
      toast.error('נא להזין כתובת אימייל תקינה');
      return;
    }
    
    setIsValid(true);
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('תודה שנרשמת! קופון של 10% הנחה נשלח לאימייל שלך');
      setFormData({ email: '' });
    } catch (error) {
      toast.error('אירעה שגיאה. נסה שוב מאוחר יותר');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans" dir="rtl">
      <Toaster position="top-center" />
      
      <div className="max-w-md mx-auto my-8 px-6 py-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-md border border-white/20 shadow-neumorphic">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-800">הצטרפו לניוזלטר של בית קפה גמא</h2>
          
          <div className="glassmorphism-card p-4 mb-4 rounded-xl">
            <p className="text-gray-700 mb-3">
              קבלו עדכונים על אירועים מיוחדים, מבצעים והטבות ישירות לתיבת המייל שלכם!
            </p>
            <p className="text-sm font-bold text-primary">
              הירשמו עכשיו וקבלו קופון 10% הנחה לביקור הראשון! ☕
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative mb-4">
              <div className={`
                flex items-center overflow-hidden rounded-xl
                bg-white/50 backdrop-blur-sm border
                shadow-inner
                transition-all duration-300
                ${isValid === false ? 'border-red-400' : 'border-white/30'}
                ${isValid === true ? 'border-green-400' : ''}
              `}>
                <span className="p-3 text-gray-500">
                  <FiMail size={20} />
                </span>
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="האימייל שלך"
                  className="w-full p-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  disabled={isSubmitting}
                  aria-label="כתובת אימייל"
                  required
                />
                
                {isValid === true && (
                  <span className="p-3 text-green-500">
                    <FiCheck size={20} />
                  </span>
                )}
                
                {isValid === false && (
                  <span className="p-3 text-red-500">
                    <FiAlertCircle size={20} />
                  </span>
                )}
              </div>
              
              {isValid === false && (
                <p className="text-red-500 text-sm mt-1 text-right">נא להזין כתובת אימייל תקינה</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-3 px-6 rounded-xl font-medium text-gray-800
                bg-gradient-to-r from-primary to-secondary
                border border-white/30
                shadow-neumorphic-button
                hover:shadow-neumorphic-button-hover
                active:shadow-neumorphic-button-active
                disabled:opacity-70 disabled:cursor-not-allowed
                transition-all duration-300
              `}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  שולח...
                </span>
              ) : (
                'הרשמה לניוזלטר'
              )}
            </motion.button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            לא נשלח לך ספאם. ניתן לבטל את המנוי בכל עת.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsletterSignup;