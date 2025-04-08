'use client';

import React from 'react';
import HeroSection from '../components/HeroSection';
import NavBar from '../components/NavBar';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import BookingSystem from '../components/BookingSystem';
import MenuHighlights from '../components/MenuHighlights';
import AtmosphereGallery from '../components/AtmosphereGallery';
import FAQSection from '../components/FAQSection';
import TestimonialsSlider from '../components/TestimonialsSlider';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SpecialEventsSection from '../components/SpecialEventsSection';
import InstagramFeed from '../components/InstagramFeed';
import NewsletterSignup from '../components/NewsletterSignup';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* כאן יתווספו הקומפוננטות שייווצרו על ידי המחולל */}
        <HeroSection />
    <NavBar />
    <AboutSection />
    <ServicesSection />
    <BookingSystem />
    <MenuHighlights />
    <AtmosphereGallery />
    <FAQSection />
    <TestimonialsSlider />
    <ContactSection />
    <Footer />
    <SpecialEventsSection />
    <InstagramFeed />
    <NewsletterSignup />
    <Layout />
    <Button />
    <Card />
  </main>
      
      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; 2025 בית קפה גמא. כל הזכויות שמורות.
        </div>
      </footer>
    </div>
  );
}