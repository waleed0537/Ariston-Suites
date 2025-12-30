'use client';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import { ThemeProvider } from '@/components/home/theme-provider';
import WhatsAppButton from '@/components/home/whatsapp-button';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Bed,
  ChevronRight,
  Heart,
  Info,
  Maximize,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Strapi Response Types
interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
}

interface StrapiRoom {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  features: string[];
  category: 'Standard' | 'Deluxe' | 'King Deluxe' | 'Twin Deluxe';
  images: StrapiImage[];
}

interface Room {
  id: number;
  documentId: string;
  title: string;
  category: string;
  slug: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  images: string[];
  features: string[];
  badge: string;
  badgeColor: string;
  gradient: string;
  accentColor: string;
}

// Category mappings
const categoryConfig: Record<
  string,
  { badge: string; badgeColor: string; gradient: string; accentColor: string }
> = {
  Standard: {
    badge: 'Popular Choice',
    badgeColor: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-600/90 via-indigo-600/90 to-purple-600/90',
    accentColor: 'blue',
  },
  Deluxe: {
    badge: 'Best Value',
    badgeColor: 'from-amber-500 to-orange-600',
    gradient: 'from-amber-600/90 via-orange-600/90 to-red-600/90',
    accentColor: 'amber',
  },
  'King Deluxe': {
    badge: 'Signature Suite',
    badgeColor: 'from-purple-500 to-pink-600',
    gradient: 'from-purple-600/90 via-pink-600/90 to-rose-600/90',
    accentColor: 'purple',
  },
  'Twin Deluxe': {
    badge: 'Family Favorite',
    badgeColor: 'from-teal-500 to-cyan-600',
    gradient: 'from-teal-600/90 via-cyan-600/90 to-blue-600/90',
    accentColor: 'teal',
  },
};

const categoryIcons: Record<string, any> = {
  'All Suites': Sparkles,
  Standard: Bed,
  Deluxe: Star,
  'King Deluxe': Zap,
  'Twin Deluxe': Users,
};

