'use client';

import { motion } from 'framer-motion';
import { Utensils, Sofa, Shirt, Clock } from 'lucide-react';

const services = [
  {
    icon: Utensils,
    title: 'Reception & Services',
    description:
      'Our 24/7 reception desk is always ready to assist you with any request, from restaurant recommendations to tour bookings.',
  },
  {
    icon: Sofa,
    title: 'The Lounge',
    description:
      'Enjoy comfortably serene moments in our cozy lounge, available 24/7. Features freshness in summer and soft crackling warmth in winter.',
  },
  {
    icon: Shirt,
    title: 'Laundry & Housekeeping',
    description:
      'Professional laundry and ironing services available. Daily housekeeping ensures your room stays pristine throughout your stay.',
  },
  {
    icon: Clock,
    title: 'Concierge',
    description:
      'Our knowledgeable concierge team can help you discover the best experiences in the city and make reservations on your behalf.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-accent-600 dark:text-gray-400 max-w-2xl mx-auto">
            Exceptional services designed to make your stay unforgettable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-primary-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-accent-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center mt-4 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-40   relative h-96 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/lounge.jpg')",
              backgroundColor: '#e8d1c0',
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary-900/80 to-transparent flex items-center">
            <div className="px-8 md:px-16 max-w-2xl">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Experience Luxury
              </h3>
              <p className="text-white/90 text-lg mb-6">
                Located in the heart of the city, Ariston Suites offers you the perfect base to
                explore while enjoying world-class amenities and service.
              </p>
              <a
                href="/about"
                className="inline-block px-6 py-3 bg-white text-primary-900 rounded-md hover:bg-primary-50 transition-colors font-medium"
              >
                Discover More
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}