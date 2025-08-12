'use client'

import React from 'react';
import { BookingProvider } from '@/contexts/BookingContext';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <BookingProvider>
      {children}
    </BookingProvider>
  );
} 