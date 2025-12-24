// components/cta/quick-contact.tsx
'use client';

import { ctaConfig, trackCTA } from '@/lib/cta-config';
import { Phone } from 'lucide-react';

interface QuickContactProps {
  className?: string;
}

export default function QuickContact({ className = '' }: QuickContactProps) {
  const handleClick = () => {
    trackCTA('phone_click', 'quick_contact');
  };

  return (
    <a
      href={`tel:${ctaConfig.contact.phone}`}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <Phone className="w-4 h-4" />
      <span>{ctaConfig.contact.phone}</span>
    </a>
  );
}
