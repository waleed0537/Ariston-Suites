'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Menu, X, Phone, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './theme-provider';
import Link from 'next/link';
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = mounted && isScrolled
    ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
    : 'bg-transparent';

  const textColorClasses = mounted && isScrolled
    ? 'text-primary-900 dark:text-white'
    : 'text-white';

  const textColorSecondary = mounted && isScrolled
    ? 'text-accent-600 dark:text-gray-400'
    : 'text-white/80';

  const navTextColor = mounted && isScrolled
    ? 'text-accent-900 dark:text-gray-200'
    : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerClasses}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">AS</span>
            </div>
            <div className="ml-3">
              <h1 className={`font-display text-xl font-bold transition-colors ${textColorClasses}`}>
                Ariston Suites
              </h1>
              <p className={`text-xs transition-colors ${textColorSecondary}`}>
                Luxury Boutique Hotel
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${navTextColor}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${navTextColor}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="tel:+923001234567"
              className={`flex items-center gap-2 transition-colors ${navTextColor}`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+92 300 1234567</span>
            </a>
            <a
              href="https://wa.me/+923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium"
            >
              Book Now
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${navTextColor}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors ${navTextColor}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-accent-900 dark:text-gray-200 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
                <a
                  href="tel:+923001234567"
                  className="flex items-center gap-2 text-accent-900 dark:text-gray-200"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+92 300 1234567</span>
                </a>
                <a
                  href="https://wa.me/+923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center"
                >
                  Book Now via WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}