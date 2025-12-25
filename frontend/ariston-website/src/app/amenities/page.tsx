'use client';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import { ThemeProvider } from '@/components/home/theme-provider';
import WhatsAppButton from '@/components/home/whatsapp-button';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Bath,
  Bed,
  Car,
  Check,
  Clock,
  Coffee,
  Dumbbell,
  Heart,
  Key,
  Loader,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Shirt,
  ShowerHead,
  Sofa,
  Sparkles,
  Star,
  Tv,
  Utensils,
  Wifi,
  Wind,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Amenity categories with detailed information
const amenityCategories = [
  {
    id: 'room',
    title: 'In-Room Amenities',
    subtitle: 'Everything you need for a comfortable stay',
    icon: Bed,
    gradient: 'from-blue-600 via-blue-700 to-indigo-700',
    accentColor: 'blue',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200',
    amenities: [
      {
        icon: Bed,
        title: 'Premium Bedding',
        description: 'Luxury mattresses with Egyptian cotton linens and premium pillows',
        highlight: 'Hotel-grade comfort',
      },
      {
        icon: Wind,
        title: 'Climate Control',
        description: 'Individual temperature control with smart thermostat in every room',
        highlight: 'Year-round comfort',
      },
      {
        icon: Tv,
        title: 'Smart Entertainment',
        description: '50-65" Smart TVs with streaming apps and premium channels',
        highlight: 'Unlimited entertainment',
      },
      {
        icon: Wifi,
        title: 'High-Speed WiFi',
        description: 'Complimentary fiber-optic internet up to 500 Mbps',
        highlight: 'Lightning fast',
      },
      {
        icon: Coffee,
        title: 'Mini Bar & Coffee',
        description: 'Stocked mini bar, Nespresso machine, and premium tea selection',
        highlight: 'Refreshments on demand',
      },
      {
        icon: Key,
        title: 'RFID Access',
        description: 'Modern keyless entry with RFID technology for enhanced security',
        highlight: 'Secure & convenient',
      },
    ],
  },
  {
    id: 'bathroom',
    title: 'Luxurious Bathrooms',
    subtitle: 'Spa-like experiences in every suite',
    icon: Bath,
    gradient: 'from-teal-600 via-cyan-700 to-blue-700',
    accentColor: 'teal',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200',
    amenities: [
      {
        icon: ShowerHead,
        title: 'Rain Shower',
        description: 'Oversized rainfall showerheads with adjustable water pressure',
        highlight: 'Spa experience',
      },
      {
        icon: Bath,
        title: 'Premium Fixtures',
        description: 'High-end fittings, designer sinks, and luxury bathtubs in suites',
        highlight: 'Designer quality',
      },
      {
        icon: Sparkles,
        title: 'Premium Toiletries',
        description: 'Complimentary luxury bath products and skincare essentials',
        highlight: 'International brands',
      },
      {
        icon: Loader,
        title: 'Hair Dryer & Iron',
        description: 'Professional-grade hairdryer and iron with ironing board',
        highlight: 'Ready for anything',
      },
      {
        icon: Heart,
        title: 'Plush Towels',
        description: 'Soft, oversized towels and bathrobes in deluxe rooms',
        highlight: 'Hotel luxury',
      },
      {
        icon: Zap,
        title: 'Modern Lighting',
        description: 'Ambient lighting with dimmer controls for perfect ambiance',
        highlight: 'Set the mood',
      },
    ],
  },
  {
    id: 'services',
    title: 'Hotel Services',
    subtitle: 'Round-the-clock hospitality at your service',
    icon: Clock,
    gradient: 'from-purple-600 via-pink-600 to-red-600',
    accentColor: 'purple',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    amenities: [
      {
        icon: Clock,
        title: '24/7 Front Desk',
        description: 'Always available staff for check-in, assistance, and recommendations',
        highlight: 'Always here for you',
      },
      {
        icon: Shield,
        title: '24/7 Security',
        description: 'Round-the-clock security personnel and CCTV surveillance',
        highlight: 'Your safety first',
      },
      {
        icon: Utensils,
        title: 'Complimentary Breakfast',
        description: 'Daily buffet breakfast with continental and local options',
        highlight: 'Start your day right',
      },
      {
        icon: Shirt,
        title: 'Laundry & Ironing',
        description: 'Professional laundry, dry cleaning, and express ironing services',
        highlight: 'Quick turnaround',
      },
      {
        icon: Phone,
        title: 'Room Service',
        description: 'In-room dining available throughout the day',
        highlight: 'Dine in comfort',
      },
      {
        icon: MapPin,
        title: 'Concierge Service',
        description: 'Local recommendations, reservations, and tour arrangements',
        highlight: 'Your local guide',
      },
    ],
  },
  {
    id: 'facilities',
    title: 'Common Facilities',
    subtitle: 'Shared spaces designed for your comfort',
    icon: Sofa,
    gradient: 'from-amber-600 via-orange-600 to-red-600',
    accentColor: 'amber',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
    amenities: [
      {
        icon: Sofa,
        title: 'Multiple Lounges',
        description: 'Comfortable seating areas throughout the property for relaxation',
        highlight: 'Your home away from home',
      },
      {
        icon: Coffee,
        title: 'Coffee Bar',
        description: 'Complimentary coffee, tea, and refreshments available 24/7',
        highlight: 'Always brewing',
      },
      {
        icon: Car,
        title: 'Free Parking',
        description: 'Secure covered parking with ample space for all guests',
        highlight: 'Park with ease',
      },
      {
        icon: Dumbbell,
        title: 'Fitness Center',
        description: 'Modern gym equipment available for health-conscious guests',
        highlight: 'Stay active',
      },
      {
        icon: Sparkles,
        title: 'Daily Housekeeping',
        description: 'Professional cleaning service to keep your room pristine',
        highlight: 'Always spotless',
      },
      {
        icon: Star,
        title: 'Business Center',
        description: 'Printing, scanning, and workstation facilities for business travelers',
        highlight: 'Work ready',
      },
    ],
  },
];

