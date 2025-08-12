'use client';

import React from 'react';
import TestimonialCard from '../cards/TestimonialCard';

interface Testimonial {
  name: string;
  country: string;
  rating: number;
  text: string;
  package: string;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentTestimonial: number;
  nextTestimonial: () => void;
  prevTestimonial: () => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  currentTestimonial,
  nextTestimonial,
  prevTestimonial
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied customers about their experiences with our tours and packages.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 