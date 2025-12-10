'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const heroSlides = [
  {
    id: 1,
    title: 'Ariston Suites',
    subtitle: 'Experience luxury and comfort in every moment',
    image: '/images/hero-1.jpg',
  },
  {
    id: 2,
    title: 'Boutique Luxury',
    subtitle: 'Where elegance meets modern comfort',
    image: '/images/hero-2.jpg',
  },
  {
    id: 3,
    title: 'Your Home Away From Home',
    subtitle: 'Unforgettable experiences await you',
    image: '/images/hero-3.jpg',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              priority={currentSlide === 0}
              quality={85}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <div className="text-center text-white">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6"
              >
                <h1 className="font-display text-5xl font-bold md:text-7xl lg:text-8xl">
                  {heroSlides[currentSlide].title}
                </h1>
              </motion.div>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-12 text-lg md:text-xl lg:text-2xl text-primary-100"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <a
                  href="#rooms"
                  className="px-8 py-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Rooms
                </a>
                <a
                  href="https://wa.me/+923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-primary-900 rounded-md hover:bg-primary-50 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Book Now
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute top-24 right-8 bg-white rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-2xl"
          >
            <div className="text-center">
              <p className="text-primary-900 font-bold text-sm md:text-base">BEST RATE</p>
              <p className="text-primary-900 font-bold text-sm md:text-base">GUARANTEED</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}