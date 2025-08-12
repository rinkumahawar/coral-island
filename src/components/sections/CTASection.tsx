'use client';

import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Experience Paradise?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Book your Coral Island Event today and create unforgettable memories in one of Thailand's most beautiful destinations.
        </p>
        <a
          href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
          data-readdy="true"
          className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-button transition duration-300 text-lg whitespace-nowrap cursor-pointer"
        >
          Book Your Event Now
        </a>
      </div>
    </section>
  );
};

export default CTASection; 