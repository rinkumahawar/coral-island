 import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faPhoneAlt, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Coral Island Pattaya</h3>
            <p className="text-blue-200 mb-3 md:mb-4 text-sm md:text-base">
              Experience the beauty of Thailand's most stunning island destination with our premium tour packages.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Contact Us</h3>
            <ul className="space-y-2 md:space-y-3 text-blue-200 text-sm md:text-base">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-2 md:mr-3 text-xs md:text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">77/7, Bang Lamung District, Chon Buri, Thailand</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 md:mr-3 text-xs md:text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">+66 90 245 1584</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 md:mr-3 text-xs md:text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">info@coralisland-pattaya.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Quick Links</h3>
            <ul className="flex flex-wrap gap-2 md:block md:space-y-1 md:space-y-2 text-blue-200 text-sm md:text-base">
              <li><Link href="/" className="hover:text-white transition cursor-pointer">Home</Link></li>
              <li><Link href="/tickets" className="hover:text-white transition cursor-pointer">Event Tickets</Link></li>
              <li><Link href="/#about" className="hover:text-white transition cursor-pointer">About Us</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition cursor-pointer">Gallery</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">We Accept</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <FontAwesomeIcon icon={faCcVisa} className="text-lg md:text-xl" />
              <FontAwesomeIcon icon={faCcMastercard} className="text-lg md:text-xl" />
              <FontAwesomeIcon icon={faCcAmex} className="text-lg md:text-xl" />
              <FontAwesomeIcon icon={faCcPaypal} className="text-lg md:text-xl" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-800 mt-6 md:mt-10 pt-4 md:pt-6 text-center text-blue-300">
          <p className="text-xs md:text-sm">© 2025 Coral Island Pattaya. All rights reserved.</p>
          <div className="mt-2 space-x-2 md:space-x-4 text-xs md:text-sm">
            <Link href="/terms" className="hover:text-white transition cursor-pointer">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition cursor-pointer">Privacy Policy</Link>
            <Link href="/refund" className="hover:text-white transition cursor-pointer">Refund Policy</Link>
          </div>
          <div className="mt-3 md:mt-4 text-xs md:text-sm">
            <span>Powered by </span>
            <a href="https://tngholidays.com" target="_blank" className="text-white hover:text-blue-200 transition cursor-pointer">TNG Holidays</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 