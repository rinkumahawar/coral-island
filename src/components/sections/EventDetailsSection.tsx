'use client';

import React from 'react';
import Card from '../base/Card';
import BookingButton from '../common/BookingButton';

interface EventDetailsSectionProps {
  event?: any;
}

// Dummy data for event
const dummyEvent = {
  title: "Coral Island Adventure Event",
  subtitle: "Discover the hidden treasures of Thailand's most beautiful island",
  content: `
    <p class="text-lg leading-relaxed mb-6">
      Embark on an unforgettable journey to Coral Island, where crystal-clear waters meet pristine white sand beaches. 
      This comprehensive event package includes transportation, professional guides, and all necessary equipment for 
      an amazing day of exploration and adventure.
    </p>
    <p class="text-lg leading-relaxed">
      Perfect for families, couples, and adventure seekers alike, our Coral Island Adventure Event offers the perfect 
      blend of relaxation and excitement. Experience the beauty of nature while creating memories that will last a lifetime.
    </p>
  `,
  highlight_content: `
    <ul class="space-y-3">
      <li class="flex items-start">
        <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 mt-0.5">✓</span>
        <span>Round-trip speedboat transfer from Pattaya</span>
      </li>
      <li class="flex items-start">
        <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 mt-0.5">✓</span>
        <span>Professional English-speaking event guide</span>
      </li>
      <li class="flex items-start">
        <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 mt-0.5">✓</span>
        <span>Snorkeling equipment and safety gear</span>
      </li>
      <li class="flex items-start">
        <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 mt-0.5">✓</span>
        <span>Delicious Thai buffet lunch</span>
      </li>
      <li class="flex items-start">
        <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 mt-0.5">✓</span>
        <span>Beach activities and water sports</span>
      </li>
    </ul>
  `,
  address: "Coral Island (Koh Larn), Chonburi Province, Thailand",
  duration: "8 hours",
  group_size: "Maximum 20 people",
  difficulty: "Easy - Suitable for all ages",
  price: "฿2,500",
  gallery_images: [
    { url: "/images/beach1.jpg", alt: "Crystal clear waters" },
    { url: "/images/beach2.jpg", alt: "White sand beaches" },
    { url: "/images/beach3.jpg", alt: "Snorkeling adventure" },
    { url: "/images/beach4.jpg", alt: "Island paradise" },
    { url: "/images/activity/snorkeling.jpg", alt: "Underwater exploration" },
    { url: "/images/activity/glass-bottom-boat.jpg", alt: "Glass bottom boat event" }
  ],
  faqs: [
    {
      title: "What should I bring?",
      content: "Swimwear, towel, sunscreen, hat, sunglasses, and a change of clothes. We provide all snorkeling equipment."
    },
    {
      title: "Is lunch included?",
      content: "Yes, a delicious Thai buffet lunch is included in the event price. We also provide drinking water throughout the day."
    },
    {
      title: "What is the cancellation policy?",
      content: "Free cancellation up to 24 hours before the event. Weather-related cancellations are fully refundable."
    },
    {
      title: "Are there age restrictions?",
      content: "Children under 3 years old are free. Children 3-12 years old receive a 50% discount. All ages are welcome!"
    }
  ],
  extra_content: {
    schedule: {
      title: "Event Schedule",
      content: `
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="w-16 text-sm font-medium text-blue-600">08:00</div>
            <div class="flex-1">Hotel pickup from Pattaya</div>
          </div>
          <div class="flex items-center">
            <div class="w-16 text-sm font-medium text-blue-600">08:30</div>
            <div class="flex-1">Speedboat departure to Coral Island</div>
          </div>
          <div class="flex items-center">
            <div class="w-16 text-sm font-medium text-blue-600">09:00</div>
            <div class="flex-1">Arrive at Coral Island, welcome briefing</div>
          </div>
          <div class="flex items-center">
            <div class="w-16 text-sm font-medium text-blue-600">09:30</div>
            <div class="flex-1">Snorkeling session and water activities</div>
          </div>
          <div class="flex items-center">
            <div class="w-16 text-sm font-medium text-blue-600">12:00</div>
            <div class="flex-1">Thai buffet lunch</div>
          </div>
          <div class="flex items-center">
            <div class="w-16 text-sm font-medium text-blue-600">13:30</div>
            <div class="flex-1">Free time for beach activities</div>
          </div>
          <div class="flex items-center">
            <div class="w-16 text-sm font-medium text-blue-600">15:30</div>
            <div class="flex-1">Return speedboat to Pattaya</div>
          </div>
          <div class="flex items-center">
            <div class="w-16 text-sm font-medium text-blue-600">16:00</div>
            <div class="flex-1">Hotel drop-off</div>
          </div>
        </div>
      `
    },
    included: {
      title: "What's Included",
      content: `
        <ul class="space-y-2">
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Round-trip speedboat transfer
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Professional English-speaking guide
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Snorkeling equipment and safety gear
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Thai buffet lunch
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Drinking water throughout the day
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Beach activities and water sports
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Insurance coverage
          </li>
        </ul>
      `
    }
  },
  review_stats: {
    score_total: "4.8",
    total_review: 1247,
    review_text: "Excellent event experience",
    rating_breakdown: {
      "5": 892,
      "4": 245,
      "3": 78,
      "2": 22,
      "1": 10
    },
    recent_reviews: [
      {
        id: 1,
        customer_name: "Sarah Johnson",
        customer_country: "United States",
        customer_image: "https://picsum.photos/100/100?random=101",
        rating: 5,
        date: "2024-01-15",
        title: "Absolutely Amazing Experience!",
        comment: "This was the highlight of our Thailand trip! The snorkeling was incredible, the guides were professional and friendly, and the lunch was delicious. The crystal clear waters and colorful fish made it unforgettable. Highly recommend!",
        verified: true,
        helpful_votes: 12,
        gallery: [
          { url: "https://picsum.photos/200/200?random=1", alt: "Snorkeling with colorful fish" },
          { url: "https://picsum.photos/200/200?random=2", alt: "Beautiful beach view" },
          { url: "https://picsum.photos/200/200?random=3", alt: "Delicious Thai lunch" }
        ]
      },
      {
        id: 2,
        customer_name: "Michael Chen",
        customer_country: "Australia",
        customer_image: "https://picsum.photos/100/100?random=102",
        rating: 5,
        date: "2024-01-12",
        title: "Perfect Day Trip from Pattaya",
        comment: "Great value for money! The speedboat ride was smooth, the beach was pristine, and the activities were well-organized. Our guide Tom was knowledgeable and made sure everyone had a great time. Will definitely book again!",
        verified: true,
        helpful_votes: 8,
        gallery: [
          { url: "https://picsum.photos/200/200?random=4", alt: "Speedboat ride to island" },
          { url: "https://picsum.photos/200/200?random=5", alt: "Beach activities" }
        ]
      },
      {
        id: 3,
        customer_name: "Emma Rodriguez",
        customer_country: "Spain",
        customer_image: "https://picsum.photos/100/100?random=103",
        rating: 4,
        date: "2024-01-10",
        title: "Beautiful Island, Great Service",
        comment: "The island is absolutely stunning with white sand beaches and turquoise water. The staff was very helpful and the equipment was in good condition. Only giving 4 stars because the lunch could have been a bit more variety, but overall excellent experience.",
        verified: true,
        helpful_votes: 5
      },
      {
        id: 4,
        customer_name: "David Kim",
        customer_country: "South Korea",
        customer_image: "https://picsum.photos/100/100?random=104",
        rating: 5,
        date: "2024-01-08",
        title: "Family-Friendly Adventure",
        comment: "Perfect for our family with kids aged 8 and 12. The guides were patient with the children and made sure they felt safe during snorkeling. The beach activities were fun for all ages. Highly recommend for families!",
        verified: true,
        helpful_votes: 15,
        gallery: [
          { url: "https://picsum.photos/200/200?random=6", alt: "Family enjoying the beach" },
          { url: "https://picsum.photos/200/200?random=7", alt: "Kids snorkeling safely" },
          { url: "https://picsum.photos/200/200?random=8", alt: "Family lunch time" },
          { url: "https://picsum.photos/200/200?random=9", alt: "Beach games for kids" }
        ]
      },
      {
        id: 5,
        customer_name: "Lisa Thompson",
        customer_country: "Canada",
        customer_image: "https://picsum.photos/100/100?random=105",
        rating: 4,
        date: "2024-01-05",
        title: "Well-Organized Tour",
        comment: "Everything was well-planned and executed smoothly. The pickup was on time, the boat ride was comfortable, and the island was beautiful. The only minor issue was that the snorkeling area was a bit crowded, but that's expected during peak season.",
        verified: true,
        helpful_votes: 3
      },
      {
        id: 6,
        customer_name: "James Wilson",
        customer_country: "United Kingdom",
        customer_image: "https://picsum.photos/100/100?random=106",
        rating: 5,
        date: "2024-01-03",
        title: "Exceeded All Expectations",
        comment: "This tour exceeded all our expectations! The coral reefs were vibrant, the fish were abundant, and the guides were incredibly knowledgeable about marine life. The lunch was authentic Thai food and very tasty. Worth every penny!",
        verified: true,
        helpful_votes: 9
      },
      {
        id: 7,
        customer_name: "Maria Garcia",
        customer_country: "Mexico",
        customer_image: "https://picsum.photos/100/100?random=107",
        rating: 5,
        date: "2024-01-01",
        title: "Unforgettable Experience",
        comment: "What an amazing day! The water was crystal clear, perfect for snorkeling. We saw so many colorful fish and even some sea turtles! The staff was professional and the whole experience was seamless from start to finish.",
        verified: true,
        helpful_votes: 11
      },
      {
        id: 8,
        customer_name: "Alex Johnson",
        customer_country: "Germany",
        customer_image: "https://picsum.photos/100/100?random=108",
        rating: 4,
        date: "2023-12-30",
        title: "Great Value for Money",
        comment: "Good value for the price. The island is beautiful and the activities were fun. The guides were helpful and the equipment was in good condition. Would recommend for anyone visiting Pattaya.",
        verified: true,
        helpful_votes: 4
      }
    ],
    top_reviews: [
      {
        id: 9,
        customer_name: "Sophie Anderson",
        customer_country: "New Zealand",
        customer_image: "https://picsum.photos/100/100?random=109",
        rating: 5,
        date: "2023-12-28",
        title: "Best Day of Our Honeymoon!",
        comment: "We chose this for our honeymoon and it was absolutely perfect! The romantic setting, beautiful beaches, and amazing snorkeling made it unforgettable. The staff even arranged a special table for us at lunch. Highly recommend for couples!",
        verified: true,
        helpful_votes: 23,
        featured: true,
        gallery: [
          { url: "https://picsum.photos/200/200?random=10", alt: "Romantic beach setting" },
          { url: "https://picsum.photos/200/200?random=11", alt: "Special honeymoon table" },
          { url: "https://picsum.photos/200/200?random=12", alt: "Couple snorkeling together" },
          { url: "https://picsum.photos/200/200?random=13", alt: "Beautiful sunset view" }
        ]
      },
      {
        id: 10,
        customer_name: "Robert Taylor",
        customer_country: "Singapore",
        customer_image: "https://picsum.photos/100/100?random=110",
        rating: 5,
        date: "2023-12-25",
        title: "Professional and Safe",
        comment: "As a solo traveler, I felt very safe and well taken care of. The guides were professional and the safety equipment was top-notch. The snorkeling spots were carefully chosen and the marine life was spectacular. Excellent service!",
        verified: true,
        helpful_votes: 18,
        featured: true
      }
    ]
  }
};

