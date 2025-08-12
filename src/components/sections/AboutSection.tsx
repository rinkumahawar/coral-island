'use client';

import React from 'react';
import '../../styles/html-content.css';

interface AboutSectionProps {
  content: string;
  images: any[];
}   

const AboutSection: React.FC<AboutSectionProps> = ({ content, images }) => {
  return (
    <section id="about" className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About Coral Island Pattaya</h2>
            <div className="prose max-w-none text-gray-700 html-content" dangerouslySetInnerHTML={{ __html: content }} />

          </div>
          <div className="grid grid-cols-2 gap-4">
            {images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image.url}
                className="rounded-lg shadow-md h-full object-cover object-top"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 