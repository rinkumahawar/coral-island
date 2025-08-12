'use client';

import React from 'react';
import Card from '../base/Card';

interface EventCustomerReviewsProps {
  reviews: any[];
}

const EventCustomerReviews: React.FC<EventCustomerReviewsProps> = ({ reviews }) => {
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [currentGallery, setCurrentGallery] = React.useState<any[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderAvatar = (review: any) => {
    const name = review.title || review.customer_name || review.name || 'Anonymous';
    
    return (
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden relative">
        {review.image ? (
          <img 
            src={review.image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : null}
        <span className={`text-blue-600 font-semibold text-sm absolute inset-0 flex items-center justify-center ${review.image ? 'opacity-0' : ''}`}>
          {name.split(' ').map((n: string) => n[0]).join('')}
        </span>
      </div>
    );
  };

  const openLightbox = (image: any, gallery: any[], imageIndex: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(imageIndex);
    setCurrentGallery(gallery);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setCurrentGallery([]);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % currentGallery.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(currentGallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? currentGallery.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(currentGallery[prevIndex]);
  };

  return (
    <Card title="Customer Reviews" className="mb-8">
      <div className="space-y-6 max-h-200 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => {
            // Handle new API response structure
            const isNewApiFormat = review.title && review.content && review.rate_number !== undefined;
            
            if (isNewApiFormat) {
              // Handle new API response structure
              return (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {renderAvatar(review)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{review.title}</h4>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          {review.created_at && (
                            <span>{formatDate(review.created_at)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < review.rate_number ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-700 leading-relaxed">{review.content}</p>
                  </div>
                  
                  {/* Review Gallery */}
                  {(review.gallery && review.gallery.length > 0) || (review.review_images && review.review_images.length > 0) ? (
                    <div className="mt-4">
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {(review.gallery || review.review_images || []).map((image: any, imgIndex: number) => (
                          <div key={imgIndex} className="flex-shrink-0">
                            <img 
                              src={image} 
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                              onClick={() => openLightbox(image, review.review_images, imgIndex)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            } else {
              // Handle legacy structures for backward compatibility
              const isTestimonial = review.name && review.text;
              const isDummyReview = review.customer_name && review.comment;
              
              if (isTestimonial) {
                // Handle testimonials structure
                return (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {renderAvatar(review)}
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{review.country}</span>
                            {review.package && (
                              <>
                                <span>•</span>
                                <span>{review.package}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-gray-700 leading-relaxed italic">"{review.text}"</p>
                    </div>
                    
                    {/* Review Gallery */}
                    {(review.gallery && review.gallery.length > 0) || (review.review_images && review.review_images.length > 0) ? (
                      <div className="mt-4">
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                          {(review.gallery || review.review_images || []).map((image: any, imgIndex: number) => (
                            <div key={imgIndex} className="flex-shrink-0">
                              <img 
                                src={image.url || image} 
                                alt={image.alt || `Review image ${imgIndex + 1}`}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                                onClick={() => openLightbox(image, review.gallery || review.review_images, imgIndex)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              } else if (isDummyReview) {
                // Handle dummy reviews structure
                return (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {renderAvatar(review)}
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{review.customer_name}</h4>
                            {review.verified && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{review.customer_country}</span>
                            <span>•</span>
                            <span>{formatDate(review.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                    
                    {review.featured && (
                      <div className="flex justify-end">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Featured
                        </span>
                      </div>
                    )}
                    
                    {/* Review Gallery */}
                    {(review.gallery && review.gallery.length > 0) || (review.review_images && review.review_images.length > 0) ? (
                      <div className="mt-4">
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                          {(review.gallery || review.review_images || []).map((image: any, imgIndex: number) => (
                            <div key={imgIndex} className="flex-shrink-0">
                              <img 
                                src={image.url || image} 
                                alt={image.alt || `Review image ${imgIndex + 1}`}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                                onClick={() => openLightbox(image, review.gallery || review.review_images, imgIndex)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }
            }
            return null;
          })
        ) : (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>No reviews available yet</p>
          </div>
        )}
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage.url || selectedImage}
              alt={selectedImage.alt || 'Review image'}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
              <p className="text-white/90 text-sm">{selectedImage.alt || 'Review image'}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EventCustomerReviews; 