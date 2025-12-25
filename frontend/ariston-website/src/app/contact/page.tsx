'use client';

import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import { ThemeProvider } from '@/components/home/theme-provider';
import WhatsAppButton from '@/components/home/whatsapp-button';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Contact methods
const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Available 24/7 for your convenience',
    primary: '+92 300 1234567',
    secondary: '+92 300 1234568',
    action: 'tel:+923001234567',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Instant messaging for quick responses',
    primary: '+92 300 1234567',
    secondary: 'Chat available 24/7',
    action: 'https://wa.me/923001234567',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Mail,
    title: 'Email',
    description: "We'll respond within 24 hours",
    primary: 'info@aristonsuites.com',
    secondary: 'reservations@aristonsuites.com',
    action: 'mailto:info@aristonsuites.com',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come see our beautiful property',
    primary: '123 Main Street',
    secondary: 'Karachi, Pakistan',
    action: '#map',
    color: 'from-red-500 to-red-600',
  },
];

// Office hours
const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 10:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 8:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 6:00 PM' },
  { note: 'Front desk and WhatsApp support available 24/7' },
];

// FAQ
const faqs = [
  {
    question: 'What are your check-in and check-out times?',
    answer:
      'Check-in is at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out are available upon request and subject to availability.',
  },
  {
    question: 'Do you offer airport transportation?',
    answer:
      'Yes, we offer airport pickup and drop-off services. Please contact us at least 24 hours in advance to arrange transportation.',
  },
  {
    question: 'Is parking available?',
    answer:
      'Yes, we provide complimentary secure parking for all our guests. Our parking area is covered and monitored 24/7.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge. Please contact us directly for special circumstances.',
  },
  {
    question: 'Do you have facilities for events or meetings?',
    answer:
      'While we primarily focus on accommodation, we can arrange small gatherings or meetings. Please contact us to discuss your specific requirements.',
  },
];

// Social media
const socialMedia = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/aristonsuites',
    color: 'hover:bg-[#1877F2]',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/aristonsuites',
    color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/aristonsuites',
    color: 'hover:bg-[#1DA1F2]',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    checkIn: '',
    checkOut: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Redirect to WhatsApp with message
      const message = encodeURIComponent(
        `Hi! I'm ${formData.name}.\n\nSubject: ${formData.subject}\n\nMessage: ${formData.message}\n\nEmail: ${formData.email}\nPhone: ${formData.phone}`
      );
      window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              image: 'https://aristonsuites.com/logo.png',
              '@id': 'https://aristonsuites.com',
              url: 'https://aristonsuites.com',
              telephone: '+923001234567',
              email: 'info@aristonsuites.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Main Street',
                addressLocality: 'Karachi',
                addressRegion: 'Sindh',
                postalCode: '75500',
                addressCountry: 'PK',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 24.8607,
                longitude: 67.0011,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '00:00',
                  closes: '23:59',
                },
              ],
              sameAs: [
                'https://facebook.com/aristonsuites',
                'https://instagram.com/aristonsuites',
                'https://twitter.com/aristonsuites',
              ],
            }),
          }}
        />

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920"
              alt="Contact Ariston Suites"
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
              <div className="space-y-6 mt-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-white"
                >
                  Get in
                  <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                    Touch
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto"
                >
                  Have questions about your stay? Our friendly team is available 24/7 to assist you
                  with reservations, inquiries, and special requests.
                </motion.p>
              </div>

              {/* Quick Contact Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-10 py-5 bg-white text-primary-900 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 font-bold text-lg flex items-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Chat on WhatsApp</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </a>

                <a
                  href="tel:+923001234567"
                  className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-full hover:bg-white/20 transition-all duration-300 font-bold text-lg flex items-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  <span>Call Now</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="py-8 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto max-w-7xl">
            <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                Home
              </a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white font-medium">Contact</span>
            </nav>
          </div>
        </section>

        {/* Contact Methods */}
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
                Multiple Ways to Reach Us
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose your preferred method of communication
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.title}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div
                      className={`relative w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {method.description}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      {method.primary}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{method.secondary}</p>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Send Us a Message
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                            placeholder="+92 300 1234567"
                          />
                        </div>
                      </div>

                      {/* Check-in/Check-out */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Check-in Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date"
                              name="checkIn"
                              value={formData.checkIn}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Check-out Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date"
                              name="checkOut"
                              value={formData.checkOut}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        >
                          <option value="">Select a subject</option>
                          <option value="reservation">Room Reservation</option>
                          <option value="inquiry">General Inquiry</option>
                          <option value="feedback">Feedback</option>
                          <option value="complaint">Complaint</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white resize-none"
                          placeholder="Tell us about your inquiry..."
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6" />
                            Send Message via WhatsApp
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                        By submitting this form, you'll be redirected to WhatsApp to complete your
                        inquiry.
                      </p>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-bold text-2xl text-gray-900 dark:text-white mb-4">
                        Thank You!
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        We've received your message and will get back to you shortly.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Info Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Office Hours */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                      Office Hours
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {officeHours.map((hour, idx) =>
                      hour.note ? (
                        <div
                          key={idx}
                          className="pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                            {hour.note}
                          </p>
                        </div>
                      ) : (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">{hour.day}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {hour.hours}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 shadow-xl text-white">
                  <h3 className="font-bold text-xl mb-4">Emergency Contact</h3>
                  <p className="mb-4 text-white/90">
                    For urgent matters outside office hours, please call:
                  </p>
                  <a
                    href="tel:+923001234567"
                    className="block text-2xl font-bold mb-2 hover:text-white/80 transition-colors"
                  >
                    +92 300 1234567
                  </a>
                  <p className="text-sm text-white/80">Available 24/7</p>
                </div>

                {/* Social Media */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    {socialMedia.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                        >
                          <Icon className="w-6 h-6" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section id="map" className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Find Us Here
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Visit our beautiful property in the heart of Karachi
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
            >
              {/* Replace with your actual Google Maps embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.5458!2d67.0!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ariston Suites Location"
              />

              {/* Location Card Overlay */}
              <div className="absolute bottom-8 left-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      Ariston Suites
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      123 Main Street
                      <br />
                      Karachi, Sindh 75500
                      <br />
                      Pakistan
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=24.8607,67.0011"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      Get Directions
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Quick answers to common questions
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Don't see your question answered?
              </p>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600  rounded-xl hover:bg-primary-700 transition-colors font-bold shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Ask Us on WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}
