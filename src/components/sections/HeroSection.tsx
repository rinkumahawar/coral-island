import React from 'react';
import { EventData } from '@/lib/api/services/event';


const HeroSection: React.FC<EventData> = (event) => {
  
  const image = event.banner_image.file_path;
  const { title } = event;
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
      <div
        className="h-[300px] md:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="container mx-auto px-4 md:px-6 absolute inset-0 flex items-center z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 