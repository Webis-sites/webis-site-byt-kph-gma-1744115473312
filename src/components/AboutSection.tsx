'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';

const AboutSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-primary text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="glassmorphism-container p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md z-0"></div>
          
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative z-10"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-secondary-dark neumorphic-text">
                אודות בית קפה גמא
              </h2>
              <div className="w-24 h-1 bg-secondary rounded-full mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              <motion.div variants={itemVariants} className="order-2 md:order-1">
                <p className="text-lg mb-6 leading-relaxed">
                  ברוכים הבאים לבית קפה גמא, המקום שהפך למוסד קולינרי בלב העיר. כבר למעלה מעשור אנחנו מגישים קפה איכותי, מאפים טריים ואוכל מעולה בסביבה חמה ומזמינה.
                </p>
                <p className="text-lg mb-6 leading-relaxed">
                  הסיפור שלנו התחיל ב-2010, כאשר שני חברים עם חלום משותף החליטו להקים מקום שמשלב את האהבה לקפה איכותי עם אווירה ביתית. מאז, הפכנו למקום מפגש אהוב על תושבי האזור והמבקרים.
                </p>
                
                <div className="neumorphic-card p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-secondary-dark">המומחיות שלנו</h3>
                  <p className="leading-relaxed">
                    אנו מתמחים בקפה ממקורות אתיים, קלוי בקפידה ומוגש במקצועיות. הצוות שלנו עובר הכשרה מקיפה כדי להבטיח שכל כוס קפה תהיה מושלמת.
                  </p>
                </div>

                <motion.button 
                  className="neumorphic-button px-8 py-3 rounded-full text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  בואו להכיר אותנו
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants} className="order-1 md:order-2 flex flex-col gap-4">
                <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl glassmorphism-card">
                  <Image
                    src="/images/cafe-interior.jpg"
                    alt="בית קפה גמא - פנים המקום"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <p className="p-4 text-white text-sm">האווירה החמימה של בית הקפה שלנו</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-40 w-full overflow-hidden rounded-2xl glassmorphism-card">
                    <Image
                      src="/images/barista.jpg"
                      alt="הבריסטה המקצועי שלנו"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-40 w-full overflow-hidden rounded-2xl glassmorphism-card">
                    <Image
                      src="/images/coffee.jpg"
                      alt="הקפה המשובח שלנו"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { number: '10+', label: 'שנות ניסיון', icon: '☕' },
                  { number: '1000+', label: 'לקוחות קבועים', icon: '👥' },
                  { number: '50+', label: 'סוגי קפה', icon: '🌱' }
                ].map((stat, index) => (
                  <div key={index} className="glassmorphism-stat-card p-6 text-center">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold mb-1 text-secondary-dark">{stat.number}</div>
                    <div className="text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;