// Generate structured data for SEO
const generateStructuredData = (event: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coralislandevents.com';
  
  // Use meta data if available, otherwise fallback to event data
  const title = event.meta_data?.seo_title || event.title;
  const description = event.meta_data?.seo_desc || event.subtitle || event.description;
  const image = event.meta_data?.seo_image || event.gallery_images?.[0]?.url || event.banner_image?.file_path;
  
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": title,
    "description": description,
    "url": baseUrl,
    "image": image,
    "startDate": event.start_time || new Date().toISOString(),
    "endDate": event.end_time || new Date().toISOString(),
    "location": {
      "@type": "Place",
      "name": "Coral Island (Koh Larn)",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pattaya",
        "addressRegion": "Chonburi",
        "addressCountry": "TH"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9236,
        "longitude": 100.8824
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Coral Island Events",
      "url": baseUrl
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": event.review_stats?.score_total || "4.8",
      "reviewCount": event.review_stats?.total_review || 1247,
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": event.price?.replace(/[^\d]/g, '') || "2500",
      "priceCurrency": "THB",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    },
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
  };
};

const EventContent: React.FC<{ content: string }> = ({ content }) => (
  <Card title="Overview" className="mb-8">
    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
  </Card>
);

const EventHighlight: React.FC<{ highlight: string }> = ({ highlight }) => (
  <Card title="Event Highlights" className="mb-8">
    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: highlight }} />
  </Card>
);

