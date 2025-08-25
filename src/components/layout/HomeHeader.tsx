"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';
import CurrencySwitcher from '../common/CurrencySwitcher';

const HomeHeader: React.FC = () => {
  const [isAttractionsOpen, setIsAttractionsOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white relative">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {process.env.NEXT_PUBLIC_LOGO_PATH && (
              <Link href="/">
                <div className="relative w-50 h-13">
                  <Image
                    src={process.env.NEXT_PUBLIC_LOGO_PATH}
                    alt="Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/tickets" className="hover:text-blue-200 transition">
              Tickets
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setIsAttractionsOpen(true)}
              onMouseLeave={() => setIsAttractionsOpen(false)}
            >
              <button className="hover:text-blue-200 transition flex items-center">
                Attractions
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isAttractionsOpen && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
                  <Link href="/attractions/water-park" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition">
                    Water Park
                  </Link>
                  <Link href="/attractions/adventure-zone" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition">
                    Adventure Zone
                  </Link>
                  <Link href="/attractions/wildlife" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition">
                    Wildlife
                  </Link>
                  <Link href="/attractions/entertainment" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition">
                    Entertainment
                  </Link>
                </div>
              )}
            </div>
            <Link href="#about" className="hover:text-blue-200 transition">
              About Us
            </Link>
            <Link href="#contact" className="hover:text-blue-200 transition">
              Contact Us
            </Link>
          </div>

          {/* Currency Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <CurrencySwitcher
              variant="minimal"
              size="sm"
              showFlag={true}
              showName={false}
              showSearch={true}
              className="text-white"
            />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
