'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Maximize } from 'lucide-react';

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
  },
];

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function RoomsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);

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
    <section id="rooms" className="py-20 px-4 bg-linear-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-900 dark:text-white mb-4">
            Our Rooms
          </h2>
          <p className="text-lg text-accent-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our carefully designed accommodations, each offering comfort and elegance
          </p>
        </motion.div>

        <div className="relative">
          {mounted && visibleCount > 1 && (
  <>
    <button
      onClick={goToPrevious}
      className="
        absolute left-0 top-1/2 
        -translate-y-1/2 -translate-x-20  /* moved further left */
        z-20 
        bg-white/80 dark:bg-gray-800/80 
        hover:bg-white dark:hover:bg-gray-700
        backdrop-blur-md 
        p-4 
        rounded-full 
        shadow-xl 
        transition-all duration-300 
        hover:scale-110
      "
      aria-label="Previous room"
    >
      <ChevronLeft className="w-7 h-7 text-primary-900 dark:text-white" />
    </button>

    <button
      onClick={goToNext}
      className="
        absolute right-0 top-1/2 
        -translate-y-1/2 translate-x-20 /* moved further right */
        z-20 
        bg-white/80 dark:bg-gray-800/80
        hover:bg-white dark:hover:bg-gray-700
        backdrop-blur-md
        p-4
        rounded-full
        shadow-xl
        transition-all duration-300
        hover:scale-110
      "
      aria-label="Next room"
    >
      <ChevronRight className="w-7 h-7 text-primary-900 dark:text-white" />
    </button>
  </>
)}


          <div className={`grid gap-6 ${mounted && visibleCount > 1 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {visibleRooms.map((room, index) => (
              <motion.div
                key={`${room.id}-${currentIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('${room.image}')`,
                      backgroundColor: '#dab298',
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 bg-primary-600 dark:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
                    {room.category}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-bold mb-2">{room.title}</h3>
                  <p className="text-sm mb-4 text-white/90">{room.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{room.capacity} Guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{room.size} m²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">PKR {room.price.toLocaleString()}</p>
                      <p className="text-xs text-white/75">per night</p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/rooms/${room.id}`}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-md transition-colors text-sm font-medium"
                      >
                        Discover
                      </a>
                      <a
                        href="https://wa.me/+923001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-md transition-colors text-sm font-medium"
                      >
                        Book
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {mounted && visibleCount === 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {rooms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-600 dark:bg-primary-400 w-6'
                      : 'bg-primary-300 dark:bg-gray-600 hover:bg-primary-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to room ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="/rooms"
            className="inline-block px-8 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-md hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300 font-medium"
          >
            Discover All Rooms
          </a>
        </motion.div>
      </div>
    </section>
  );
}