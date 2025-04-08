'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

const AtmosphereGallery: React.FC = () => {
  // Sample gallery images - replace with your actual café images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/images/cafe-interior-1.jpg',
      alt: 'בית קפה גמא - אזור ישיבה מרכזי',
      caption: 'אזור הישיבה המרכזי עם תאורה טבעית'
    },
    {
      id: 2,
      src: '/images/cafe-interior-2.jpg',
      alt: 'בית קפה גמא - פינת ספות',
      caption: 'פינת הספות הנוחה שלנו'
    },
    {
      id: 3,
      src: '/images/cafe-interior-3.jpg',
      alt: 'בית קפה גמא - הבר',
      caption: 'הבר שלנו עם מבחר משקאות עשיר'
    },
    {
      id: 4,
      src: '/images/cafe-interior-4.jpg',
      alt: 'בית קפה גמא - פינת עבודה',
      caption: 'פינת העבודה השקטה'
    },
    {
      id: 5,
      src: '/images/cafe-interior-5.jpg',
      alt: 'בית קפה גמא - בשעות הערב',
      caption: 'האווירה הקסומה בשעות הערב'
    },
    {
      id: 6,
      src: '/images/cafe-interior-6.jpg',
      alt: 'בית קפה גמא - פרטי עיצוב',
      caption: 'פרטי העיצוב הייחודיים שלנו'
    },
  ];

  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

  // Number of images to show in the grid based on screen size
  const getVisibleImages = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const handleImageClick = (image: GalleryImage) => {
    setActiveImage(image);
  };

  const handleCloseZoom = () => {
    setActiveImage(null);
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - getVisibleImages() ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - getVisibleImages() : prevIndex - 1
    );
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Visible images based on current index and screen size
  const visibleCount = getVisibleImages();
  const visibleImages = galleryImages.slice(currentIndex, currentIndex + visibleCount);
  
  // If we don't have enough images at the end, wrap around to the beginning
  if (visibleImages.length < visibleCount) {
    visibleImages.push(...galleryImages.slice(0, visibleCount - visibleImages.length));
  }

  return (
    <div className="rtl-support w-full py-12 px-4 md:px-8 overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800">
          האווירה שלנו
        </h2>
        
        <div 
          ref={galleryRef}
          className="relative w-full overflow-hidden rounded-2xl backdrop-blur-sm bg-white/30 p-6 border border-white/20 shadow-glass"
        >
          {/* Navigation buttons */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 z-10 transform -translate-y-1/2 neumorphic-button p-2 rounded-full text-amber-800"
            aria-label="תמונה קודמת"
          >
            <FiChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 z-10 transform -translate-y-1/2 neumorphic-button p-2 rounded-full text-amber-800"
            aria-label="תמונה הבאה"
          >
            <FiChevronRight size={24} />
          </button>
          
          {/* Gallery grid */}
          <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div 
                key={currentIndex}
                custom={direction}
                initial={{ 
                  x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
                  opacity: 0 
                }}
                animate={{ 
                  x: 0,
                  opacity: 1 
                }}
                exit={{ 
                  x: direction < 0 ? '100%' : direction > 0 ? '-100%' : 0,
                  opacity: 0 
                }}
                transition={{ 
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 }
                }}
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {visibleImages.map((image) => (
                  <div 
                    key={image.id}
                    className="relative group overflow-hidden rounded-xl neumorphic-card"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 w-full p-4">
                          <p className="text-white text-sm md:text-base font-medium">{image.caption}</p>
                        </div>
                        <button 
                          onClick={() => handleImageClick(image)}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors duration-300"
                          aria-label="הגדל תמונה"
                        >
                          <FiZoomIn size={20} className="text-white" />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Image indicators */}
          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 neumorphic-dot ${
                  index >= currentIndex && index < currentIndex + visibleCount
                    ? 'bg-amber-600 scale-125'
                    : 'bg-amber-300'
                }`}
                aria-label={`עבור לתמונה ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Zoomed image modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseZoom}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] glassmorphism p-2 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeImage.src} 
                alt={activeImage.alt} 
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-lg font-medium">{activeImage.caption}</p>
              </div>
              <button 
                onClick={handleCloseZoom}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors duration-300"
                aria-label="סגור"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AtmosphereGallery;