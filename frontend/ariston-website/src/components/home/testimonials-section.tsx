'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    rating: 5,
    content:
      'Absolutely wonderful experience! The rooms were immaculate, staff was incredibly friendly, and the location was perfect. Will definitely return.',
    date: '2024-01-15',
    image: '/images/testimonial-1.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    content:
      'Outstanding service and beautiful rooms. The breakfast was delicious and the amenities exceeded our expectations. Highly recommended!',
    date: '2024-01-10',
    image: '/images/testimonial-2.jpg',
  },
  {
    id: 3,
    name: 'Fatima Hassan',
    rating: 5,
    content:
      'A truly luxurious experience. From check-in to check-out, everything was perfect. The attention to detail is remarkable. Best hotel stay in years!',
    date: '2024-01-05',
    image: '/images/testimonial-3.jpg',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 px-4 bg-primary-900 dark:bg-gray-950 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 dark:bg-primary-700 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600 dark:bg-primary-800 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Guest Testimonials
          </h2>
          <p className="text-lg text-primary-100 dark:text-gray-400">
            Hear what our guests have to say about their experience
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/10">
              <div className="flex justify-center mb-6">
                <div className="bg-primary-600 dark:bg-primary-700 p-4 rounded-full">
                  <Quote className="w-8 h-8 " />
                </div>
              </div>

              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentTestimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-400 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>

              <p className=" text-lg md:text-xl text-center mb-8 leading-relaxed font-light italic">
                &ldquo;{currentTestimonial.content}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-primary-500 dark:border-primary-600"
                  style={{
                    backgroundImage: `url('${currentTestimonial.image}')`,
                    backgroundColor: '#be7350',
                  }}
                />
                <div className="text-left">
                  <p className=" font-semibold text-lg">{currentTestimonial.name}</p>
                  <p className="text-primary-200 dark:text-gray-400 text-sm">
                    {new Date(currentTestimonial.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-500 dark:bg-primary-400 w-8'
                      : 'bg-white/30 dark:bg-white/20 hover:bg-white/50 dark:hover:bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="/testimonials"
            className="inline-block px-8 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm border-2 border-white/30 dark:border-white/20 rounded-md hover:bg-white hover:text-primary-900 dark:hover:bg-white/20 transition-all duration-300 font-medium"
          >
            View All Testimonials
          </a>
        </motion.div>
      </div>
    </section>
  );
}