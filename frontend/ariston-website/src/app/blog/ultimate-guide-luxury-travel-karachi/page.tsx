'use client';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import { ThemeProvider } from '@/components/home/theme-provider';
import WhatsAppButton from '@/components/home/whatsapp-button';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Facebook,
  Heart,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
  Tag,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// This would normally come from props/database
const blogPost = {
  id: 1,
  slug: 'ultimate-guide-luxury-travel-karachi',
  title: 'The Ultimate Guide to Luxury Travel in Karachi',
  excerpt:
    'Discover the finest experiences Karachi has to offer, from luxury hotels to exquisite dining and cultural attractions that define the city.',
  author: {
    name: 'Sarah Ahmed',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: "Travel writer and luxury hospitality expert with over 10 years of experience exploring the world's finest destinations.",
    social: {
      twitter: 'https://twitter.com/sarahahmed',
      linkedin: 'https://linkedin.com/in/sarahahmed',
    },
  },
  category: 'Travel',
  tags: ['Karachi', 'Luxury Travel', 'City Guide', 'Tourism'],
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920',
  date: '2024-12-20',
  readTime: '8 min read',
  views: 2456,
  likes: 142,
  bookmarks: 89,
  content: `
    <h2>Introduction</h2>
    <p>Karachi, Pakistan's largest city and economic hub, is a treasure trove of luxury experiences waiting to be discovered. From world-class hotels to exquisite dining establishments, the city offers a unique blend of traditional hospitality and modern luxury that captivates both business and leisure travelers.</p>

    <p>In this comprehensive guide, we'll explore the finest aspects of luxury travel in Karachi, helping you make the most of your visit to this vibrant metropolis.</p>

    <h2>Luxury Accommodations</h2>
    <p>Karachi boasts an impressive array of luxury hotels that cater to discerning travelers. These establishments combine Pakistani hospitality with international standards of service and comfort.</p>

    <h3>Top Luxury Hotels</h3>
    <p>The city's premium hotels offer stunning views, world-class amenities, and impeccable service. Properties like Ariston Suites set the standard for boutique luxury, offering personalized experiences that larger chains simply cannot match.</p>

    <p>What sets these hotels apart is their attention to detail - from the quality of linens to the expertise of the concierge team, every aspect is carefully curated to ensure an unforgettable stay.</p>

    <h2>Culinary Excellence</h2>
    <p>Karachi's dining scene is nothing short of spectacular. The city offers everything from traditional Pakistani cuisine to international fine dining experiences.</p>

    <h3>Fine Dining Restaurants</h3>
    <p>The city's upscale restaurants showcase both local and international cuisines, prepared by world-class chefs. Whether you're craving authentic Sindhi flavors or contemporary fusion dishes, Karachi's culinary landscape has something to satisfy every palate.</p>

    <h2>Cultural Attractions</h2>
    <p>Beyond luxury accommodations and dining, Karachi offers rich cultural experiences. The city's museums, galleries, and historical sites provide insight into Pakistan's diverse heritage and contemporary art scene.</p>

    <h3>Must-Visit Landmarks</h3>
    <p>From the iconic Quaid-e-Azam's Mausoleum to the historic Mohatta Palace, Karachi's landmarks tell the story of a city that bridges past and present. These sites are best explored with knowledgeable guides who can provide context and fascinating anecdotes.</p>

    <h2>Shopping and Entertainment</h2>
    <p>Luxury shopping in Karachi ranges from high-end malls to exclusive boutiques. The city's entertainment options include everything from sophisticated lounge bars to cultural performances.</p>

    <h2>Transportation and Logistics</h2>
    <p>Navigating Karachi in style is easier than you might think. Premium car services and private drivers are readily available, ensuring comfortable transportation between destinations.</p>

    <h2>Conclusion</h2>
    <p>Karachi offers a unique luxury travel experience that combines the warmth of Pakistani hospitality with world-class facilities and services. Whether you're visiting for business or pleasure, the city promises memorable experiences that will leave you wanting to return.</p>

    <p>Plan your luxury escape to Karachi and discover why this dynamic city is becoming one of South Asia's most exciting destinations for discerning travelers.</p>
  `,
};

// Related posts
const relatedPosts = [
  {
    id: 2,
    slug: 'choosing-perfect-hotel-room',
    title: 'How to Choose the Perfect Hotel Room for Your Stay',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600',
    category: 'Hospitality',
    readTime: '6 min read',
  },
  {
    id: 3,
    slug: 'top-10-business-travel-tips',
    title: 'Top 10 Business Travel Tips Every Professional Should Know',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
    category: 'Lifestyle',
    readTime: '7 min read',
  },
  {
    id: 6,
    slug: 'hidden-gems-pakistan-travel',
    title: 'Hidden Gems: Undiscovered Travel Destinations in Pakistan',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600',
    category: 'Travel',
    readTime: '12 min read',
  },
];

