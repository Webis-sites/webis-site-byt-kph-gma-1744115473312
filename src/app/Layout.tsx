'use client';

import React from 'react';
import Head from 'next/head';
import { Heebo } from 'next/font/google';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// Define the Heebo font with Hebrew support
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-heebo',
});

// Define types for the Layout component props
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'בית קפה גמא',
  description = 'בית קפה גמא - מקום מפגש לאוהבי קפה איכותי, אוכל טעים ואווירה נעימה',
  keywords = 'בית קפה, קפה, אוכל, מאפים, ישראל, גמא, בית קפה גמא',
}) => {
  const router = useRouter();
  
  return (
    <div className={`${heebo.variable} font-heebo min-h-screen flex flex-col bg-primary text-dark-text rtl`} dir="rtl">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="language" content="Hebrew" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:site_name" content="בית קפה גמא" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`https://cafe-gamma.com${router.asPath}`} />
        
        {/* Schema.org markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CafeOrCoffeeShop',
              name: 'בית קפה גמא',
              description,
              url: 'https://cafe-gamma.com',
              telephone: '+972-XX-XXXXXXX',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'רחוב הדוגמה 123',
                addressLocality: 'תל אביב',
                postalCode: '6100000',
                addressCountry: 'IL',
              },
              servesCuisine: 'קפה, מאפים, ארוחות בוקר',
              priceRange: '₪₪',
              openingHours: 'Su-Th 08:00-22:00, Fr 08:00-14:00',
            }),
          }}
        />
      </Head>

      <header className="sticky top-0 z-50">
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-nav px-6 py-4 flex justify-between items-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="logo-container neumorphic-logo"
          >
            <a href="/" className="text-2xl font-bold text-secondary">בית קפה גמא</a>
          </motion.div>
          
          <div className="flex space-x-1 space-x-reverse">
            {['תפריט', 'אודות', 'אירועים', 'צור קשר'].map((item) => (
              <motion.a
                key={item}
                href={`/${item === 'תפריט' ? 'menu' : item === 'אודות' ? 'about' : item === 'אירועים' ? 'events' : 'contact'}`}
                className="neumorphic-button px-4 py-2 rounded-xl text-dark-text hover:text-secondary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="glass-footer mt-auto py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="neumorphic-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-secondary">שעות פתיחה</h3>
              <ul>
                <li className="mb-2">ראשון - חמישי: 08:00 - 22:00</li>
                <li className="mb-2">שישי: 08:00 - 14:00</li>
                <li>שבת: סגור</li>
              </ul>
            </div>
            
            <div className="neumorphic-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-secondary">צור קשר</h3>
              <p className="mb-2">רחוב הדוגמה 123, תל אביב</p>
              <p className="mb-2">טלפון: 03-1234567</p>
              <p>דוא"ל: info@cafe-gamma.com</p>
            </div>
            
            <div className="neumorphic-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-secondary">עקבו אחרינו</h3>
              <div className="flex space-x-4 space-x-reverse">
                {['facebook', 'instagram', 'twitter'].map((social) => (
                  <motion.a
                    key={social}
                    href={`https://${social}.com/cafegamma`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neumorphic-icon w-10 h-10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">{social}</span>
                    <i className={`fab fa-${social}`} aria-hidden="true"></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p>© {new Date().getFullYear()} בית קפה גמא. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;