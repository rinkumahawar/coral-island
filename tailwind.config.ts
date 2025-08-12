import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './styles/**/*.css', // ✅ If your globals.css is inside styles/
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
        'sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
      borderRadius: {
        'button': '0.5rem',
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#eab308',
          light: '#facc15',
          dark: '#ca8a04',
        },
        success: {
          DEFAULT: '#22c55e',
          light: '#86efac',
          dark: '#15803d',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#fca5a5',
          dark: '#b91c1c',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fcd34d',
          dark: '#b45309',
        },
        info: {
          DEFAULT: '#3b82f6',
          light: '#93c5fd',
          dark: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
};

export default config;
