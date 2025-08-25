'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const MobileMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAttractionsOpen, setIsAttractionsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAttractions = () => {
    setIsAttractionsOpen(!isAttractionsOpen);
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
              
              {/* Attractions Section */}
              <div className="border-b border-blue-800 pb-3">
                <button
                  onClick={toggleAttractions}
                  className="w-full text-left hover:text-blue-200 transition py-3 text-lg font-medium flex justify-between items-center"
                >
                  Attractions
                  <svg 
                    className={`w-5 h-5 transition-transform ${isAttractionsOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isAttractionsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link 
                      href="/attractions/water-park" 
                      className="block hover:text-blue-200 transition py-2 text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Water Park
                    </Link>
                    <Link 
                      href="/attractions/adventure-zone" 
                      className="block hover:text-blue-200 transition py-2 text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Adventure Zone
                    </Link>
                    <Link 
                      href="/attractions/wildlife" 
                      className="block hover:text-blue-200 transition py-2 text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Wildlife
                    </Link>
                    <Link 
                      href="/attractions/entertainment" 
                      className="block hover:text-blue-200 transition py-2 text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Entertainment
                    </Link>
                  </div>
                )}
              </div>
              
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