'use client';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import { ThemeProvider } from '@/components/home/theme-provider';
import WhatsAppButton from '@/components/home/whatsapp-button';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Bath,
  Bed,
  ChevronRight,
  Coffee,
  DoorOpen,
  Heart,
  Info,
  Maximize,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
  Tv,
  Users,
  Wifi,
  Wind,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Enhanced room data with more details
const rooms = [
  {
    id: 1,
    title: 'Standard Suite',
    category: 'Standard',
    slug: 'standard-suite',
    tagline: 'Comfort Redefined',
    description:
      'Experience sophisticated comfort in our thoughtfully designed Standard Suites, perfect for both business and leisure travelers.',
    longDescription:
      'Our Standard Suites blend modern aesthetics with functional design, offering a serene retreat in the heart of the city. Each room features premium bedding, contemporary furnishings, and state-of-the-art amenities to ensure your comfort.',
    price: 12000,
    priceBeforeTax: 10169,
    originalPrice: 15000,
    discount: 20,
    capacity: 2,
    size: 25,
    beds: 1,
    bedType: 'King Size',
    bathrooms: 1,
    view: 'City View',
    floor: '3-8',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200',
    ],
    amenities: [
      { icon: Bed, label: 'King Size Bed', description: 'Premium mattress' },
      { icon: Wifi, label: 'High-Speed WiFi', description: '100 Mbps' },
      { icon: Wind, label: 'Climate Control', description: 'Smart thermostat' },
      { icon: Tv, label: 'Smart TV 50"', description: 'Streaming apps' },
      { icon: Coffee, label: 'Mini Bar', description: 'Complimentary drinks' },
      { icon: Bath, label: 'Modern Bathroom', description: 'Rain shower' },
      { icon: DoorOpen, label: 'RFID Access', description: 'Keyless entry' },
      { icon: Shield, label: 'In-room Safe', description: 'Laptop size' },
    ],
    features: [
      'City View',
      'Work Desk',
      'Premium Toiletries',
      'Iron & Board',
      'Hair Dryer',
      'Complimentary Breakfast',
      '24/7 Room Service',
      'Daily Housekeeping',
      'Blackout Curtains',
      'USB Charging Ports',
    ],
    badge: 'Popular Choice',
    badgeColor: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-600/90 via-indigo-600/90 to-purple-600/90',
    accentColor: 'blue',
    available: true,
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 2,
    title: 'Deluxe Suite',
    category: 'Deluxe',
    slug: 'deluxe-suite',
    tagline: 'Elevated Luxury',
    description:
      'Indulge in spacious elegance with our Deluxe Suites, featuring separate living areas and panoramic city views.',
    longDescription:
      'Our Deluxe Suites offer an elevated experience with expansive layouts, premium furnishings, and exquisite attention to detail. Perfect for extended stays or those seeking extra space and luxury.',
    price: 18000,
    priceBeforeTax: 15254,
    originalPrice: 22000,
    discount: 18,
    capacity: 3,
    size: 35,
    beds: 1,
    bedType: 'California King',
    bathrooms: 1,
    view: 'Panoramic City View',
    floor: '9-15',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
    ],
    amenities: [
      { icon: Bed, label: 'California King Bed', description: 'Luxury linens' },
      { icon: Wifi, label: 'Ultra-Fast WiFi', description: '200 Mbps' },
      { icon: Wind, label: 'Climate Zones', description: 'Dual control' },
      { icon: Tv, label: 'Smart TV 55"', description: '4K display' },
      { icon: Coffee, label: 'Premium Mini Bar', description: 'Curated selection' },
      { icon: Bath, label: 'Spa Bathroom', description: 'Soaking tub' },
      { icon: DoorOpen, label: 'Smart Lock', description: 'App controlled' },
      { icon: Sparkles, label: 'Nespresso Machine', description: 'Fresh coffee' },
    ],
    features: [
      'Separate Living Area',
      'Panoramic Windows',
      'Executive Workspace',
      'Luxury Toiletries',
      'Bathrobe & Slippers',
      'Premium Bedding',
      'Soundproof Windows',
      'Priority Room Service',
      'Complimentary Breakfast',
      'Evening Turndown',
      'Welcome Amenities',
      'Personal Concierge',
    ],
    badge: 'Best Value',
    badgeColor: 'from-amber-500 to-orange-600',
    gradient: 'from-amber-600/90 via-orange-600/90 to-red-600/90',
    accentColor: 'amber',
    available: true,
    rating: 4.9,
    reviews: 428,
  },
  {
    id: 3,
    title: 'King Deluxe Suite',
    category: 'King Deluxe',
    slug: 'king-deluxe-suite',
    tagline: 'Ultimate Indulgence',
    description:
      'Experience the pinnacle of luxury in our King Deluxe Suites, featuring private jacuzzi, balcony, and butler service.',
    longDescription:
      'Our King Deluxe Suites represent the finest accommodations at Ariston, combining sophisticated design with world-class amenities. Each suite is a sanctuary of comfort and style, perfect for the discerning traveler.',
    price: 25000,
    priceBeforeTax: 21186,
    originalPrice: 30000,
    discount: 17,
    capacity: 3,
    size: 45,
    beds: 1,
    bedType: 'Super King',
    bathrooms: 2,
    view: '360° City View',
    floor: '16-20 (Top Floors)',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200',
    ],
    amenities: [
      { icon: Bed, label: 'Super King Bed', description: 'Egyptian cotton' },
      { icon: Wifi, label: 'Enterprise WiFi', description: '500 Mbps' },
      { icon: Wind, label: 'Smart Climate', description: 'AI controlled' },
      { icon: Tv, label: 'Smart TV 65"', description: 'OLED 4K' },
      { icon: Coffee, label: 'Full Bar', description: 'Premium spirits' },
      { icon: Bath, label: 'Spa Suite', description: 'Jacuzzi + Steam' },
      { icon: Sparkles, label: 'Butler Service', description: '24/7 personal' },
      { icon: Star, label: 'VIP Amenities', description: 'Exclusive' },
    ],
    features: [
      'Private Balcony',
      'Jacuzzi Tub',
      'Steam Shower',
      '360° City Views',
      'Spacious Living Room',
      'Dining Area',
      'Walk-in Closet',
      'Premium Sound System',
      'Smart Home Controls',
      'Complimentary Minibar',
      'Priority Check-in/out',
      'Airport Transfer',
      'Breakfast in Suite',
      'Evening Butler Service',
      'Fresh Flowers Daily',
      'Pillow Menu',
    ],
    badge: 'Signature Suite',
    badgeColor: 'from-purple-500 to-pink-600',
    gradient: 'from-purple-600/90 via-pink-600/90 to-rose-600/90',
    accentColor: 'purple',
    available: true,
    rating: 5.0,
    reviews: 187,
  },
  {
    id: 4,
    title: 'Twin Deluxe Suite',
    category: 'Twin Deluxe',
    slug: 'twin-deluxe-suite',
    tagline: 'Perfect for Families',
    description:
      'Spacious family-friendly suites with two queen beds, ideal for groups and families traveling together.',
    longDescription:
      'Designed with families and groups in mind, our Twin Deluxe Suites offer generous space, multiple sleeping arrangements, and thoughtful amenities that cater to all ages.',
    price: 22000,
    priceBeforeTax: 18644,
    originalPrice: 26000,
    discount: 15,
    capacity: 4,
    size: 40,
    beds: 2,
    bedType: 'Two Queens',
    bathrooms: 1,
    view: 'City/Garden View',
    floor: '5-12',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200',
    ],
    amenities: [
      { icon: Bed, label: 'Two Queen Beds', description: 'Premium comfort' },
      { icon: Wifi, label: 'High-Speed WiFi', description: '150 Mbps' },
      { icon: Wind, label: 'Dual Climate', description: 'Individual zones' },
      { icon: Tv, label: 'Smart TV 55"', description: 'Kids channels' },
      { icon: Coffee, label: 'Family Bar', description: 'Snacks included' },
      { icon: Bath, label: 'Large Bathroom', description: 'Double vanity' },
      { icon: Users, label: 'Seating Area', description: 'Sofa bed' },
      { icon: Sparkles, label: 'Kids Welcome', description: 'Toys & games' },
    ],
    features: [
      'Family Friendly',
      'Spacious Layout',
      'Work Desk',
      'Seating Area',
      'Extra Storage',
      'Premium Toiletries',
      'Complimentary Breakfast',
      'Kids Welcome Pack',
      'Connecting Rooms',
      'Baby Cot Available',
      'High Chair Available',
      'Games & Activities',
    ],
    badge: 'Family Favorite',
    badgeColor: 'from-teal-500 to-cyan-600',
    gradient: 'from-teal-600/90 via-cyan-600/90 to-blue-600/90',
    accentColor: 'teal',
    available: true,
    rating: 4.9,
    reviews: 296,
  },
];

