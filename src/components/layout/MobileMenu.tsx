'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const MobileMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 hover:bg-blue-800 rounded transition"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-blue-900 border-t border-blue-800 shadow-lg z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="hover:text-blue-200 transition py-3 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/tickets" 
                className="hover:text-blue-200 transition py-3 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tickets
              </Link>
              <Link 
                href="#about" 
                className="hover:text-blue-200 transition py-3 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="#contact" 
                className="hover:text-blue-200 transition py-3 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu; 