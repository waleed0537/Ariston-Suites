// lib/cta-config.ts

export type CTAMode = 'whatsapp' | 'booking' | 'contact';

export interface CTAConfig {
  mode: CTAMode;
  whatsapp: {
    number: string;
    defaultMessage: string;
  };
  booking: {
    url: string;
    enabled: boolean;
  };
  contact: {
    phone: string;
    email: string;
  };
  tracking: {
    enabled: boolean;
    gtmId?: string;
  };
}

// Current configuration - easily switch between modes
export const ctaConfig: CTAConfig = {
  // Change this to switch between WhatsApp, booking system, or contact page
  mode: (process.env.NEXT_PUBLIC_CTA_MODE as CTAMode) || 'whatsapp',

  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567',
    defaultMessage: "Hi! I'd like to inquire about booking a room at Ariston Suites.",
  },

  booking: {
    url: process.env.NEXT_PUBLIC_BOOKING_URL || '/booking',
    enabled: process.env.NEXT_PUBLIC_BOOKING_ENABLED === 'true',
  },

  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+923001234567',
    email: process.env.NEXT_PUBLIC_EMAIL || 'info@aristonsuites.com',
  },

  tracking: {
    enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  },
};

/**
 * Generate booking URL based on current CTA mode
 * @param roomType - Type of room being booked
 * @param checkIn - Check-in date (YYYY-MM-DD)
 * @param checkOut - Check-out date (YYYY-MM-DD)
 * @returns URL string for the booking action
 */
export function getBookingUrl(roomType?: string, checkIn?: string, checkOut?: string): string {
  const config = ctaConfig;

  // WhatsApp mode - construct message with booking details
  if (config.mode === 'whatsapp') {
    let message = config.whatsapp.defaultMessage;

    if (roomType) {
      message += `\n\nRoom Type: ${roomType}`;
    }
    if (checkIn) {
      message += `\nCheck-in Date: ${checkIn}`;
    }
    if (checkOut) {
      message += `\nCheck-out Date: ${checkOut}`;
    }

    const phoneNumber = config.whatsapp.number.replace(/\+/g, '');
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  // Booking system mode - construct URL with query parameters
  if (config.mode === 'booking' && config.booking.enabled) {
    const params = new URLSearchParams();
    if (roomType) params.append('room', roomType);
    if (checkIn) params.append('checkin', checkIn);
    if (checkOut) params.append('checkout', checkOut);

    const queryString = params.toString();
    return queryString ? `${config.booking.url}?${queryString}` : config.booking.url;
  }

  // Fallback to contact page
  return '/contact';
}

/**
 * Get contact phone URL
 * @returns tel: link for phone calls
 */
export function getPhoneUrl(): string {
  return `tel:${ctaConfig.contact.phone}`;
}

/**
 * Get email URL
 * @param subject - Optional email subject
 * @returns mailto: link
 */
export function getEmailUrl(subject?: string): string {
  const email = ctaConfig.contact.email;
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

/**
 * Get WhatsApp URL with custom message
 * @param message - Custom message to pre-fill
 * @returns WhatsApp chat URL
 */
export function getWhatsAppUrl(message?: string): string {
  const phoneNumber = ctaConfig.whatsapp.number.replace(/\+/g, '');
  const text = message || ctaConfig.whatsapp.defaultMessage;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Track CTA interactions in analytics
 * @param action - Action type (e.g., 'booking_click', 'phone_click')
 * @param label - Optional label for more context
 * @param value - Optional numeric value
 */
export function trackCTA(action: string, label?: string, value?: number) {
  if (!ctaConfig.tracking.enabled) return;

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: 'CTA',
      event_label: label || ctaConfig.mode,
      value: value,
    });
  }

  // Google Tag Manager
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'cta_interaction',
      cta_action: action,
      cta_mode: ctaConfig.mode,
      cta_label: label,
      cta_value: value,
    });
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('CTA Tracked:', { action, label, value, mode: ctaConfig.mode });
  }
}

/**
 * Get CTA button text based on current mode
 * @param context - Context where button appears (e.g., 'hero', 'room_card')
 * @returns Appropriate button text
 */
export function getCTAButtonText(context: string = 'default'): string {
  const config = ctaConfig;

  const texts: Record<CTAMode, Record<string, string>> = {
    whatsapp: {
      default: 'Book via WhatsApp',
      hero: 'Chat on WhatsApp',
      room_card: 'Book Now',
      header: 'Book Now',
    },
    booking: {
      default: 'Book Now',
      hero: 'Reserve Your Room',
      room_card: 'Check Availability',
      header: 'Book Online',
    },
    contact: {
      default: 'Contact Us',
      hero: 'Get in Touch',
      room_card: 'Inquire Now',
      header: 'Contact',
    },
  };

  return texts[config.mode][context] || texts[config.mode].default;
}

/**
 * Check if external link (opens in new tab)
 * @param url - URL to check
 * @returns true if external
 */
export function isExternalLink(url: string): boolean {
  return url.startsWith('http') || url.startsWith('https://wa.me');
}