export default function BlogPostPage() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blogPost.title);

    const shareUrls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${title}&body=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: blogPost.title,
              description: blogPost.excerpt,
              image: blogPost.image,
              datePublished: blogPost.date,
              dateModified: blogPost.date,
              author: {
                '@type': 'Person',
                name: blogPost.author.name,
                image: blogPost.author.avatar,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Ariston Suites',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://aristonsuites.com/logo.png',
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://aristonsuites.com/blog/${blogPost.slug}`,
              },
              keywords: blogPost.tags.join(', '),
              articleSection: blogPost.category,
              wordCount: blogPost.content.split(' ').length,
            }),
          }}
        />

        {/* Breadcrumb */}
        <section className="pt-32 pb-8 px-4 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto max-w-4xl">
            <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-primary-600 dark:hover:text-primary-400">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/blog/category/${blogPost.category.toLowerCase()}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {blogPost.category}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white font-medium">Current Article</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <article className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href={`/blog/category/${blogPost.category.toLowerCase()}`}
                className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-bold mb-6 hover:bg-primary-700 transition-colors"
              >
                {blogPost.category}
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              {blogPost.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              {blogPost.excerpt}
            </motion.p>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200 dark:border-gray-800"
            >
              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={blogPost.author.avatar}
                  alt={blogPost.author.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-primary-500"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{blogPost.author.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Author</p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300 dark:bg-gray-700" />

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(blogPost.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5" />
                <span>{blogPost.readTime}</span>
              </div>

              {/* Views */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Eye className="w-5 h-5" />
                <span>{blogPost.views} views</span>
              </div>
            </motion.div>
          </div>
        </article>

        {/* Featured Image */}
        <section className="px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="container mx-auto max-w-6xl"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1536px) 100vw, 1536px"
              />
            </div>
          </motion.div>
        </section>

        {/* Article Content */}
        <section className="px-4 pb-20">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Social Sharing Sidebar (Desktop) */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="hidden lg:block lg:col-span-1"
              >
                <div className="sticky top-32 space-y-4">
                  {/* Like Button */}
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      liked
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  </button>
                  <div className="text-center text-sm font-bold text-gray-600 dark:text-gray-400">
                    {blogPost.likes + (liked ? 1 : 0)}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      bookmarked
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Share Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>

                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute left-16 top-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 space-y-2"
                      >
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-10 h-10 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] flex items-center justify-center transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-10 h-10 rounded-lg bg-[#1877F2] text-white hover:bg-[#166fe5] flex items-center justify-center transition-colors"
                        >
                          <Facebook className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="w-10 h-10 rounded-lg bg-[#0A66C2] text-white hover:bg-[#095196] flex items-center justify-center transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleShare('email')}
                          className="w-10 h-10 rounded-lg bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.aside>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="lg:col-span-8"
              >
                <div
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Tag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    {blogPost.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Share Buttons */}
                <div className="lg:hidden mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                    Share this article
                  </h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex-1 px-4 py-3 bg-[#1DA1F2] text-white rounded-xl hover:bg-[#1a8cd8] flex items-center justify-center gap-2 transition-colors font-semibold"
                    >
                      <Twitter className="w-5 h-5" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex-1 px-4 py-3 bg-[#1877F2] text-white rounded-xl hover:bg-[#166fe5] flex items-center justify-center gap-2 transition-colors font-semibold"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex-1 px-4 py-3 bg-[#0A66C2] text-white rounded-xl hover:bg-[#095196] flex items-center justify-center gap-2 transition-colors font-semibold"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </button>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-6">
                    <Image
                      src={blogPost.author.avatar}
                      alt={blogPost.author.name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-white dark:border-gray-700 shadow-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                          {blogPost.author.name}
                        </h3>
                        {blogPost.author.social.twitter && (
                          <a
                            href={blogPost.author.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {blogPost.author.social.linkedin && (
                          <a
                            href={blogPost.author.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {blogPost.author.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="lg:col-span-3"
              >
                <div className="sticky top-32 space-y-8">
                  {/* Newsletter */}
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 shadow-xl text-white">
                    <MessageCircle className="w-12 h-12 mb-4" />
                    <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
                    <p className="text-white/90 text-sm mb-4">
                      Get the latest articles delivered to your inbox.
                    </p>
                    <form className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email"
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
                  </div>

                  {/* Table of Contents (could be auto-generated) */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                      In This Article
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <a
                          href="#introduction"
                          className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          Introduction
                        </a>
                      </li>
                      <li>
                        <a
                          href="#luxury-accommodations"
                          className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          Luxury Accommodations
                        </a>
                      </li>
                      <li>
                        <a
                          href="#culinary-excellence"
                          className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          Culinary Excellence
                        </a>
                      </li>
                      <li>
                        <a
                          href="#cultural-attractions"
                          className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          Cultural Attractions
                        </a>
                      </li>
                      <li>
                        <a
                          href="#conclusion"
                          className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          Conclusion
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Related Articles
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Continue exploring our travel and lifestyle content
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Back to Blog */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to All Articles
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}
