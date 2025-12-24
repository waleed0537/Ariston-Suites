'use client';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import { ThemeProvider } from '@/components/home/theme-provider';
import WhatsAppButton from '@/components/home/whatsapp-button';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Grid3x3,
  Heart,
  List,
  Search,
  Sparkles,
  Tag,
  TrendingUp,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Blog post data
const blogPosts = [
  {
    id: 1,
    slug: 'ultimate-guide-luxury-travel-karachi',
    title: 'The Ultimate Guide to Luxury Travel in Karachi',
    excerpt:
      'Discover the finest experiences Karachi has to offer, from luxury hotels to exquisite dining and cultural attractions that define the city.',
    content: 'Full article content here...',
    author: {
      name: 'Sarah Ahmed',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Travel writer and luxury hospitality expert',
    },
    category: 'Travel',
    tags: ['Karachi', 'Luxury Travel', 'City Guide', 'Tourism'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    date: '2024-12-20',
    readTime: '8 min read',
    views: 2456,
    likes: 142,
    featured: true,
  },
  {
    id: 2,
    slug: 'choosing-perfect-hotel-room',
    title: 'How to Choose the Perfect Hotel Room for Your Stay',
    excerpt:
      'A comprehensive guide to selecting the right accommodation based on your needs, budget, and travel purpose.',
    content: 'Full article content here...',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Hospitality consultant and frequent traveler',
    },
    category: 'Hospitality',
    tags: ['Hotel Tips', 'Travel Planning', 'Accommodation'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
    date: '2024-12-18',
    readTime: '6 min read',
    views: 1823,
    likes: 98,
    featured: true,
  },
  {
    id: 3,
    slug: 'top-10-business-travel-tips',
    title: 'Top 10 Business Travel Tips Every Professional Should Know',
    excerpt:
      'Make your business trips more productive and comfortable with these essential tips from seasoned business travelers.',
    content: 'Full article content here...',
    author: {
      name: 'David Williams',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Business travel consultant',
    },
    category: 'Lifestyle',
    tags: ['Business Travel', 'Productivity', 'Travel Tips'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
    date: '2024-12-15',
    readTime: '7 min read',
    views: 3102,
    likes: 187,
    featured: false,
  },
  {
    id: 4,
    slug: 'wellness-travel-guide',
    title: 'The Rise of Wellness Travel: A Complete Guide',
    excerpt:
      'Explore how wellness travel is transforming the hospitality industry and discover the best practices for a rejuvenating getaway.',
    content: 'Full article content here...',
    author: {
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Wellness and lifestyle blogger',
    },
    category: 'Lifestyle',
    tags: ['Wellness', 'Health', 'Relaxation', 'Travel Trends'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
    date: '2024-12-12',
    readTime: '9 min read',
    views: 1654,
    likes: 121,
    featured: false,
  },
  {
    id: 5,
    slug: 'sustainable-hospitality-practices',
    title: 'Sustainable Hospitality: The Future of Hotels',
    excerpt:
      'Learn how modern hotels are embracing sustainability and what it means for the future of travel and hospitality.',
    content: 'Full article content here...',
    author: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Environmental consultant in hospitality',
    },
    category: 'Hospitality',
    tags: ['Sustainability', 'Eco-Friendly', 'Green Hotels', 'Environment'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
    date: '2024-12-10',
    readTime: '10 min read',
    views: 2187,
    likes: 156,
    featured: false,
  },
  {
    id: 6,
    slug: 'hidden-gems-pakistan-travel',
    title: 'Hidden Gems: Undiscovered Travel Destinations in Pakistan',
    excerpt:
      "Venture beyond the beaten path and explore Pakistan's most stunning yet underrated travel destinations.",
    content: 'Full article content here...',
    author: {
      name: 'Aisha Khan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      bio: 'Adventure travel writer',
    },
    category: 'Travel',
    tags: ['Pakistan', 'Adventure', 'Hidden Gems', 'Tourism'],
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200',
    date: '2024-12-08',
    readTime: '12 min read',
    views: 4231,
    likes: 298,
    featured: true,
  },
  {
    id: 7,
    slug: 'hotel-design-trends-2025',
    title: "2025 Hotel Design Trends: What's Shaping the Future",
    excerpt:
      'Explore the latest design trends revolutionizing hotel interiors and guest experiences in 2025.',
    content: 'Full article content here...',
    author: {
      name: 'Sophia Martinez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      bio: 'Interior design specialist',
    },
    category: 'Hospitality',
    tags: ['Design', 'Trends', 'Interior Design', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
    date: '2024-12-05',
    readTime: '8 min read',
    views: 1876,
    likes: 134,
    featured: false,
  },
  {
    id: 8,
    slug: 'family-vacation-planning-tips',
    title: "Planning the Perfect Family Vacation: A Parent's Guide",
    excerpt:
      'Essential tips and tricks for planning a stress-free, memorable family vacation that everyone will enjoy.',
    content: 'Full article content here...',
    author: {
      name: 'Robert Taylor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      bio: 'Family travel expert',
    },
    category: 'Lifestyle',
    tags: ['Family Travel', 'Vacation Planning', 'Kids', 'Travel Tips'],
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200',
    date: '2024-12-03',
    readTime: '11 min read',
    views: 2543,
    likes: 189,
    featured: false,
  },
  {
    id: 9,
    slug: 'food-tourism-karachi',
    title: 'A Culinary Journey: Food Tourism in Karachi',
    excerpt:
      "Embark on a gastronomic adventure through Karachi's diverse food scene, from street food to fine dining.",
    content: 'Full article content here...',
    author: {
      name: 'Hassan Ali',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
      bio: 'Food critic and travel blogger',
    },
    category: 'Travel',
    tags: ['Food', 'Karachi', 'Culinary', 'Street Food'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    date: '2024-12-01',
    readTime: '7 min read',
    views: 3456,
    likes: 267,
    featured: false,
  },
];

// Categories
const categories = [
  { name: 'All Posts', count: blogPosts.length, icon: BookOpen },
  {
    name: 'Travel',
    count: blogPosts.filter((p) => p.category === 'Travel').length,
    icon: Sparkles,
  },
  {
    name: 'Hospitality',
    count: blogPosts.filter((p) => p.category === 'Hospitality').length,
    icon: Heart,
  },
  {
    name: 'Lifestyle',
    count: blogPosts.filter((p) => p.category === 'Lifestyle').length,
    icon: TrendingUp,
  },
];

// Popular tags
const popularTags = [
  'Karachi',
  'Luxury Travel',
  'Travel Tips',
  'Hotel Tips',
  'Sustainability',
  'Design',
  'Family Travel',
  'Business Travel',
  'Food',
  'Adventure',
];

// Archive by month
const archives = [
  { month: 'December 2024', count: 6 },
  { month: 'November 2024', count: 8 },
  { month: 'October 2024', count: 12 },
  { month: 'September 2024', count: 10 },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const recentPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
              '@type': 'Blog',
              name: 'Ariston Suites Blog',
              description: 'Travel, hospitality, and lifestyle insights from Ariston Suites',
              url: 'https://aristonsuites.com/blog',
              publisher: {
                '@type': 'Organization',
                name: 'Ariston Suites',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://aristonsuites.com/logo.png',
                },
              },
              blogPost: blogPosts.slice(0, 5).map((post) => ({
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.excerpt,
                image: post.image,
                datePublished: post.date,
                author: {
                  '@type': 'Person',
                  name: post.author.name,
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'Ariston Suites',
                },
              })),
            }),
          }}
        />

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1920"
              alt="Blog Hero"
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
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Travel & Lifestyle Blog
                </span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-white"
                >
                  Stories &
                  <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                    Insights
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto"
                >
                  Discover travel guides, hospitality insights, and lifestyle tips from our experts
                  and guest contributors
                </motion.p>
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 text-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-20 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Categories */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide w-full lg:w-auto">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.name;
                  return (
                    <motion.button
                      key={category.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`group relative px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{category.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {category.count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-3">
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
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      viewMode === 'list'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing{' '}
              <span className="font-bold text-gray-900 dark:text-white">
                {filteredPosts.length}
              </span>{' '}
              of <span className="font-bold text-gray-900 dark:text-white">{blogPosts.length}</span>{' '}
              articles
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {selectedCategory === 'All Posts' && searchQuery === '' && (
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
                  <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Featured Articles
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Editor's Picks
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Hand-picked articles showcasing the best of travel and hospitality
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          {/* Category Badge */}
                          <span className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-bold mb-4">
                            {post.category}
                          </span>

                          {/* Title */}
                          <h3 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-white/90 mb-4 line-clamp-2">{post.excerpt}</p>

                          {/* Meta */}
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={32}
                                height={32}
                                className="rounded-full border-2 border-white/50"
                              />
                              <span>{post.author.name}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Featured Badge */}
                        <div className="absolute top-6 right-6 px-4 py-2 bg-amber-500 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Featured
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                {viewMode === 'grid' ? (
                  // Grid View
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                      {filteredPosts.map((post, idx) => (
                        <motion.article
                          key={post.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                        >
                          <Link href={`/blog/${post.slug}`}>
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                              {/* Category Badge */}
                              <span className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold">
                                {post.category}
                              </span>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              {/* Title */}
                              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                                {post.title}
                              </h3>

                              {/* Excerpt */}
                              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>

                              {/* Meta */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                  />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {post.author.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{post.views}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    <span>{post.likes}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  // List View
                  <motion.div layout className="space-y-6">
                    <AnimatePresence mode="popLayout">
                      {filteredPosts.map((post, idx) => (
                        <motion.article
                          key={post.id}
                          layout
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                        >
                          <Link href={`/blog/${post.slug}`}>
                            <div className="grid md:grid-cols-3 gap-6 p-6">
                              {/* Image */}
                              <div className="relative h-48 md:h-auto rounded-xl overflow-hidden">
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                  sizes="(max-width: 768px) 100vw, 300px"
                                />
                                <span className="absolute top-3 left-3 px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold">
                                  {post.category}
                                </span>
                              </div>

                              {/* Content */}
                              <div className="md:col-span-2 flex flex-col">
                                <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                  {post.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                                  {post.excerpt}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Image
                                      src={post.author.avatar}
                                      alt={post.author.name}
                                      width={40}
                                      height={40}
                                      className="rounded-full"
                                    />
                                    <div>
                                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {post.author.name}
                                      </p>
                                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        <span>
                                          {new Date(post.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                          })}
                                        </span>
                                        <span>•</span>
                                        <Clock className="w-3 h-3" />
                                        <span>{post.readTime}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Eye className="w-4 h-4" />
                                      <span>{post.views}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Heart className="w-4 h-4" />
                                      <span>{post.likes}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* No Results */}
                {filteredPosts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All Posts');
                        setSearchQuery('');
                      }}
                      className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Popular Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Posts */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.slice(0, 5).map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Archives */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    Archives
                  </h3>
                  <div className="space-y-2">
                    {archives.map((archive) => (
                      <Link
                        key={archive.month}
                        href={`/blog/archive/${archive.month.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {archive.month}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          {archive.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Newsletter CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 shadow-xl text-white"
                >
                  <Sparkles className="w-12 h-12 mb-4" />
                  <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Subscribe to our newsletter for the latest travel tips and exclusive offers.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-white text-primary-600 rounded-lg font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Subscribe
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </motion.div>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}
