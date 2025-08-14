import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

const HomeHeader: React.FC = () => {
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
            <Link href="#about" className="hover:text-blue-200 transition">
              About Us
            </Link>
            <Link href="#contact" className="hover:text-blue-200 transition">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
