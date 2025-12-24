'use client';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import { ThemeProvider } from '@/components/home/theme-provider';
import WhatsAppButton from '@/components/home/whatsapp-button';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  Award,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid3x3,
  Heart,
  MapPin,
  MessageCircle,
  Play,
  Quote,
  Search,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  Verified,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Extended testimonials data with more details
const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    location: 'Karachi, Pakistan',
    rating: 5,
    title: 'Absolutely Wonderful Experience!',
    content:
      'The rooms were immaculate, staff was incredibly friendly, and the location was perfect. The breakfast spread was amazing with both continental and local options. The attention to detail in every aspect of our stay was remarkable. The WiFi was super fast, which was important for my work. Will definitely return and highly recommend to everyone!',
    date: '2024-12-15',
    roomType: 'Deluxe Suite',
    stayDuration: '3 nights',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    verified: true,
    helpful: 42,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
    ],
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    title: 'Outstanding Service and Beautiful Rooms',
    content:
      'From check-in to check-out, everything was seamless. The room was spacious and beautifully decorated. The breakfast was delicious with a great variety. Staff went above and beyond to make our anniversary special with a room upgrade and complimentary cake. The rooftop lounge was a perfect spot to unwind. Exceeded all our expectations!',
    date: '2024-12-10',
    roomType: 'King Deluxe Suite',
    stayDuration: '2 nights',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    verified: true,
    helpful: 38,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    name: 'Fatima Hassan',
    location: 'Dubai, UAE',
    rating: 5,
    title: 'A Truly Luxurious Experience',
    content:
      'Best hotel stay in years! From the moment we entered, we felt welcomed. The attention to detail is remarkable - from the plush bedding to the modern bathroom amenities. The RFID key system was convenient and secure. Housekeeping was excellent, and the 24/7 front desk was always helpful. The location is perfect for both business and leisure.',
    date: '2024-12-05',
    roomType: 'Standard Suite',
    stayDuration: '4 nights',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    verified: true,
    helpful: 56,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600'],
  },
  {
    id: 4,
    name: 'David Williams',
    location: 'London, UK',
    rating: 5,
    title: 'Perfect for Business Travel',
    content:
      'As a frequent business traveler, I can confidently say this is one of the best hotels I have stayed in. The WiFi speed was excellent for video conferences. The work desk setup was perfect. The location is convenient with easy access to business districts. Breakfast timing was flexible which suited my early meetings. Professional and efficient service throughout.',
    date: '2024-11-28',
    roomType: 'Deluxe Suite',
    stayDuration: '5 nights',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    verified: true,
    helpful: 31,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 5,
    name: 'Aisha Khan',
    location: 'Lahore, Pakistan',
    rating: 5,
    title: 'Exceptional Family Stay',
    content:
      'We stayed as a family of four and everything was perfect. The twin deluxe room was spacious enough for all of us. Kids loved the complimentary breakfast, especially the pancakes! Staff was very accommodating with extra bedding and towels. The parking was convenient and secure. The common lounge was a great place for family time in the evening.',
    date: '2024-11-20',
    roomType: 'Twin Deluxe Suite',
    stayDuration: '2 nights',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    verified: true,
    helpful: 45,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
    ],
  },
  {
    id: 6,
    name: 'James Anderson',
    location: 'New York, USA',
    rating: 4,
    title: 'Great Value for Money',
    content:
      'Excellent hotel with great amenities at a reasonable price. The room was clean and comfortable. The breakfast spread could have been slightly better, but overall food quality was good. Staff was friendly and helpful. The location is good with restaurants and shops nearby. Would definitely stay again on my next visit.',
    date: '2024-11-15',
    roomType: 'Standard Suite',
    stayDuration: '3 nights',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    verified: true,
    helpful: 28,
  },
  {
    id: 7,
    name: 'Zainab Ali',
    location: 'Islamabad, Pakistan',
    rating: 5,
    title: 'Perfect Weekend Getaway',
    content:
      'My husband and I chose this hotel for our weekend anniversary celebration and it was perfect! The room was beautifully maintained with romantic lighting. The staff surprised us with champagne and chocolates. The rooftop lounge at night was magical. Breakfast was delightful. Every detail was taken care of. Truly a memorable stay!',
    date: '2024-11-08',
    roomType: 'King Deluxe Suite',
    stayDuration: '2 nights',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    verified: true,
    helpful: 52,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 8,
    name: 'Robert Taylor',
    location: 'Toronto, Canada',
    rating: 5,
    title: 'Highly Recommended',
    content:
      'Everything about this hotel exceeded my expectations. Check-in was smooth and quick. The room was spotless with modern amenities. The bed was incredibly comfortable - best sleep I have had in a hotel. The bathroom was spacious with excellent water pressure. Location is prime with easy access to attractions. Definitely my go-to hotel in the city now.',
    date: '2024-10-30',
    roomType: 'Deluxe Suite',
    stayDuration: '4 nights',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    verified: true,
    helpful: 39,
  },
  {
    id: 9,
    name: 'Maria Garcia',
    location: 'Madrid, Spain',
    rating: 5,
    title: 'Wonderful Solo Travel Experience',
    content:
      'As a solo female traveler, I felt completely safe and comfortable here. The 24/7 security was reassuring. The room had all the amenities I needed. The staff was respectful and professional. The WiFi was fast enough for streaming. The breakfast timing was flexible. The common areas were perfect for working on my laptop. Highly recommended for solo travelers!',
    date: '2024-10-22',
    roomType: 'Standard Suite',
    stayDuration: '6 nights',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    verified: true,
    helpful: 47,
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600'],
  },
];