// Additional perks and highlights
const additionalPerks = [
  {
    icon: Check,
    title: 'Complimentary Breakfast',
    description: 'Start your day with our delicious breakfast buffet',
  },
  {
    icon: Check,
    title: 'Free High-Speed WiFi',
    description: 'Stay connected with blazing fast internet',
  },
  {
    icon: Check,
    title: 'Free Parking',
    description: 'Secure parking space for all our guests',
  },
  {
    icon: Check,
    title: '24/7 Security',
    description: 'Round-the-clock security for your peace of mind',
  },
  {
    icon: Check,
    title: 'Premium Location',
    description: 'In the heart of the city near major attractions',
  },
  {
    icon: Check,
    title: 'Flexible Check-in',
    description: 'Early check-in and late checkout available',
  },
];

// Gallery images
const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    title: 'Elegant Rooms',
    category: 'Rooms',
  },
  {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    title: 'Cozy Lounge',
    category: 'Facilities',
  },
  {
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
    title: 'Modern Bathroom',
    category: 'Bathrooms',
  },
  {
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    title: 'Deluxe Suite',
    category: 'Rooms',
  },
  {
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    title: 'Breakfast Area',
    category: 'Dining',
  },
  {
    url: 'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800',
    title: 'Reception',
    category: 'Services',
  },
];

