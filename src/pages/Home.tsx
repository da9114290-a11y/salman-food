/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CartSidebar } from '../components/cart/CartSidebar';
import { HeroSection } from '../components/sections/HeroSection';
import { MenuSection } from '../components/sections/MenuSection';
import { DealsSection } from '../components/sections/DealsSection';
import { AboutSection } from '../components/sections/AboutSection';
import { LocationSection } from '../components/sections/LocationSection';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ToastContainer } from '../components/ui/ToastNotification';
import { StickyOrderButton } from '../components/ui/StickyOrderButton';
import { ScrollAnimationWrapper } from '../components/ui/ScrollAnimationWrapper';
import { PWAInstallBanner } from '../components/ui/PWAInstallBanner';
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp';
import { CookieConsent } from '../components/ui/CookieConsent';
import { generateRestaurantSchema } from '../lib/structured-data';

export const Home: React.FC = () => {
  const restaurantSchema = generateRestaurantSchema();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <LoadingScreen />
      <ToastContainer />
      <PWAInstallBanner />
      <FloatingWhatsApp />
      <CookieConsent />
      <div className="lg:hidden">
        <StickyOrderButton />
      </div>
      
      <Navbar />
      <CartSidebar />
      
      <main className="flex-grow">
        <section id="hero">
          <HeroSection />
        </section>
        
        <ScrollAnimationWrapper id="menu" animation="fadeUp" className="bg-brand-light">
          <MenuSection />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper id="deals" animation="slideLeft">
          <DealsSection />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper id="about" animation="slideRight" className="bg-brand-light">
          <AboutSection />
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper id="locations" animation="fadeUp">
          <LocationSection />
        </ScrollAnimationWrapper>
      </main>

      <Footer />
    </div>
  );
};