const EventInfo: React.FC<{ event: any }> = ({ event }) => (
  <Card title="Event Information" className="mb-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium text-gray-900">{event.duration}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Group Size</p>
            <p className="font-medium text-gray-900">{event.group_size}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Difficulty</p>
            <p className="font-medium text-gray-900">{event.difficulty}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium text-gray-900">{event.address}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-bold text-2xl text-green-600">{event.price}</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const EventFaqs: React.FC<{ faqs: any[] }> = ({ faqs }) => (
  <Card title="Frequently Asked Questions" className="mb-8">
    <div className="space-y-6">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b border-gray-100 pb-6 last:border-b-0">
          <h4 className="font-semibold text-blue-900 mb-3 text-lg">{faq.title}</h4>
          <p className="text-gray-700 leading-relaxed">{faq.content}</p>
        </div>
      ))}
    </div>
  </Card>
);

const EventExtraContent: React.FC<{ extraContent: any }> = ({ extraContent }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    {Object.entries(extraContent).map(([key, item], idx) => (
      <Card key={idx} title={(item as any).title}>
        <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: (item as any).content }} />
        </Card>
      ))}
    </div>
);

const EventGallery: React.FC<{ gallery: any[] }> = ({ gallery }) => (
  <Card title="Event Gallery" className="mb-8">
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

const EventReviewStats: React.FC<{ stats: any }> = ({ stats }) => (
  <Card title="Customer Reviews" className="mb-8">
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="text-4xl font-bold text-blue-700">{stats.score_total}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-5 h-5 ${i < Math.floor(parseFloat(stats.score_total)) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="text-gray-600">
          <p className="font-medium">{stats.total_review.toLocaleString()} reviews</p>
          <p className="text-sm text-gray-500 italic">{stats.review_text}</p>
        </div>
      </div>

      {/* Rating Breakdown */}
      {stats.rating_breakdown && (
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">Rating Breakdown</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.rating_breakdown[rating] || 0;
              const percentage = stats.total_review > 0 ? (count / stats.total_review) * 100 : 0;
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm text-gray-600">{rating}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-gray-600 text-right">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </Card>
);

const EventCustomerReviews: React.FC<{ reviews: any[] }> = ({ reviews }) => {
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

  const renderAvatar = (review: any, isTestimonial: boolean) => {
    const name = isTestimonial ? review.name : review.customer_name;
    const image = isTestimonial ? review.image : review.customer_image;
    
    return (
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden relative">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : null}
        <span className={`text-blue-600 font-semibold text-sm absolute inset-0 flex items-center justify-center ${image ? 'opacity-0' : ''}`}>
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
      <div className="space-y-6">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => {
            // Handle both testimonials and dummy reviews structure
            const isTestimonial = review.name && review.text;
            const isDummyReview = review.customer_name && review.comment;
            
            if (isTestimonial) {
              // Handle testimonials structure
              return (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                  {renderAvatar(review, true)}
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
                  {review.gallery && review.gallery.length > 0 && (
                    <div className="mt-4">
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {review.gallery.map((image: any, imgIndex: number) => (
                          <div key={imgIndex} className="flex-shrink-0">
                            <img 
                              src={image.url || image} 
                              alt={image.alt || `Review image ${imgIndex + 1}`}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                              onClick={() => openLightbox(image, review.gallery, imgIndex)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            } else if (isDummyReview) {
              // Handle dummy reviews structure
              return (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                  {renderAvatar(review, false)}
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
                  {review.gallery && review.gallery.length > 0 && (
                    <div className="mt-4">
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {review.gallery.map((image: any, imgIndex: number) => (
                          <div key={imgIndex} className="flex-shrink-0">
                            <img 
                              src={image.url || image} 
                              alt={image.alt || `Review image ${imgIndex + 1}`}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                              onClick={() => openLightbox(image, review.gallery, imgIndex)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
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

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ event = dummyEvent }) => {
  if (!event) return null;
  
  // Generate structured data for SEO
  const structuredData = generateStructuredData(event);
  
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-blue-900">{event.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{event.subtitle}</p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <EventInfo event={event} />
              <EventContent content={event.content} />
              {event.highlight_content && <EventHighlight highlight={event.highlight_content} />}
              {event.gallery_images && event.gallery_images.length > 0 && <EventGallery gallery={event.gallery_images} />}
              {event.extra_content && <EventExtraContent extraContent={event.extra_content} />}
              {event.faqs && event.faqs.length > 0 && <EventFaqs faqs={event.faqs} />}
              <EventCustomerReviews reviews={event.testimonials || dummyEvent.review_stats.recent_reviews || []} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {event.review_stats && <EventReviewStats stats={event.review_stats} />}
              
              {/* Booking CTA */}
              <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
                  <p className="text-blue-100 mb-6">Secure your spot on this amazing adventure!</p>
                  <BookingButton price={event.price} />
                </div>
              </Card>
            </div>
          </div>
      </div>
    </section>
    </>
  );
};

export default EventDetailsSection; 