export default function AmenitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />

        {/* Hero Section with Parallax */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
            <Image
              src="/images/amenities-main.jpg"
              alt="Luxury Hotel Amenities"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-600/80 dark:from-gray-950/90 dark:via-gray-900/85 dark:to-primary-900/80" />

            {/* Animated Pattern Overlay */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>

          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Main Heading */}
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-white"
                >
                  Amenities &
                  <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                    Facilities
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl  leading-relaxed max-w-3xl mx-auto text-white"
                >
                  Experience unparalleled comfort with our comprehensive range of amenities and
                  services, thoughtfully designed for your ultimate satisfaction
                </motion.p>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white"
              >
                {[
                  { icon: Star, label: '4.9 Rating', value: '1000+ Reviews' },
                  { icon: Shield, label: '24/7 Security', value: 'Always Protected' },
                  { icon: Sparkles, label: 'Premium Service', value: 'Excellence Guaranteed' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
                  >
                    <item.icon className="w-6 h-6 text-amber-300" />
                    <div className="text-left">
                      <p className="text-sm font-bold ">{item.label}</p>
                      <p className="text-xs ">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          ></motion.div>
        </section>

        {/* Quick Navigation */}
        <section className="sticky top-20 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {amenityCategories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      document
                        .getElementById(category.id)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`group relative px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{category.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Amenity Categories */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl space-y-32">
            {amenityCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              const isEven = categoryIndex % 2 === 0;

              return (
                <motion.div
                  key={category.id}
                  id={category.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="scroll-mt-32"
                >
                  {/* Category Header */}
                  <div className="text-center mb-16">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${category.gradient} text-white rounded-full shadow-lg mb-6`}
                    >
                      <CategoryIcon className="w-6 h-6" />
                      <span className="font-bold text-sm uppercase tracking-wider">
                        {category.title}
                      </span>
                    </motion.div>

                    <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                      {category.subtitle}
                    </h2>
                  </div>

                  {/* Category Content */}
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      isEven ? '' : 'lg:grid-flow-dense'
                    }`}
                  >
                    {/* Image Section */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`relative group ${isEven ? '' : 'lg:col-start-2'}`}
                    >
                      <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                        />
                      </div>

                      {/* Floating Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-3 bg-gradient-to-br ${category.gradient} rounded-xl`}>
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Featured</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              Premium Quality
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Amenities List */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}
                    >
                      <div className="space-y-6">
                        {category.amenities.map((amenity, idx) => {
                          const AmenityIcon = amenity.icon;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                              whileHover={{ x: isEven ? 10 : -10 }}
                              className="group flex gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                            >
                              {/* Icon */}
                              <div
                                className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                              >
                                <AmenityIcon className="w-7 h-7 text-white" />
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {amenity.title}
                                  </h4>
                                  <span
                                    className={`text-xs font-semibold px-3 py-1 bg-${category.accentColor}-50 dark:bg-${category.accentColor}-900/30 text-${category.accentColor}-700 dark:text-${category.accentColor}-400 rounded-full whitespace-nowrap`}
                                  >
                                    {amenity.highlight}
                                  </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                  {amenity.description}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Additional Perks Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                <Star className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-bold text-primary-900 dark:text-primary-300 uppercase tracking-wider">
                  Complimentary Benefits
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Included in Every Stay
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Enjoy these premium amenities at no additional cost
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalPerks.map((perk, idx) => {
                const PerkIcon = perk.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <PerkIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                          {perk.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {perk.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Experience Our Facilities
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A glimpse into the luxury and comfort that awaits you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                >
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-semibold px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full">
                      {image.category}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2">{image.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-gray-950 dark:via-primary-900 dark:to-gray-950 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
                <Heart className="w-5 h-5text-white" />
                <span className="text-sm font-semibold  uppercase tracking-wider">
                  Ready to Experience Luxury?
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold  leading-tight">
                Book Your Stay Today
              </h2>

              <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                Experience world-class amenities and exceptional service. Contact us now for
                exclusive rates and personalized assistance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${
                    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567'
                  }?text=${encodeURIComponent(
                    "Hi! I'd like to inquire about booking a room at Ariston Suites."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-10 py-5 bg-white text-primary-900 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 font-bold text-lg flex items-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Book via WhatsApp</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+923001234567'}`}
                  className="px-10 py-5 bg-white/10 backdrop-blur-md  border-2 border-white/30 rounded-full hover:bg-white/20 transition-all duration-300 font-bold text-lg flex items-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  <span>Call Us Now</span>
                </motion.a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/20">
                <div className="text-center">
                  <div className="text-4xl font-bold  mb-2">50+</div>
                  <div className="text-sm ">Premium Amenities</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold  mb-2">24/7</div>
                  <div className="text-sm ">Services Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold  mb-2">4.9★</div>
                  <div className="text-sm ">Guest Rating</div>
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
