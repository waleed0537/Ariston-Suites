'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567';
  const message = encodeURIComponent(
    'Hello! I would like to inquire about booking a room at Ariston Suites.'
  );

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 w-64"
            >
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="font-semibold text-gray-900 mb-1">Need help?</p>
              <p className="text-sm text-gray-600">
                Chat with us on WhatsApp for instant booking assistance!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />
        </a>

        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </div>
    </motion.div>
  );
}