'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FaCalendarAlt } from 'react-icons/fa';
import clsx from 'clsx';

interface NavBarProps {
  logo?: string;
}

const NavBar: React.FC<NavBarProps> = ({ logo = '/images/logo.png' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'דף הבית', href: '/' },
    { name: 'תפריט', href: '/menu' },
    { name: 'אודות', href: '/about' },
    { name: 'יצירת קשר', href: '/contact' },
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 dir-rtl',
        'backdrop-blur-md bg-opacity-80 border-b border-primary/10',
        isScrolled ? 'bg-white/80 shadow-nav py-2' : 'bg-transparent py-4'
      )}
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className="relative z-10 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logo} alt="בית קפה גמא" className="h-12 md:h-14" />
            <span className="mr-2 text-xl font-bold text-primary">בית קפה גמא</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={clsx(
                  'px-4 py-2 mx-1 rounded-xl font-medium text-gray-700 transition-all',
                  'hover:text-primary relative overflow-hidden',
                  'neumorphic-link focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.name}
              </motion.a>
            ))}
            
            <motion.a
              href="/booking"
              className={clsx(
                'glass-button ml-4 px-5 py-2 rounded-xl font-medium',
                'bg-gradient-to-r from-primary/90 to-secondary/90 text-white',
                'hover:shadow-lg transition-all duration-300',
                'flex items-center justify-center space-x-2 space-x-reverse',
                'focus:outline-none focus:ring-2 focus:ring-primary/50'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendarAlt className="ml-2" />
              <span>הזמנת מקום</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
              onClick={toggleMenu}
              className={clsx(
                'p-2 rounded-full neumorphic-button',
                'text-gray-700 hover:text-primary',
                'focus:outline-none focus:ring-2 focus:ring-primary/50'
              )}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel bg-white/90 backdrop-blur-md border-t border-primary/10"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      'px-4 py-3 rounded-xl font-medium text-gray-700',
                      'hover:bg-primary/5 hover:text-primary transition-all',
                      'neumorphic-link-mobile focus:outline-none focus:ring-2 focus:ring-primary/50'
                    )}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="/booking"
                  className={clsx(
                    'glass-button px-4 py-3 rounded-xl font-medium',
                    'bg-gradient-to-r from-primary/90 to-secondary/90 text-white',
                    'flex items-center justify-center',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50'
                  )}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                >
                  <FaCalendarAlt className="ml-2" />
                  <span>הזמנת מקום</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;