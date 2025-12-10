'use client';

import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">AS</span>
              </div>
              <div className="ml-3">
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                  Ariston Suites
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Luxury Boutique Hotel</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Experience luxury and comfort in the heart of the city. Your perfect stay begins here.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 rounded-full flex items-center justify-center transition-all duration-300 text-gray-700 dark:text-gray-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 rounded-full flex items-center justify-center transition-all duration-300 text-gray-700 dark:text-gray-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 rounded-full flex items-center justify-center transition-all duration-300 text-gray-700 dark:text-gray-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Rooms & Rates', 'Amenities', 'Testimonials', 'Blog', 'About Us', 'Contact'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase().replace(/\s+/g, '-').replace('&', '')}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Our Services</h4>
            <ul className="space-y-2">
              {[
                '24/7 Reception',
                'Complimentary Breakfast',
                'Free WiFi',
                'Laundry Service',
                'Room Service',
                'Concierge',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="/services"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  123 Main Street
                  <br />
                  Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+923001234567"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm block"
                  >
                    +92 300 1234567
                  </a>
                  <a
                    href="tel:+923001234568"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm block"
                  >
                    +92 300 1234568
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@aristonsuites.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                >
                  info@aristonsuites.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>© {currentYear} Ariston Suites. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-conditions" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Terms & Conditions
              </a>
              <a href="/sitemap" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}