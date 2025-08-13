'use client';

import React from 'react';
import Card from '../base/Card';

interface EventGalleryProps {
  gallery: any[];
}

const EventGallery: React.FC<EventGalleryProps> = ({ gallery }) => (
  <Card title="Event Gallery" className="mb-8" id="gallery">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {gallery.length > 0 ? gallery.map((img, idx) => (
        <div key={idx} className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img 
            src={img.url} 
            alt={img.alt || "Event Gallery"} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
          />
        </div>
      )) : (
        <div className="col-span-full text-center py-8 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No images available</p>
        </div>
      )}
    </div>
  </Card>
);

export default EventGallery; 