export default function RoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All Suites');
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Fetch rooms from Strapi
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        const response = await fetch(`${strapiUrl}/api/rooms?populate=images`);

        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }

        const json = await response.json();
        const strapiRooms: StrapiRoom[] = json.data;

        console.log('Fetched rooms from Strapi:', strapiRooms); // Debug log

        // Transform Strapi data to component format
        const transformedRooms: Room[] = strapiRooms.map((room) => {
          const config = categoryConfig[room.category] || categoryConfig.Standard;

          // Handle images properly
          let roomImages: string[] = [];
          if (room.images && Array.isArray(room.images) && room.images.length > 0) {
            roomImages = room.images.map((img) => `${strapiUrl}${img.url}`);
          } else {
            roomImages = ['/images/room-placeholder.jpg'];
          }

          console.log(`Room ${room.title} images:`, roomImages); // Debug log

          return {
            id: room.id,
            documentId: room.documentId,
            title: room.title,
            category: room.category,
            slug: room.slug,
            description: room.description || '',
            price: room.price,
            capacity: room.capacity || 2,
            size: room.size || 25,
            images: roomImages,
            features: Array.isArray(room.features) ? room.features : [],
            badge: config.badge,
            badgeColor: config.badgeColor,
            gradient: config.gradient,
            accentColor: config.accentColor,
          };
        });

        setRooms(transformedRooms);
        setError(null);

        // Initialize image indices
        const indices: { [key: number]: number } = {};
        transformedRooms.forEach((room) => {
          indices[room.id] = 0;
        });
        setCurrentImageIndex(indices);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Get unique categories from rooms
  const categories = [
    { name: 'All Suites', icon: Sparkles, count: rooms.length },
    ...Array.from(new Set(rooms.map((r) => r.category))).map((cat) => ({
      name: cat,
      icon: categoryIcons[cat] || Bed,
      count: rooms.filter((r) => r.category === cat).length,
    })),
  ];

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

  const handleViewDetails = (documentId: string) => {
    router.push(`/rooms/${documentId}`);
  };

  // Loading state
  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
          <Header />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 dark:text-gray-400">Loading rooms...</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Error state
  if (error) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
          <Header />
          <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary-600   rounded-xl hover:bg-primary-700 transition-colors font-semibold"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />

        {/* Hero Section with Parallax */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-5.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 via-primary-700/80 to-primary-900/80 dark:from-gray-900/80 dark:via-primary-900/80 dark:to-gray-950/80" />
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
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-white "
                >
                  Discover Your
                  <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                    Perfect Suite
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto text-white /90"
                >
                  Experience unparalleled comfort and elegance in our thoughtfully designed suites
                </motion.p>
              </div>

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
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30   rounded-full font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Now
                </a>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent" />
        </section>

        {/* Category Filters */}
        {categories.length > 0 && (
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
        )}

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
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: `url('${
                                  room.images[currentImageIndex[room.id] || 0]
                                }')`,
                                backgroundColor: '#dab298',
                              }}
                            />
                          </AnimatePresence>

                          {/* Image Navigation */}
                          {room.images.length > 1 && (
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
                          )}

                          {/* Image Indicators */}
                          {room.images.length > 1 && (
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
                          )}

                          {/* Badge */}
                          <div className="absolute top-6 left-6">
                            <div
                              className={`px-4 py-2 bg-gradient-to-r ${room.badgeColor}   rounded-full shadow-lg flex items-center gap-2`}
                            >
                              <Star className="w-4 h-4 fill-white" />
                              <span className="text-sm font-bold uppercase tracking-wide">
                                {room.badge}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 lg:p-10 flex flex-col">
                          <div className="mb-6">
                            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2 uppercase tracking-wider">
                              {room.category}
                            </p>
                            <h3 className="font-display text-4xl font-bold text-gray-900 dark:  mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {room.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed line-clamp-3">
                              {room.description}
                            </p>
                          </div>

                          {/* Room Specs Grid */}
                          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                            <div className="text-center">
                              <Users className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                              <p className="text-xs text-gray-500 dark:text-gray-400">Capacity</p>
                              <p className="text-sm font-bold text-gray-900 dark: ">
                                {room.capacity} Guests
                              </p>
                            </div>
                            <div className="text-center">
                              <Maximize className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                              <p className="text-xs text-gray-500 dark:text-gray-400">Size</p>
                              <p className="text-sm font-bold text-gray-900 dark: ">
                                {room.size} m²
                              </p>
                            </div>
                          </div>

                          {/* Features Preview */}
                          {room.features.length > 0 && (
                            <div className="mb-6">
                              <h4 className="text-sm font-semibold text-gray-900 dark:  mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                Features
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {room.features.slice(0, 6).map((feature, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                                  >
                                    <div className="p-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                                      <Wifi className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <span className="line-clamp-1">{feature}</span>
                                  </div>
                                ))}
                              </div>
                              {room.features.length > 6 && (
                                <p className="mt-3 text-sm text-primary-600 dark:text-primary-400 font-semibold">
                                  +{room.features.length - 6} more features
                                </p>
                              )}
                            </div>
                          )}

                          {/* Pricing Section */}
                          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-end justify-between mb-4">
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                  Starting from
                                </p>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                    PKR {(room.price / 1000).toFixed(1)}K
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  per night
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleViewDetails(room.documentId)}
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
            {filteredRooms.length === 0 && !loading && (
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
                  {selectedCategory !== 'All Suites'
                    ? 'Try selecting a different category'
                    : 'No rooms are currently available'}
                </p>
                {selectedCategory !== 'All Suites' && (
                  <button
                    onClick={() => setSelectedCategory('All Suites')}
                    className="px-6 py-3 bg-primary-600   rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                  >
                    View All Suites
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-gray-900 dark:via-primary-900 dark:to-gray-950 relative overflow-hidden">
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
