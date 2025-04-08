'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';

export type CardVariant = 'basic' | 'featured' | 'horizontal' | 'glass' | 'neumorphic';
export type CardSize = 'small' | 'medium' | 'large';

export interface CardProps {
  /** Card variant style */
  variant?: CardVariant;
  /** Card size */
  size?: CardSize;
  /** Card title */
  title?: string;
  /** Card description */
  description?: string;
  /** Image URL */
  imageUrl?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Card action button text */
  buttonText?: string;
  /** Card action button onClick handler */
  onButtonClick?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** RTL support */
  rtl?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'basic',
  size = 'medium',
  title,
  description,
  imageUrl,
  imageAlt = '',
  buttonText,
  onButtonClick,
  className,
  rtl = false,
  children,
}) => {
  // Base card animations
  const cardAnimations = {
    whileHover: { 
      y: -5,
      transition: { duration: 0.3 }
    },
    whileTap: { 
      y: 0,
      transition: { duration: 0.1 }
    }
  };

  // Size classes
  const sizeClasses = {
    small: 'max-w-xs',
    medium: 'max-w-sm',
    large: 'max-w-md',
  };

  // Direction classes
  const directionClass = rtl ? 'rtl text-right' : 'ltr text-left';

  // Variant specific classes
  const variantClasses = {
    basic: 'bg-white rounded-xl shadow-md overflow-hidden',
    featured: 'bg-white rounded-xl shadow-lg overflow-hidden border-2 border-secondary',
    horizontal: 'bg-white rounded-xl shadow-md overflow-hidden flex flex-row',
    glass: 'backdrop-blur-md bg-white/30 rounded-xl border border-white/20 shadow-glass overflow-hidden',
    neumorphic: 'bg-neumorphic rounded-xl shadow-neumorphic overflow-hidden'
  };

  // Image container classes
  const imageContainerClasses = {
    basic: 'w-full h-48 relative',
    featured: 'w-full h-56 relative',
    horizontal: 'w-1/3 relative',
    glass: 'w-full h-48 relative',
    neumorphic: 'w-full h-48 relative'
  };

  // Content container classes
  const contentContainerClasses = {
    basic: 'p-5',
    featured: 'p-6',
    horizontal: 'p-5 w-2/3',
    glass: 'p-5',
    neumorphic: 'p-5'
  };

  // Button classes
  const buttonClasses = {
    basic: 'mt-4 px-4 py-2 bg-primary text-black rounded-lg hover:bg-secondary transition-colors duration-300',
    featured: 'mt-4 px-5 py-2.5 bg-secondary text-black rounded-lg hover:bg-primary transition-colors duration-300',
    horizontal: 'mt-4 px-4 py-2 bg-primary text-black rounded-lg hover:bg-secondary transition-colors duration-300',
    glass: 'mt-4 px-4 py-2 backdrop-blur-md bg-white/40 border border-white/30 rounded-lg hover:bg-white/60 transition-colors duration-300',
    neumorphic: 'mt-4 px-4 py-2 bg-neumorphic shadow-neumorphic-inset rounded-lg active:shadow-neumorphic-pressed transition-all duration-300'
  };

  // Title classes
  const titleClasses = {
    basic: 'text-xl font-bold mb-2',
    featured: 'text-2xl font-bold mb-3',
    horizontal: 'text-xl font-bold mb-2',
    glass: 'text-xl font-bold mb-2',
    neumorphic: 'text-xl font-bold mb-2'
  };

  // Description classes
  const descriptionClasses = {
    basic: 'text-gray-700',
    featured: 'text-gray-700',
    horizontal: 'text-gray-700',
    glass: 'text-gray-800',
    neumorphic: 'text-gray-700'
  };

  return (
    <motion.div
      className={clsx(
        sizeClasses[size],
        variantClasses[variant],
        directionClass,
        'transition-all duration-300',
        className
      )}
      {...cardAnimations}
    >
      {variant === 'horizontal' ? (
        <div className="flex flex-col md:flex-row">
          {imageUrl && (
            <div className={imageContainerClasses[variant]}>
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className={contentContainerClasses[variant]}>
            {title && <h3 className={titleClasses[variant]}>{title}</h3>}
            {description && <p className={descriptionClasses[variant]}>{description}</p>}
            {children}
            {buttonText && (
              <button
                onClick={onButtonClick}
                className={buttonClasses[variant]}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {imageUrl && (
            <div className={imageContainerClasses[variant]}>
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className={contentContainerClasses[variant]}>
            {title && <h3 className={titleClasses[variant]}>{title}</h3>}
            {description && <p className={descriptionClasses[variant]}>{description}</p>}
            {children}
            {buttonText && (
              <button
                onClick={onButtonClick}
                className={buttonClasses[variant]}
              >
                {buttonText}
              </button>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Card;