const categories = [
  { name: 'All Suites', icon: Sparkles, count: 4 },
  { name: 'Standard', icon: Bed, count: 1 },
  { name: 'Deluxe', icon: Star, count: 1 },
  { name: 'King Deluxe', icon: Zap, count: 1 },
  { name: 'Twin Deluxe', icon: Users, count: 1 },
];

export default function RoomsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Suites');
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    // Initialize image indices
    const indices: { [key: number]: number } = {};
    rooms.forEach((room) => {
      indices[room.id] = 0;
    });
    setCurrentImageIndex(indices);
  }, []);

  const filteredRooms =
    selectedCategory === 'All Suites'
      ? rooms
      : rooms.filter((room) => room.category === selectedCategory);

  const nextImage = (roomId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const room = rooms.find((r) => r.id === roomId);
      if (!room) return prev;
      return {
        ...prev,
        [roomId]: (prev[roomId] + 1) % room.images.length,
      };
    });
  };

  const prevImage = (roomId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const room = rooms.find((r) => r.id === roomId);
      if (!room) return prev;
      return {
        ...prev,
        [roomId]: (prev[roomId] - 1 + room.images.length) % room.images.length,
      };
    });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />

        {/* Hero Section with Parallax */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-5.jpg')" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 via-primary-700/80 to-primary-900/80 dark:from-gray-900/80 dark:via-primary-900/80 dark:to-gray-950/80" />

            {/* Animated Background Pattern */}
            <motion.div
              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Luxury Accommodations
                </span>
              </motion.div>

              {/* Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-white "
                >
                  Discover Your
                  <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-white">
                    Perfect Suite
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl font-heavy leading-relaxed max-w-3xl mx-auto text-white"
                >
                  Experience unparalleled comfort and elegance in our thoughtfully designed suites
                </motion.p>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="#rooms"
                  className="group px-8 py-4 bg-white text-primary-900 rounded-full font-semibold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  View All Suites
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={`https://wa.me/${
                    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Now
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent" />
        </section>

        {/* Category Filters */}
        <section className="sticky top-20 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.name;
                return (
                  <motion.button
                    key={category.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`group relative px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700   shadow-lg shadow-primary-500/50'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isActive
                          ? 'bg-white/20  '
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {category.count}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl"
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section id="rooms" className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onMouseEnter={() => setSelectedRoom(room.id)}
                    onMouseLeave={() => setSelectedRoom(null)}
                    className="group relative"
                  >
                    {/* Main Card */}
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Image Gallery Section */}
                        <div className="relative h-[400px] lg:h-[600px] overflow-hidden bg-gray-100 dark:bg-gray-900">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${room.id}-${currentImageIndex[room.id] || 0}`}
                              initial={{ opacity: 0, scale: 1.1 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={room.images[currentImageIndex[room.id] || 0]}
                                alt={`${room.title} - Image ${
                                  (currentImageIndex[room.id] || 0) + 1
                                }`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={index === 0}
                              />
                            </motion.div>
                          </AnimatePresence>

                          {/* Image Navigation */}
                          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => prevImage(room.id, e)}
                              className="p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-xl"
                            >
                              <ChevronRight className="w-6 h-6 rotate-180 text-gray-900 dark: " />
                            </button>
                            <button
                              onClick={(e) => nextImage(room.id, e)}
                              className="p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-xl"
                            >
                              <ChevronRight className="w-6 h-6 text-gray-900 dark: " />
                            </button>
                          </div>

                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {room.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  setCurrentImageIndex((prev) => ({ ...prev, [room.id]: idx }))
                                }
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  idx === (currentImageIndex[room.id] || 0)
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 w-1.5 hover:bg-white/75'
                                }`}
                              />
                            ))}
                          </div>

                          {/* Overlay Labels */}
                          <div className="absolute top-6 left-6 flex flex-col gap-2">
                            {/* Badge */}
                            <div
                              className={`px-4 py-2 bg-gradient-to-r ${room.badgeColor} rounded-full shadow-lg flex items-center gap-2`}
                            >
                              <Star className="w-4 h-4   fill-white" />
                              <span className="text-sm font-bold   uppercase tracking-wide">
                                {room.badge}
                              </span>
                            </div>

                            {/* Discount Badge */}
                            {room.discount && (
                              <div className="px-3 py-1.5 bg-red-600   rounded-full shadow-lg">
                                <span className="text-xs font-bold">Save {room.discount}%</span>
                              </div>
                            )}
                          </div>

                          {/* Rating Badge */}
                          <div className="absolute top-6 right-6 px-3 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg">
                            <div className="flex items-center gap-1.5">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-bold text-gray-900 dark: ">
                                {room.rating}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({room.reviews})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 lg:p-10 flex flex-col">
                          {/* Header */}
                          <div className="mb-6">
                            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2 uppercase tracking-wider">
                              {room.category} • {room.tagline}
                            </p>
                            <h3 className="font-display text-4xl font-bold text-gray-900 dark:  mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {room.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                              {room.description}
                            </p>
                          </div>

                          {/* Room Specs Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                            <div className="text-center">
                              <Users className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                              <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
                              <p className="text-sm font-bold text-gray-900 dark: ">
                                {room.capacity}
                              </p>
                            </div>
                            <div className="text-center">
                              <Maximize className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                              <p className="text-xs text-gray-500 dark:text-gray-400">Size</p>
                              <p className="text-sm font-bold text-gray-900 dark: ">
                                {room.size}m²
                              </p>
                            </div>
                            <div className="text-center">
                              <Bed className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                              <p className="text-xs text-gray-500 dark:text-gray-400">Bed</p>
                              <p className="text-sm font-bold text-gray-900 dark: ">
                                {room.bedType}
                              </p>
                            </div>
                            <div className="text-center">
                              <Bath className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                              <p className="text-xs text-gray-500 dark:text-gray-400">Bath</p>
                              <p className="text-sm font-bold text-gray-900 dark: ">
                                {room.bathrooms}
                              </p>
                            </div>
                          </div>

                          {/* Amenities Preview */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-900 dark:  mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                              Amenities
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {room.amenities.slice(0, 6).map((amenity, idx) => {
                                const Icon = amenity.icon;
                                return (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                                  >
                                    <div className="p-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                                      <Icon className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <span>{amenity.label}</span>
                                  </div>
                                );
                              })}
                            </div>
                            {room.amenities.length > 6 && (
                              <button className="mt-3 text-sm text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                                +{room.amenities.length - 6} more amenities
                              </button>
                            )}
                          </div>

                          {/* Pricing Section */}
                          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-end justify-between mb-4">
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                  Starting from
                                </p>
                                <div className="flex items-baseline gap-2">
                                  {room.originalPrice && (
                                    <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
                                      PKR {room.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                  <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                    PKR {(room.price / 1000).toFixed(1)}K
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  per night (incl. taxes)
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:  rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                              >
                                <Info className="w-5 h-5" />
                                View Details
                              </motion.button>
                              <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href={`https://wa.me/${
                                  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567'
                                }?text=${encodeURIComponent(
                                  `Hi! I'd like to book the ${room.title} at Ariston Suites.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 px-6 py-4 bg-gradient-to-r ${room.badgeColor}   rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2`}
                              >
                                <MessageCircle className="w-5 h-5" />
                                Book Now
                              </motion.a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredRooms.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bed className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:  mb-2">No rooms found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try selecting a different category
                </p>
                <button
                  onClick={() => setSelectedCategory('All Suites')}
                  className="px-6 py-3 bg-primary-600   rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                >
                  View All Suites
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-gray-900 dark:via-primary-900 dark:to-gray-950 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
                <Heart className="w-4 h-4  " />
                <span className="text-sm font-semibold   uppercase tracking-wider">
                  Need Assistance?
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold   leading-tight">
                Let Us Help You Find Your
                <br />
                Perfect Suite
              </h2>

              <p className="text-xl  /90 leading-relaxed max-w-2xl mx-auto">
                Our concierge team is available 24/7 to assist you with room selection, special
                requests, and exclusive offers.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${
                    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-white text-primary-900 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 font-semibold text-lg flex items-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+923001234567'}`}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md   border-2 border-white/30 rounded-full hover:bg-white/20 transition-all duration-300 font-semibold text-lg flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us</span>
                </motion.a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold   mb-1">24/7</div>
                  <div className="text-sm  /80">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold   mb-1">4.9★</div>
                  <div className="text-sm  /80">Guest Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold   mb-1">1000+</div>
                  <div className="text-sm  /80">Happy Guests</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}
