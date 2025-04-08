'use client';

import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface FooterLink {
  name: string;
  href: string;
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically handle the subscription logic
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const navLinks: FooterLink[] = [
    { name: 'דף הבית', href: '/' },
    { name: 'תפריט', href: '/menu' },
    { name: 'אודות', href: '/about' },
    { name: 'אירועים', href: '/events' },
    { name: 'גלריה', href: '/gallery' },
    { name: 'צור קשר', href: '/contact' },
  ];

  const policyLinks: FooterLink[] = [
    { name: 'תנאי שימוש', href: '/terms' },
    { name: 'מדיניות פרטיות', href: '/privacy' },
    { name: 'שאלות נפוצות', href: '/faq' },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-primary/80 to-primary/90 backdrop-blur-md border-t border-white/10 text-gray-800 rtl" dir="rtl">
      <div className="neumorphic-container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <h2 className="text-2xl font-bold text-gray-900">בית קפה גמא</h2>
              <div className="h-1 w-16 bg-secondary rounded-full my-2"></div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              בית קפה גמא הוא מקום מפגש ייחודי המציע חוויה קולינרית מיוחדת באווירה חמה ומזמינה. אנו מתמחים בקפה איכותי ומאפים טריים.
            </p>
            <div className="flex space-x-4 space-x-reverse mt-4">
              <SocialIcon icon={<FaFacebook />} href="https://facebook.com" label="פייסבוק" />
              <SocialIcon icon={<FaInstagram />} href="https://instagram.com" label="אינסטגרם" />
              <SocialIcon icon={<FaTwitter />} href="https://twitter.com" label="טוויטר" />
              <SocialIcon icon={<FaWhatsapp />} href="https://whatsapp.com" label="וואטסאפ" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">ניווט מהיר</h3>
            <div className="h-1 w-12 bg-secondary rounded-full mb-4"></div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <FooterNavLink href={link.href} name={link.name} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">צור קשר</h3>
            <div className="h-1 w-12 bg-secondary rounded-full mb-4"></div>
            <ul className="space-y-3">
              <li>
                <ContactItem 
                  icon={<FaMapMarkerAlt />} 
                  content="רחוב הזית 42, תל אביב" 
                />
              </li>
              <li>
                <ContactItem 
                  icon={<FaPhone />} 
                  content="03-1234567" 
                  href="tel:+97231234567" 
                />
              </li>
              <li>
                <ContactItem 
                  icon={<FaEnvelope />} 
                  content="info@gamacafe.co.il" 
                  href="mailto:info@gamacafe.co.il" 
                />
              </li>
              <li className="pt-2">
                <p className="text-gray-700">
                  <span className="font-semibold">שעות פעילות:</span><br />
                  א'-ה': 08:00-22:00<br />
                  ו': 08:00-16:00<br />
                  שבת: 10:00-22:00
                </p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">הישארו מעודכנים</h3>
            <div className="h-1 w-12 bg-secondary rounded-full mb-4"></div>
            <p className="text-gray-700">הירשמו לניוזלטר שלנו וקבלו עדכונים על אירועים מיוחדים והטבות.</p>
            
            {isSubscribed ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glassmorphism-card p-4 rounded-lg text-center"
              >
                <p className="text-green-700 font-medium">תודה שנרשמת! 🎉</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex flex-col space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="כתובת אימייל"
                    required
                    className="neumorphic-input w-full px-4 py-2 rounded-lg focus:outline-none"
                    aria-label="כתובת אימייל לניוזלטר"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="neumorphic-button bg-secondary text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    הרשמה
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="glassmorphism-divider my-8 h-px w-full"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-700 mb-4 md:mb-0">
            © {new Date().getFullYear()} בית קפה גמא. כל הזכויות שמורות.
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {policyLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href, label }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="neumorphic-social-icon flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:text-secondary transition-colors"
    >
      {icon}
    </motion.a>
  );
};

interface FooterNavLinkProps {
  href: string;
  name: string;
}

const FooterNavLink: React.FC<FooterNavLinkProps> = ({ href, name }) => {
  return (
    <motion.a
      whileHover={{ x: 5 }}
      href={href}
      className="inline-block text-gray-700 hover:text-secondary transition-colors"
    >
      → {name}
    </motion.a>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  content: string;
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, content, href }) => {
  const ContentElement = () => (
    <div className="flex items-center">
      <span className="text-secondary mr-2">{icon}</span>
      <span>{content}</span>
    </div>
  );

  return href ? (
    <a href={href} className="text-gray-700 hover:text-secondary transition-colors">
      <ContentElement />
    </a>
  ) : (
    <div className="text-gray-700">
      <ContentElement />
    </div>
  );
};

export default Footer;