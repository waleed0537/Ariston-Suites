'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, Sparkles, Star, Users } from 'lucide-react';
import { useEffect, useLayoutEffect, useState } from 'react';

const rooms = [
  {
    id: 1,
    title: 'Standard Room',
    category: 'Standard',
    description: 'Comfortable and elegant room perfect for business or leisure travelers',
    price: 12000,
    capacity: 2,
    size: 25,
    image: '/images/room-standard.jpg',
    features: ['King Size Bed', 'City View', 'Free WiFi', 'Mini Bar'],
    badge: 'Popular',
    gradient: 'from-primary-600/90 to-primary-800/90',
  },
  {
    id: 2,
    title: 'Deluxe Suite',
    category: 'Deluxe',
    description: 'Spacious suite with premium amenities and stunning views',
    price: 18000,
    capacity: 2,
    size: 35,
    image: '/images/room-deluxe.jpg',
    features: ['King Size Bed', 'Separate Living Area', 'Luxury Bathroom', 'Premium Toiletries'],
    badge: 'Best Value',
    gradient: 'from-amber-600/90 to-amber-800/90',
  },
  {
    id: 3,
    title: 'King Deluxe Suite',
    category: 'King Deluxe',
    description: 'Our finest accommodation with exceptional comfort and luxury',
    price: 25000,
    capacity: 3,
    size: 45,
    image: '/images/room-king-deluxe.jpg',
    features: ['King Size Bed', 'Panoramic View', 'Jacuzzi', 'Private Balcony'],
    badge: 'Luxury',
    gradient: 'from-purple-600/90 to-purple-900/90',
  },
  {
    id: 4,
    title: 'Twin Deluxe Room',
    category: 'Twin Deluxe',
    description: 'Ideal for families or friends traveling together',
    price: 22000,
    capacity: 4,
    size: 40,
    image: '/images/room-twin-deluxe.jpg',
    features: ['Two Queen Beds', 'Family Friendly', 'Large Bathroom', 'Work Desk'],
    badge: 'Family',
    gradient: 'from-teal-600/90 to-teal-800/90',
  },
];

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function RoomsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    setVisibleCount(window.innerWidth >= 1024 ? 3 : 1);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 3 : 1);
    };

    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [mounted]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % rooms.length);
  };

  const getVisibleRooms = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(rooms[(currentIndex + i) % rooms.length]);
    }
    return items;
  };

  const visibleRooms = getVisibleRooms();

  return (
    <section
      id="rooms"
      className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200 dark:bg-accent-900/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold text-primary-900 dark:text-primary-300 uppercase tracking-wider">
              Luxury Accommodations
            </span>
          </motion.div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-900 dark:text-white mb-6">
            Our <span className="text-primary-600 dark:text-primary-400">Exquisite</span> Rooms
          </h2>
          <p className="text-xl text-accent-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in luxury with our carefully curated accommodations, where every detail
            is designed for your ultimate comfort
          </p>
        </motion.div>

        {/* Rooms Carousel */}
        <div className="relative px-4 lg:px-20">
          {mounted && visibleCount > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-gray-800 hover:bg-primary-600 dark:hover:bg-primary-600 text-primary-900 dark:text-white hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 group"
                aria-label="Previous room"
              >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white dark:bg-gray-800 hover:bg-primary-600 dark:hover:bg-primary-600 text-primary-900 dark:text-white hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 group"
                aria-label="Next room"
              >
                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </motion.button>
            </>
          )}

          <div
            className={`grid gap-8 ${
              mounted && visibleCount > 1
                ? 'grid-cols-1 lg:grid-cols-3'
                : 'grid-cols-1 max-w-2xl mx-auto'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {visibleRooms.map((room, index) => (
                <motion.div
                  key={`${room.id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.15, type: 'spring' }}
                  onMouseEnter={() => setHoveredCard(room.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative"
                >
                  {/* Glow Effect on Hover */}
                  <motion.div
                    animate={{
                      opacity: hoveredCard === room.id ? 0.3 : 0,
                      scale: hoveredCard === room.id ? 1 : 0.8,
                    }}
                    className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl blur-xl"
                  />

                  {/* Main Card - Changed to min-height with flex layout */}
                  <div className="relative min-h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white dark:bg-gray-800">
                    {/* Image Section - Reduced height slightly */}
                    <div className="relative h-64 overflow-hidden flex-shrink-0">
                      <motion.div
                        animate={{
                          scale: hoveredCard === room.id ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${room.image}')`,
                          backgroundColor: '#dab298',
                        }}
                      />

                      {/* Dynamic Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${room.gradient} mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity duration-500`}
                      />

                      {/* Geometric Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`,
                          }}
                        />
                      </div>

                      {/* Badge */}
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg"
                      >
                        <Star className="w-3 h-3 text-primary-600 dark:text-primary-400 fill-primary-600 dark:fill-primary-400" />
                        <span className="text-xs font-bold text-primary-900 dark:text-white uppercase tracking-wide">
                          {room.badge}
                        </span>
                      </motion.div>

                      {/* Price Tag */}
                      <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="absolute top-4 right-4 bg-primary-600 dark:bg-primary-700 text-white px-4 py-2 rounded-xl shadow-xl"
                      >
                        <div className="text-center">
                          <p className="text-[10px] opacity-90 uppercase tracking-wider">From</p>
                          <p className="text-xl font-bold">PKR {(room.price / 1000).toFixed(0)}K</p>
                          <p className="text-[10px] opacity-75">per night</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content Section - Flex grow to fill space */}
                    <div className="flex-1 flex flex-col p-5 space-y-3">
                      {/* Title & Category */}
                      <div>
                        <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-1 uppercase tracking-wide">
                          {room.category}
                        </p>
                        <h3 className="font-display text-xl font-bold text-primary-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {room.title}
                        </h3>
                        <p className="text-xs text-accent-600 dark:text-gray-400 leading-relaxed">
                          {room.description}
                        </p>
                      </div>

                      {/* Room Details */}
                      <div className="flex items-center gap-4 text-xs text-accent-700 dark:text-gray-300">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                            <Users className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <span className="font-medium">{room.capacity} Guests</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="p-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                            <Maximize className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <span className="font-medium">{room.size} m²</span>
                        </div>
                      </div>

                      {/* Features Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {room.features.slice(0, 3).map((feature, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="text-[10px] px-2.5 py-1 bg-accent-100 dark:bg-gray-700 text-accent-700 dark:text-gray-300 rounded-full font-medium"
                          >
                            {feature}
                          </motion.span>
                        ))}
                        {room.features.length > 3 && (
                          <span className="text-[10px] px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full font-medium">
                            +{room.features.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Spacer to push buttons to bottom */}
                      <div className="flex-1"></div>

                      {/* Action Buttons - Always at bottom */}
                      <div className="flex gap-2 pt-3">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={`/rooms/${room.id}`}
                          className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-700 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-300 font-semibold text-center text-sm"
                        >
                          View Details
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href="https://wa.me/+923001234567"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2.5 bg-primary-600 dark:bg-primary-700 hover:bg-primary-700 dark:hover:bg-primary-600  rounded-xl transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl text-sm"
                        >
                          Book Now
                        </motion.a>
                      </div>
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          d="M0,100 Q50,50 100,100 L100,0 L0,100"
                          fill="currentColor"
                          className="text-primary-600"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Indicators */}
          {mounted && visibleCount === 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {rooms.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-600 dark:bg-primary-400 w-10'
                      : 'bg-primary-300 dark:bg-gray-600 w-3 hover:w-6'
                  }`}
                  aria-label={`Go to room ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-20"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="/rooms"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg group"
          >
            <span>Explore All Rooms</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
