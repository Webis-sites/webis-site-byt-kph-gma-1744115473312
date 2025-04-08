'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const MenuHighlights: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "קפה גמא מיוחד",
      description: "קפה ערביקה משובח עם תערובת סודית של הבית, מוגש עם קצף חלב קטיפתי",
      price: "₪18",
      image: "/images/special-coffee.jpg",
      category: "משקאות חמים"
    },
    {
      id: 2,
      name: "קרואסון שקדים",
      description: "קרואסון חמאה טרי במילוי קרם שקדים עשיר, אפוי במקום",
      price: "₪24",
      image: "/images/almond-croissant.jpg",
      category: "מאפים"
    },
    {
      id: 3,
      name: "סלט ים תיכוני",
      description: "ירקות טריים, זיתי קלמטה, גבינת פטה וזעתר מקומי בשמן זית כתית מעולה",
      price: "₪42",
      image: "/images/mediterranean-salad.jpg",
      category: "ארוחות קלות"
    },
    {
      id: 4,
      name: "שקשוקה גמא",
      description: "ביצים טריות ברוטב עגבניות ביתי עם תבלינים מיוחדים, מוגש עם טחינה ולחם מחמצת",
      price: "₪48",
      image: "/images/shakshuka.jpg",
      category: "ארוחות בוקר"
    },
    {
      id: 5,
      name: "קינוח פיסטוק",
      description: "מוס פיסטוק קטיפתי על בסיס דקואז שקדים עם ציפוי מראה ופיסטוקים מקורמלים",
      price: "₪32",
      image: "/images/pistachio-dessert.jpg",
      category: "קינוחים"
    },
    {
      id: 6,
      name: "סמוזי פירות יער",
      description: "תערובת פירות יער טריים עם יוגורט, דבש ופירות עונתיים",
      price: "₪28",
      image: "/images/berry-smoothie.jpg",
      category: "משקאות קרים"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-primary text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-secondary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            המנות המובילות שלנו
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-secondary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            טעמו ממבחר המנות הייחודיות של בית קפה גמא, מוכנות מחומרי גלם טריים ואיכותיים
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative group"
              variants={itemVariants}
              whileHover="hover"
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className="menu-card rounded-2xl overflow-hidden h-[400px] relative flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                
                <div className="card-glass-content absolute bottom-0 left-0 right-0 p-6 z-20 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary/90 backdrop-blur-sm text-white">
                      {item.category}
                    </span>
                    <span className="text-xl font-bold text-white">{item.price}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeItem === item.id ? 'auto' : 0,
                      opacity: activeItem === item.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/90 mb-4">{item.description}</p>
                    <button className="neumorphic-button text-secondary font-medium py-2 px-4 rounded-lg inline-flex items-center">
                      <span>הזמן עכשיו</span>
                      <FaArrowLeft className="mr-2 text-sm" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/menu">
            <motion.button 
              className="view-menu-button py-4 px-8 rounded-xl text-lg font-bold text-white bg-secondary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              לתפריט המלא
              <FaArrowLeft className="mr-2" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuHighlights;