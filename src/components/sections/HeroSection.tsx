import React from 'react';
import Button from '../base/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
      <div
        className="h-[600px] bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/banner.jpg)' }}
      ></div>
      <div className="container mx-auto px-6 absolute inset-0 flex items-center z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-4">Experience Paradise at Coral Island Pattaya</h1>
          <p className="text-xl mb-8">Discover crystal clear waters, pristine beaches, and thrilling water activities just 45 minutes from Pattaya.</p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="yellow"
              size="md"
            >
              Book Your Tour
            </Button>
            <Button
              variant="transparent"
              size="md"
            >
              View Tour Packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 