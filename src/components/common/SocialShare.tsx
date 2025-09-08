'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faPinterest, 
  faWhatsapp,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
}

export default function SocialShare({ 
  url, 
  title, 
  description, 
  image,
  className = '' 
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use current page URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || document.title;
  const shareDescription = description || '';
  const shareImage = image || '';

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: faFacebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: faTwitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'Pinterest',
      icon: faPinterest,
      color: 'bg-red-600 hover:bg-red-700',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(shareImage)}&description=${encodeURIComponent(shareDescription)}`
    },
    {
      name: 'WhatsApp',
      icon: faWhatsapp,
      color: 'bg-green-600 hover:bg-green-700',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`
    },
    {
      name: 'LinkedIn',
      icon: faLinkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
  ];

  const handleShare = (platformUrl: string) => {
    window.open(platformUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        aria-label="Share"
      >
        <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
        <span>Share</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[200px]">
            <div className="p-2">
              <div className="grid grid-cols-2 gap-2">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleShare(platform.url)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white transition-colors ${platform.color}`}
                  >
                    <FontAwesomeIcon icon={platform.icon} className="w-4 h-4" />
                    <span className="text-sm">{platform.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Native share button for mobile */}
              {navigator.share && (
                <button
                  onClick={handleNativeShare}
                  className="w-full mt-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  More sharing options...
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

