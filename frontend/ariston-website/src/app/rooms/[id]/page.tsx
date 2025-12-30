'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bath,
  Bed,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Maximize,
  Tv,
  Users,
  Wifi,
  Wind,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

interface Room {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  features: string[];
  category: string;
  images: StrapiImage[];
}

const featureIcons: { [key: string]: any } = {
  wifi: Wifi,
  tv: Tv,
  coffee: Coffee,
  'air conditioning': Wind,
  bath: Bath,
  bed: Bed,
};

const getFeatureIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase();
  for (const [key, Icon] of Object.entries(featureIcons)) {
    if (lowerFeature.includes(key)) {
      return Icon;
    }
  }
  return Check;
};

export default function RoomDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

        // Try fetching by documentId first, then fall back to numeric ID
        let response = await fetch(`${strapiUrl}/api/rooms/${params.id}?populate=images`);

        // If documentId fetch fails, try searching by filters
        if (!response.ok) {
          response = await fetch(
            `${strapiUrl}/api/rooms?filters[documentId][$eq]=${params.id}&populate=images`
          );

          if (!response.ok) {
            throw new Error('Room not found');
          }

          const json = await response.json();
          if (!json.data || json.data.length === 0) {
            throw new Error('Room not found');
          }

          const roomData = json.data[0];

          setRoom({
            id: roomData.id,
            title: roomData.title,
            slug: roomData.slug,
            description: roomData.description || '',
            price: roomData.price,
            capacity: roomData.capacity || 2,
            size: roomData.size || 25,
            features: Array.isArray(roomData.features) ? roomData.features : [],
            category: roomData.category,
            images: roomData.images || [],
          });
          setError(null);
          setLoading(false);
          return;
        }

        const json = await response.json();
        const roomData = json.data;

        setRoom({
          id: roomData.id,
          title: roomData.title,
          slug: roomData.slug,
          description: roomData.description || '',
          price: roomData.price,
          capacity: roomData.capacity || 2,
          size: roomData.size || 25,
          features: Array.isArray(roomData.features) ? roomData.features : [],
          category: roomData.category,
          images: roomData.images || [],
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching room:', err);
        setError('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRoom();
    }
  }, [params.id]);

  const nextImage = () => {
    if (room && room.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }
  };

  const prevImage = () => {
    if (room && room.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-white mb-4">
            Room Not Found
          </h1>
          <p className="text-xl text-accent-600 dark:text-gray-300 mb-8">
            The room you're looking for doesn't exist or has been removed.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </div>
      </div>
    );
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const currentImage = room.images[currentImageIndex];
  const imageUrl = currentImage
    ? `${strapiUrl}${currentImage.url}`
    : '/images/room-placeholder.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-primary-900 dark:text-white rounded-xl hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-300 font-semibold shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Rooms
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundColor: '#dab298',
              }}
            />

            {/* Image Navigation */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-xl transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-primary-900 dark:text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-xl transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-6 h-6 text-primary-900 dark:text-white" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {room.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:w-4'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Category Badge */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-bold text-primary-900 dark:text-white uppercase tracking-wide">
                {room.category}
              </span>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Title and Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-900 dark:text-white mb-4">
                  {room.title}
                </h1>
                <p className="text-lg text-accent-600 dark:text-gray-300 leading-relaxed">
                  {room.description}
                </p>
              </div>

              {/* Room Details */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-6">
                  Room Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                      <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-accent-600 dark:text-gray-400">Capacity</p>
                      <p className="text-lg font-bold text-primary-900 dark:text-white">
                        {room.capacity} Guests
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                      <Maximize className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-accent-600 dark:text-gray-400">Size</p>
                      <p className="text-lg font-bold text-primary-900 dark:text-white">
                        {room.size} m²
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {room.features.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-6">
                    Amenities & Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {room.features.map((feature, index) => {
                      const Icon = getFeatureIcon(feature);
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="flex items-center gap-3 p-4 bg-accent-50 dark:bg-gray-700 rounded-xl"
                        >
                          <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                          <span className="text-primary-900 dark:text-white font-medium">
                            {feature}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl sticky top-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-accent-600 dark:text-gray-400 mb-2">Starting from</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
                      PKR {(room.price / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <p className="text-sm text-accent-600 dark:text-gray-400 mt-1">per night</p>
                </div>

                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://wa.me/+923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-600 text-white text-center rounded-xl hover:shadow-xl transition-all duration-300 font-bold text-lg"
                  >
                    Book Now on WhatsApp
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="tel:+923001234567"
                    className="block w-full px-8 py-4 bg-white dark:bg-gray-700 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 text-center rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-300 font-bold text-lg"
                  >
                    Call to Book
                  </motion.a>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-accent-600 dark:text-gray-400 text-center">
                    💎 Best Price Guarantee
                  </p>
                  <p className="text-sm text-accent-600 dark:text-gray-400 text-center mt-2">
                    ✅ Free Cancellation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
