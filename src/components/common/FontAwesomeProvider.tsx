'use client';

import { config } from '@fortawesome/fontawesome-svg-core';

// Prevent FontAwesome from adding its CSS since we did it manually in globals.css
config.autoAddCss = false;

interface FontAwesomeProviderProps {
  children: React.ReactNode;
}

export default function FontAwesomeProvider({ children }: FontAwesomeProviderProps) {
  return <>{children}</>;
} 