import React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <a 
        href={href} 
        className="hover:text-white transition cursor-pointer"
      >
        {children}
      </a>
    </li>
  );
};

export default FooterLink; 