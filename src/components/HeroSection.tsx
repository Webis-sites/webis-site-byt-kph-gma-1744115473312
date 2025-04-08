'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  // Animation variants
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
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div
      className={clsx(
        'relative min-h-[90vh] overflow-hidden bg-primary text-right',
        className
      )}
      dir="rtl"
    >
      {/* Background coffee pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80"
          alt="קפה ברקע"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/95 backdrop-blur-sm"></div>

      {/* Main content container */}
      <motion.div
        className="container relative mx-auto flex min-h-[90vh] flex-col items-end justify-center px-6 py-12 md:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative coffee cup */}
        <motion.div
          className="absolute bottom-10 left-10 hidden md:block"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="h-32 w-32 rounded-full bg-secondary/20 backdrop-blur-md">
            <div className="neumorphic-coffee-cup h-full w-full rounded-full p-6">
              <Image
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                alt="כוס קפה"
                width={120}
                height={120}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-2xl">
          <motion.h1
            className="mb-4 text-5xl font-bold text-dark md:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            בית קפה מוביל בישראל
          </motion.h1>

          <motion.div
            className="mb-8 text-xl text-dark/80 md:text-2xl"
            variants={itemVariants}
          >
            <p>חווית לקוח מושלמת בכל ביקור</p>
          </motion.div>

          {/* Glassmorphism card */}
          <motion.div
            className="mb-12 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg"
            variants={itemVariants}
          >
            <h3 className="mb-3 text-xl font-semibold text-dark">בית קפה גמא</h3>
            <p className="text-dark/80">
              אנו מזמינים אתכם לחוויה קולינרית ייחודית במרחב מעוצב ונעים. קפה איכותי,
              מאפים טריים ואווירה מושלמת לפגישות עסקים, מפגשים חברתיים או רגעי רוגע אישיים.
            </p>
          </motion.div>

          {/* CTA Button - Neumorphic style */}
          <motion.button
            className="neumorphic-button rounded-xl bg-secondary px-8 py-4 text-lg font-bold text-white transition-all"
            variants={{ ...itemVariants, ...buttonVariants }}
            whileHover="hover"
            whileTap="tap"
          >
            קבע תור עכשיו
          </motion.button>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute right-10 top-20 h-24 w-24 rounded-full bg-secondary/30 backdrop-blur-md"
          variants={floatingVariants}
          animate="animate"
          custom={1}
        ></motion.div>
        <motion.div
          className="absolute right-32 top-40 h-12 w-12 rounded-full bg-secondary/20 backdrop-blur-md"
          variants={floatingVariants}
          animate="animate"
          custom={2}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;