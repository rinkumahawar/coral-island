'use client';

import React, { useState } from 'react';
import Button from '../base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
}

interface GallerySectionProps {
  title?: string;
  description?: string;
  images?: GalleryImage[];
}

const GallerySection: React.FC<GallerySectionProps> = ({
  title = 'Coral Island Gallery',
  description = 'Explore the beauty and excitement of Coral Island through our stunning photo collection',
  images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Beautiful sunset at Coral Island beach',
      category: 'beach',
      title: 'Sunset Paradise',
      description: 'Golden hour at our pristine beaches'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Exciting water activities',
      category: 'activities',
      title: 'Water Adventures',
      description: 'Jet skiing and parasailing excitement'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Aerial view of Coral Island',
      category: 'scenery',
      title: 'Island Majesty',
      description: 'Breathtaking aerial perspective'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Snorkeling in crystal clear waters',
      category: 'activities',
      title: 'Underwater World',
      description: 'Discover marine life up close'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Relaxing beach lounges',
      category: 'beach',
      title: 'Beach Relaxation',
      description: 'Comfortable beach lounging areas'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Glass bottom boat tour',
      category: 'activities',
      title: 'Boat Tours',
      description: 'Explore the island by boat'
    }
  ]
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(images.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => openLightbox(image)}
            >
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodeURIComponent(image.title)}`;
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FontAwesomeIcon icon={faSearch} className="text-white text-sm" />
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=${encodeURIComponent(selectedImage.title)}`;
              }}
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-white/90">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection; 