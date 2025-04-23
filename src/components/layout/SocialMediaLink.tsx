import React from 'react';

interface SocialMediaLinkProps {
  platform: string;
  href: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ platform, href }) => {
  const getIconClass = () => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'fab fa-facebook-f';
      case 'instagram':
        return 'fab fa-instagram';
      case 'twitter':
        return 'fab fa-twitter';
      case 'youtube':
        return 'fab fa-youtube';
      default:
        return 'fab fa-link';
    }
  };

  return (
    <a 
      href={href} 
      className="text-white hover:text-blue-200 transition cursor-pointer"
      aria-label={`Visit our ${platform} page`}
    >
      <i className={getIconClass()}></i>
    </a>
  );
};

export default SocialMediaLink; 