// Statistics for the overview section
const stats = [
  { icon: Star, label: 'Average Rating', value: '4.9', subtext: 'Out of 5.0' },
  { icon: Users, label: 'Total Reviews', value: '1,250+', subtext: 'Verified guests' },
  { icon: ThumbsUp, label: 'Recommendation', value: '98%', subtext: 'Would return' },
  { icon: Award, label: 'Awards', value: '15+', subtext: 'Excellence awards' },
];

// Rating breakdown
const ratingBreakdown = [
  { stars: 5, count: 1180, percentage: 94 },
  { stars: 4, count: 58, percentage: 5 },
  { stars: 3, count: 8, percentage: 1 },
  { stars: 2, count: 3, percentage: 0 },
  { stars: 1, count: 1, percentage: 0 },
];

// Filter options
const roomTypes = [
  'All Rooms',
  'Standard Suite',
  'Deluxe Suite',
  'King Deluxe Suite',
  'Twin Deluxe Suite',
];
const ratings = ['All Ratings', '5 Stars', '4 Stars', '3 Stars'];
const sortOptions = ['Most Recent', 'Highest Rated', 'Most Helpful'];

export default function TestimonialsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('grid');
  const [selectedRoomType, setSelectedRoomType] = useState('All Rooms');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesRoomType =
      selectedRoomType === 'All Rooms' || testimonial.roomType === selectedRoomType;
    const matchesRating =
      selectedRating === 'All Ratings' ||
      testimonial.rating === parseInt(selectedRating.split(' ')[0]);
    const matchesSearch =
      searchQuery === '' ||
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRoomType && matchesRating && matchesSearch;
  });

  // Sort testimonials
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === 'Most Recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'Highest Rated') {
      return b.rating - a.rating;
    } else if (sortBy === 'Most Helpful') {
      return b.helpful - a.helpful;
    }
    return 0;
  });

  const videoTestimonials = testimonials.filter((t) => t.videoUrl);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sortedTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sortedTestimonials.length) % sortedTestimonials.length);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'Ariston Suites',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '1250',
                bestRating: '5',
                worstRating: '1',
              },
              review: testimonials.slice(0, 5).map((testimonial) => ({
                '@type': 'Review',
                author: {
                  '@type': 'Person',
                  name: testimonial.name,
                },
                datePublished: testimonial.date,
                reviewBody: testimonial.content,
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: testimonial.rating,
                  bestRating: '5',
                  worstRating: '1',
                },
              })),
            }),
          }}
        />

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920"
              alt="Happy Hotel Guests"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-700/80 dark:from-gray-950/90 dark:via-gray-900/85 dark:to-primary-900/80" />
          </motion.div>

          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
              >
                <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  4.9 Average Rating
                </span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-white"
                >
                  Guest
                  <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                    Testimonials
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto"
                >
                  Discover why over 1,250 guests have rated us 4.9 stars and shared their
                  unforgettable experiences at Ariston Suites
                </motion.p>
              </div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              >
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                    >
                      <Icon className="w-8 h-8 text-amber-300 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm font-semibold text-white/90 mb-1">{stat.label}</div>
                      <div className="text-xs text-white/70">{stat.subtext}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Rating Breakdown Section */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Rating Breakdown
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                See what our guests are saying
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Overall Rating */}
                <div className="text-center">
                  <div className="text-7xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    4.9
                  </div>
                  <div className="flex justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-8 h-8 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-lg">
                    Based on <span className="font-bold text-gray-900 dark:text-white">1,250+</span>{' '}
                    verified reviews
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">Excellent Rating</span>
                  </div>
                </div>

                {/* Rating Bars */}
                <div className="space-y-4">
                  {ratingBreakdown.map((item) => (
                    <div key={item.stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 min-w-[80px]">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {item.stars}
                        </span>
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </div>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                        />
                      </div>
                      <div className="min-w-[60px] text-right">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and View Toggle */}
        <section className="sticky top-20 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>

              {/* Filters Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3 flex-wrap">
                {/* Room Type Filter */}
                <select
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white font-semibold"
                >
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {/* Rating Filter */}
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white font-semibold"
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white font-semibold"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      viewMode === 'grid'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('slider')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      viewMode === 'slider'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden mt-4 space-y-3 overflow-hidden"
                >
                  <select
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white font-semibold"
                  >
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white font-semibold"
                  >
                    {ratings.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white font-semibold"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        viewMode === 'grid'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      Grid View
                    </button>
                    <button
                      onClick={() => setViewMode('slider')}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        viewMode === 'slider'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      Slider View
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing{' '}
              <span className="font-bold text-gray-900 dark:text-white">
                {sortedTestimonials.length}
              </span>{' '}
              of{' '}
              <span className="font-bold text-gray-900 dark:text-white">{testimonials.length}</span>{' '}
              reviews
            </div>
          </div>
        </section>

        {/* Testimonials Display */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {viewMode === 'grid' ? (
              // Grid View
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {sortedTestimonials.map((testimonial, idx) => (
                    <motion.div
                      key={testimonial.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                      {/* Header */}
                      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-start gap-4 mb-4">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500">
                              <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            {testimonial.verified && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                                  {testimonial.name}
                                </h4>
                                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate">{testimonial.location}</span>
                                </div>
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= testimonial.rating
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h5 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {testimonial.title}
                        </h5>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full font-semibold">
                            {testimonial.roomType}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold">
                            {testimonial.stayDuration}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Quote Icon */}
                        <Quote className="w-8 h-8 text-primary-200 dark:text-primary-900/50 mb-3" />

                        {/* Review Text */}
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-6 mb-4">
                          {testimonial.content}
                        </p>

                        {/* Images */}
                        {testimonial.images && testimonial.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {testimonial.images.map((img, imgIdx) => (
                              <div
                                key={imgIdx}
                                className="relative h-24 rounded-lg overflow-hidden group/img cursor-pointer"
                              >
                                <Image
                                  src={img}
                                  alt={`Review photo ${imgIdx + 1}`}
                                  fill
                                  className="object-cover group-hover/img:scale-110 transition-transform duration-300"
                                  sizes="(max-width: 768px) 50vw, 200px"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Video Thumbnail */}
                        {testimonial.videoUrl && (
                          <button
                            onClick={() => setSelectedVideo(testimonial.videoUrl!)}
                            className="relative w-full h-32 rounded-lg overflow-hidden group/video mb-4"
                          >
                            <Image
                              src={testimonial.image}
                              alt="Video thumbnail"
                              fill
                              className="object-cover group-hover/video:scale-110 transition-transform duration-300"
                              sizes="400px"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-primary-600 ml-1" />
                              </div>
                            </div>
                          </button>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(testimonial.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>

                          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{testimonial.helpful}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              // Slider View
              <div className="relative max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    {/* Content */}
                    <div className="p-8 md:p-12">
                      {/* Header */}
                      <div className="flex items-start gap-6 mb-8">
                        <div className="relative flex-shrink-0">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary-500">
                            <Image
                              src={sortedTestimonials[currentSlide].image}
                              alt={sortedTestimonials[currentSlide].name}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          {sortedTestimonials[currentSlide].verified && (
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                              <Verified className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">
                            {sortedTestimonials[currentSlide].name}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{sortedTestimonials[currentSlide].location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= sortedTestimonials[currentSlide].rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                        {sortedTestimonials[currentSlide].title}
                      </h4>

                      {/* Quote */}
                      <div className="relative mb-6">
                        <Quote className="w-12 h-12 text-primary-200 dark:text-primary-900/50 absolute -top-4 -left-2" />
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-8">
                          {sortedTestimonials[currentSlide].content}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full font-semibold text-sm">
                          {sortedTestimonials[currentSlide].roomType}
                        </span>
                        <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold text-sm">
                          {sortedTestimonials[currentSlide].stayDuration}
                        </span>
                        <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(sortedTestimonials[currentSlide].date).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </div>

                      {/* Images */}
                      {sortedTestimonials[currentSlide].images &&
                        sortedTestimonials[currentSlide].images!.length > 0 && (
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {sortedTestimonials[currentSlide].images!.map((img, imgIdx) => (
                              <div
                                key={imgIdx}
                                className="relative h-48 rounded-xl overflow-hidden group/img cursor-pointer"
                              >
                                <Image
                                  src={img}
                                  alt={`Review photo ${imgIdx + 1}`}
                                  fill
                                  className="object-cover group-hover/img:scale-110 transition-transform duration-300"
                                  sizes="(max-width: 768px) 50vw, 300px"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Video */}
                      {sortedTestimonials[currentSlide].videoUrl && (
                        <button
                          onClick={() =>
                            setSelectedVideo(sortedTestimonials[currentSlide].videoUrl!)
                          }
                          className="relative w-full h-64 rounded-xl overflow-hidden group/video mb-6"
                        >
                          <Image
                            src={sortedTestimonials[currentSlide].image}
                            alt="Video thumbnail"
                            fill
                            className="object-cover group-hover/video:scale-110 transition-transform duration-300"
                            sizes="600px"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform">
                              <Play className="w-10 h-10 text-primary-600 ml-1" />
                            </div>
                          </div>
                        </button>
                      )}

                      {/* Helpful */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Was this review helpful?
                        </span>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-lg font-semibold hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors">
                          <ThumbsUp className="w-5 h-5" />
                          <span>{sortedTestimonials[currentSlide].helpful} found this helpful</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevSlide}
                    className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
                  </motion.button>

                  {/* Indicators */}
                  <div className="flex gap-2">
                    {sortedTestimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentSlide
                            ? 'bg-primary-600 w-8'
                            : 'bg-gray-300 dark:bg-gray-600 w-2'
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                    className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* No Results */}
            {sortedTestimonials.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedRoomType('All Rooms');
                    setSelectedRating('All Ratings');
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Video Testimonials Section */}
        {videoTestimonials.length > 0 && (
          <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-white dark:bg-gray-800 rounded-full mb-6 shadow-lg">
                  <Play className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Video Testimonials
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Hear From Our Guests
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Watch authentic experiences shared by our valued guests
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videoTestimonials.map((testimonial, idx) => (
                  <motion.button
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedVideo(testimonial.videoUrl!)}
                    className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-2xl">
                        <Play className="w-10 h-10 text-primary-600 ml-1" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= testimonial.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <h4 className="font-bold text-white text-lg mb-1">{testimonial.name}</h4>
                      <p className="text-white/80 text-sm">{testimonial.location}</p>
                    </div>

                    {/* Verified Badge */}
                    {testimonial.verified && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <iframe
                  src={selectedVideo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-gray-950 dark:via-primary-900 dark:to-gray-950 relative overflow-hidden">
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
                <Heart className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white uppercase tracking-wider">
                  Join Our Happy Guests
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Experience The Ariston Difference
              </h2>

              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Don't just take our word for it. Book your stay today and discover why over 98% of
                our guests would recommend us to their friends and family.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${
                    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567'
                  }?text=${encodeURIComponent(
                    "Hi! I'd like to book a room at Ariston Suites after reading the amazing reviews!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-10 py-5 bg-white text-primary-900 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 font-bold text-lg flex items-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Book Your Stay Now</span>
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
                  href="/rooms"
                  className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-full hover:bg-white/20 transition-all duration-300 font-bold text-lg flex items-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>Explore Our Rooms</span>
                </motion.a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-4 gap-4 mt-16 pt-12 border-t border-white/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">4.9★</div>
                  <div className="text-sm text-white/80">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-sm text-white/80">Recommend</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">1.2K+</div>
                  <div className="text-sm text-white/80">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">15+</div>
                  <div className="text-sm text-white/80">Awards</div>
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
