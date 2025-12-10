import Header from '@/components/home/header';
import HeroSection from '@/components/home/hero-section';
import AmenitiesSection from '@/components/home/amenities-section';
import RoomsSection from '@/components/home/rooms-section';
import ServicesSection from '@/components/home/services-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import Footer from '@/components/home/footer';
import WhatsAppButton from '@/components/home/whatsapp-button';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AmenitiesSection />
        <RoomsSection />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}