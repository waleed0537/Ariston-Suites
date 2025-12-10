'use client';

import { motion } from 'framer-motion';
import { Wifi, Coffee, Car, Shield, Clock, Sparkles, Wind, Key } from 'lucide-react';

const amenities = [
  {
    icon: Wifi,
    title: 'High-Speed WiFi',
    description: 'Complimentary high-speed internet throughout the property',
  },
  {
    icon: Coffee,
    title: 'Breakfast',
    description: 'Delicious complimentary breakfast served daily',
  },
  {
    icon: Car,
    title: 'Free Parking',
    description: 'Ample secure parking space for all guests',
  },
  {
    icon: Shield,
    title: '24/7 Security',
    description: 'Round-the-clock security for your peace of mind',
  },
  {
    icon: Clock,
    title: 'Front Desk',
    description: '24-hour front desk service and assistance',
  },
  {
    icon: Sparkles,
    title: 'Housekeeping',
    description: 'Daily housekeeping and laundry services',
  },
  {
    icon: Wind,
    title: 'Climate Control',
    description: 'Individual climate control in all rooms',
  },
  {
    icon: Key,
    title: 'RFID Access',
    description: 'Modern RFID key card room access system',
  },
];

export default function AmenitiesSection() {
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
            Our Amenities
          </h2>
          <p className="text-lg text-accent-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience luxury and comfort with our exceptional facilities and services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary-900/20 transition-shadow duration-300 group"
              >
                <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-full group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold text-xl text-primary-900 dark:text-white mb-2">
                  {amenity.title}
                </h3>
                <p className="text-accent-600 dark:text-gray-400 text-sm">{amenity.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}