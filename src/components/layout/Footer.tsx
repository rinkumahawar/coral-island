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
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">{process.env.NEXT_PUBLIC_PAGE_NAME}</h3>
            <p className="text-blue-200 mb-3 md:mb-4 text-sm md:text-base">
              {process.env.NEXT_PUBLIC_PAGE_DESCRIPTION}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Contact Us</h3>
            <ul className="space-y-2 md:space-y-3 text-blue-200 text-sm md:text-base">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-2 md:mr-3 text-xs md:text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">{process.env.NEXT_PUBLIC_COMPANY_ADDRESS}</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 md:mr-3 text-xs md:text-sm flex-shrink-0" />
                <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="text-xs md:text-sm hover:text-white transition cursor-pointer">{process.env.NEXT_PUBLIC_COMPANY_PHONE}</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 md:mr-3 text-xs md:text-sm flex-shrink-0" />
                <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="text-xs md:text-sm hover:text-white transition cursor-pointer">{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</a>
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
              <li><Link href="/#gallery" className="hover:text-white transition cursor-pointer">Gallery</Link></li>
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
          <p className="text-xs md:text-sm">{process.env.NEXT_PUBLIC_COPYRIGHT_TEXT}</p>
          <div className="mt-3 md:mt-4 text-xs md:text-sm">
            <span>Powered by <b>TNG Holidays</b></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 