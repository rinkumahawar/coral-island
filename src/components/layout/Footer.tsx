import React from 'react';
import Link from 'next/link';
import Button from '../base/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Coral Island Pattaya</h3>
            <p className="text-blue-200 mb-4">
              Experience the beauty of Thailand's most stunning island destination with our premium tour packages.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200 transition cursor-pointer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition cursor-pointer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition cursor-pointer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition cursor-pointer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-blue-200">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span>123 Beach Road, Pattaya, Chonburi 20150, Thailand</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3"></i>
                <span>+66 38 123 4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3"></i>
                <span>info@coralislandtour.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200">
              <li><Link href="/" className="hover:text-white transition cursor-pointer">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition cursor-pointer">About Us</Link></li>
              <li><Link href="/tours" className="hover:text-white transition cursor-pointer">Tour Packages</Link></li>
              <li><Link href="/activities" className="hover:text-white transition cursor-pointer">Activities</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition cursor-pointer">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-white transition cursor-pointer">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter & Payment */}
          <div>
            <h3 className="text-lg font-semibold mb-4">We Accept</h3>
            <div className="flex flex-wrap gap-3">
              <i className="fab fa-cc-visa text-2xl"></i>
              <i className="fab fa-cc-mastercard text-2xl"></i>
              <i className="fab fa-cc-amex text-2xl"></i>
              <i className="fab fa-cc-paypal text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold mt-6 mb-4">Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full text-gray-800 rounded-l-lg focus:outline-none border-none"
              />
              <Button
                variant="secondary"
                className="!rounded-l-none !bg-yellow-500 !hover:bg-yellow-400 !text-blue-900"
              >
                <i className="fas fa-paper-plane"></i>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-800 mt-10 pt-6 text-center text-blue-300">
          <p>© {new Date().getFullYear()} Coral Island Pattaya Tours. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-white transition cursor-pointer">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition cursor-pointer">Privacy Policy</Link>
            <Link href="/refund" className="hover:text-white transition cursor-pointer">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 