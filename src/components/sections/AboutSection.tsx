'use client';

import React from 'react';
import '../../styles/html-content.css';
import Image from 'next/image';

interface AboutSectionProps {
  content: string;
  images: any[];
}   

const AboutSection: React.FC<AboutSectionProps> = ({ content, images }) => {
  return (
    <section id="about" className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About Coral Island Pattaya</h2>
            <div className="prose max-w-none text-gray-700 html-content" dangerouslySetInnerHTML={{ __html: content }} />

          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden relative">
                <Image
                  src={image.url}
                  alt={`Coral Island ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="rounded-lg shadow-md object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 