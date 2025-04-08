'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteRight, FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';

interface Testimonial {
  id: number;
  name: string;
  quote: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'רונית לוי',
    quote: 'בית קפה גמא הוא המקום האהוב עלי לשבת ולעבוד. האווירה נעימה והקפה מצוין!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'יוסי כהן',
    quote: 'העוגות הטריות והקפה האיכותי הופכים כל ביקור לחוויה מיוחדת. ממליץ בחום!',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'מיכל אברהם',
    quote: 'המקום הכי טוב בשכונה! השירות אדיב, המחירים הוגנים והאוכל טעים ביותר.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 4,
    name: 'דוד שמעוני',
    quote: 'אני מגיע לבית קפה גמא כבר שנים, והאיכות תמיד נשארת ברמה גבוהה. מקום מושלם לפגישות עסקיות.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 5,
    name: 'נועה גולן',
    quote: 'הקרואסונים הטריים והקפה המשובח הם הסיבה שאני חוזרת לכאן בכל בוקר. פשוט מעולה!',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 6,
    name: 'אלון ברק',
    quote: 'האווירה הנעימה והעיצוב המיוחד הופכים את בית קפה גמא למקום מושלם לבלות בו שעות. ממליץ!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }
];

const TestimonialsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

  const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - itemsPerView ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - itemsPerView : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    if (autoplay) {
      startAutoplay();
    }
    
    return () => {
      stopAutoplay();
    };
  }, [autoplay, currentIndex]);

  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0
    })
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);
  
  // If we need to wrap around to the beginning
  if (visibleTestimonials.length < itemsPerView) {
    visibleTestimonials.push(...testimonials.slice(0, itemsPerView - visibleTestimonials.length));
  }

  return (
    <div className="relative w-full py-12 px-4 md:px-8 bg-primary text-right overflow-hidden" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">מה הלקוחות שלנו אומרים</h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div 
          className="relative glassmorphism-container rounded-2xl p-6 md:p-8 mb-10"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div 
                key={currentIndex}
                className="flex flex-wrap justify-center gap-6"
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <div 
                    key={`${testimonial.id}-${index}`} 
                    className={clsx(
                      "neumorphic-card relative flex flex-col",
                      "w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]",
                      "rounded-xl p-6 transition-all duration-300 hover:scale-105"
                    )}
                  >
                    <div className="absolute top-4 right-4 text-secondary opacity-30">
                      <FaQuoteRight size={24} />
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {testimonial.image ? (
                        <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full border-2 border-secondary">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 mr-4 rounded-full bg-secondary/20 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-700">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < testimonial.rating ? "text-yellow-500" : "text-gray-300"} 
                              size={16}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 flex-grow mb-4 leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.slice(0, testimonials.length - itemsPerView + 1).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={clsx(
                  "neumorphic-dot w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-secondary scale-125" : "bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prevSlide}
            className="neumorphic-button absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-gray-700" size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="neumorphic-button absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-gray-700" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;