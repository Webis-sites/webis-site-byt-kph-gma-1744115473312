'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaUtensils, FaCalendarAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import clsx from 'clsx';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  learnMoreUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, image, learnMoreUrl }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl h-[400px] md:h-[450px] w-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glassmorphism card */}
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent backdrop-blur-sm border border-white/10 h-full">
        <div className="neumorphic-icon mb-4 w-16 h-16 flex items-center justify-center text-2xl text-primary bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-neumorphic">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        <motion.a
          href={learnMoreUrl}
          className="neumorphic-button inline-block py-2 px-4 rounded-lg text-primary bg-white/10 backdrop-blur-md border border-white/20 shadow-neumorphic w-fit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          למידע נוסף
        </motion.a>
      </div>
      
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coffee' | 'food' | 'events'>('coffee');
  
  const services = {
    coffee: [
      {
        title: "קפה מיוחד",
        description: "אנו מגישים קפה איכותי מפולים הנבחרים בקפידה מרחבי העולם, קלויים בעדינות לטעם מושלם.",
        icon: <FaCoffee />,
        image: "/images/specialty-coffee.jpg",
        learnMoreUrl: "/services/specialty-coffee"
      },
      {
        title: "ברויר וקמקס",
        description: "שיטות חליטה מיוחדות המדגישות את הטעמים העדינים של הקפה שלנו.",
        icon: <FaCoffee />,
        image: "/images/brewing-methods.jpg",
        learnMoreUrl: "/services/brewing-methods"
      }
    ],
    food: [
      {
        title: "מאפים טריים",
        description: "מאפים טריים הנאפים במקום מדי יום, מתוקים ומלוחים.",
        icon: <FaUtensils />,
        image: "/images/fresh-pastries.jpg",
        learnMoreUrl: "/services/pastries"
      },
      {
        title: "ארוחות בוקר",
        description: "ארוחות בוקר עשירות המוגשות עם מיטב המרכיבים הטריים.",
        icon: <FaUtensils />,
        image: "/images/breakfast.jpg",
        learnMoreUrl: "/services/breakfast"
      }
    ],
    events: [
      {
        title: "אירועים פרטיים",
        description: "אירוח אירועים פרטיים עד 30 איש בחלל מעוצב ואינטימי.",
        icon: <FaCalendarAlt />,
        image: "/images/private-events.jpg",
        learnMoreUrl: "/services/private-events"
      },
      {
        title: "קייטרינג",
        description: "שירותי קייטרינג לאירועים קטנים עם מגוון מנות מהתפריט שלנו.",
        icon: <FaCalendarAlt />,
        image: "/images/catering.jpg",
        learnMoreUrl: "/services/catering"
      }
    ]
  };

  const tabVariants = {
    active: { 
      y: 0, 
      opacity: 1,
      boxShadow: "var(--shadow-neumorphic-active)",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    inactive: { 
      y: 0, 
      opacity: 0.7,
      boxShadow: "var(--shadow-neumorphic)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-primary/5 to-secondary/5" dir="rtl">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            השירותים שלנו
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-secondary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.7 }}
          />
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            בבית קפה גמא אנו מציעים מגוון שירותים איכותיים, מקפה משובח ועד אירוח אירועים מיוחדים
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 space-x-4 rtl:space-x-reverse">
          {[
            { id: 'coffee', label: 'קפה', icon: <FaCoffee className="ml-2" /> },
            { id: 'food', label: 'אוכל', icon: <FaUtensils className="ml-2" /> },
            { id: 'events', label: 'אירועים', icon: <FaCalendarAlt className="ml-2" /> }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'coffee' | 'food' | 'events')}
              className={clsx(
                "flex items-center py-3 px-6 rounded-xl border border-white/20 backdrop-blur-sm transition-all",
                "text-gray-800 font-medium",
                activeTab === tab.id ? "bg-white/15" : "bg-white/5 hover:bg-white/10"
              )}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab.id ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                {tab.icon}
                {tab.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Service Cards */}
        <motion.div
          key={activeTab}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services[activeTab].map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-12 space-x-4 rtl:space-x-reverse">
          <motion.button
            className="neumorphic-button w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-neumorphic text-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const tabs = ['coffee', 'food', 'events'] as const;
              const currentIndex = tabs.indexOf(activeTab);
              const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
              setActiveTab(tabs[prevIndex]);
            }}
          >
            <FaArrowRight />
          </motion.button>
          <motion.button
            className="neumorphic-button w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-neumorphic text-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const tabs = ['coffee', 'food', 'events'] as const;
              const currentIndex = tabs.indexOf(activeTab);
              const nextIndex = (currentIndex + 1) % tabs.length;
              setActiveTab(tabs[nextIndex]);
            }}
          >
            <FaArrowLeft />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;