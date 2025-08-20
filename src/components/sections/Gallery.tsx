'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Card from '../base/Card';
import Image from 'next/image';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface GalleryItem {
  url: string;
  alt?: string;
}

interface GalleryProps {
  images?: GalleryItem[]; // preferred prop name
  gallery?: GalleryItem[]; // backward compat with EventGallery
}

const Gallery: React.FC<GalleryProps> = ({ images, gallery }) => {
  const items = useMemo(() => (images && images.length ? images : (gallery || [])), [images, gallery]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + items.length - 1) % items.length);
  };

  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  if (!items || items.length === 0) {
    return (
      <Card title="Event Gallery" className="mb-8" id="gallery">
        <div className="col-span-full text-center py-8 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No images available</p>
        </div>
      </Card>
    );
  }

  const primary = items[0];
  const topRight = items[1];
  const bottomLeft = items[2];
  const bottomRight = items[3];

  return (
    <Card title="Event Gallery" className="mb-8" id="gallery">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        {/* Left - Primary image spans 2 columns/rows on md+ */}
        <div className="relative md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-full overflow-hidden rounded-md md:rounded-lg shadow sm:shadow-md cursor-pointer" onClick={() => openLightbox(0)}>
          {primary && (
            <Image
              src={primary.url}
              alt={primary.alt || 'Event image'}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority
            />
          )}
        </div>

        {/* Top-right wide image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-md md:rounded-lg shadow sm:shadow-md cursor-pointer" onClick={() => openLightbox(1)}>
          {topRight && (
            <Image
              src={topRight.url}
              alt={topRight.alt || 'Event image'}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-300" loading="lazy"
            />
          )}
        </div>

        {/* Bottom-right two squares */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="relative aspect-square overflow-hidden rounded-md md:rounded-lg shadow sm:shadow-md cursor-pointer" onClick={() => openLightbox(2)}>
            {bottomLeft && (
              <Image
                src={bottomLeft.url}
                alt={bottomLeft.alt || 'Event image'}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
          <div className="relative aspect-square overflow-hidden rounded-md md:rounded-lg shadow sm:shadow-md cursor-pointer" onClick={() => openLightbox(3)}>
            {bottomRight && (
              <Image
                src={bottomRight.url}
                alt={bottomRight.alt || 'Event image'}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            )}
            {/* View All overlay */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); openLightbox(items.length > 4 ? 4 : 0); }}
              className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-md md:rounded-lg bg-white/90 backdrop-blur px-3 py-1.5 text-xs md:text-sm font-medium text-gray-700 shadow hover:bg-white"
            >
              <PhotoIcon className="h-4 w-4 md:h-5 md:w-5" />
              View All
            </button>
          </div>
        </div>
      </div>


      {/* Lightbox Viewer */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Prev/Next */}
            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <span className="sr-only">Previous</span>
              {/* using simple chevron via CSS */}
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 15.707a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" transform="scale(-1,1) translate(-20,0)"/></svg>
            </button>
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 15.707a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            </button>

            {/* Image */}
            <div className="flex items-center justify-center">
              <img
                src={items[lightboxIndex].url}
                alt={items[lightboxIndex].alt || 'Zoomed image'}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Gallery; 