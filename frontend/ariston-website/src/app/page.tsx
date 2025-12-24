import AmenitiesSection from '@/components/home/amenities-section';
import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import HeroSection from '@/components/home/hero-section';
import RoomsSection from '@/components/home/rooms-section';
import ServicesSection from '@/components/home/services-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import { ThemeProvider } from '@/components/home/theme-provider';
import WhatsAppButton from '@/components/home/whatsapp-button';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main>
          <HeroSection />
          <RoomsSection />
          <AmenitiesSection />
          <ServicesSection />
          <TestimonialsSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}
