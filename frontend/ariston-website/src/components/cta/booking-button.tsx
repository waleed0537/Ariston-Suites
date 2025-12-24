// components/cta/booking-button.tsx
'use client';

import { ctaConfig, getBookingUrl, trackCTA } from '@/lib/cta-config';
import { Calendar, MessageCircle } from 'lucide-react';

interface BookingButtonProps {
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function BookingButton({
  roomType,
  checkIn,
  checkOut,
  className = '',
  children,
  variant = 'primary',
  size = 'md',
}: BookingButtonProps) {
  const url = getBookingUrl(roomType, checkIn, checkOut);
  const isExternal = url.startsWith('http');

  const handleClick = () => {
    trackCTA('booking_click', roomType || 'general');
  };

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-primary-900 border-2 border-primary-600',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const Icon = ctaConfig.mode === 'whatsapp' ? MessageCircle : Calendar;

  return (
    <a
      href={url}
      onClick={handleClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-bold
        transition-all duration-300 shadow-lg hover:shadow-xl
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <Icon className="w-5 h-5" />
      {children || (ctaConfig.mode === 'whatsapp' ? 'Book via WhatsApp' : 'Book Now')}
    </a>
  );
}
