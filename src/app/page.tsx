// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
'use client'

import React, { useState } from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/sections/HeroSection';
import ActivityCard from '../components/features/ActivityCard';
import Modal from '../components/base/Modal';
import Button from '../components/base/Button';
import TestimonialCard from '../components/cards/TestimonialCard';
import TourScheduleCard from '../components/cards/TourScheduleCard';
import FooterLink from '../components/layout/FooterLink';
import SocialMediaLink from '../components/layout/SocialMediaLink';
import PaymentMethodIcon from '../components/layout/PaymentMethodIcon';
import WhatsAppButton from '../components/common/WhatsAppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  interface ActivityType {
    name: string;
    description: string;
    duration: string;
    price: string;
    image: string;
    included: string[];
    safety: string[];
    requirements: string[];
    reviews: {
      name: string;
      rating: number;
      comment: string;
    }[];
  }
  interface PackageType {
    name: string;
    description: string;
    includes: string[];
    price: string;
    duration: string;
    highlights: string[];
  }
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);

  const activityMap: { [key: string]: ActivityType } = {
    "Parasailing Adventure": {
      name: "Parasailing Adventure",
      description: "Experience the thrill of soaring above the crystal-clear waters of Coral Island with our professional parasailing team. Perfect for both beginners and experienced adventurers.",
      duration: "15 minutes flight time",
      price: "฿800 per person",
      image: "images/activity/parasailing.jpg",
      included: [
        "Safety briefing",
        "All necessary equipment",
        "Professional instructor",
        "Insurance coverage",
        "Photo opportunity"
      ],
      safety: [
        "Weight limit: 35-115kg",
        "Life jacket provided",
        "Weather dependent activity",
        "Professional safety supervision"
      ],
      requirements: [
        "Minimum age: 10 years",
        "Good physical condition",
        "Signed waiver form",
        "No pregnant women or heart conditions"
      ],
      reviews: [
        {
          name: "John D.",
          rating: 5,
          comment: "Amazing experience! The staff was very professional and made me feel safe throughout."
        },
        {
          name: "Maria S.",
          rating: 4,
          comment: "Great fun, though the wait time was a bit long. The view was spectacular!"
        }
      ]
    },
    "Jet Ski Ride": {
      name: "Jet Ski Ride",
      description: "Feel the rush of adrenaline as you ride the waves on our powerful jet skis. Explore the beautiful coastline of Coral Island with an experienced guide.",
      duration: "30 minutes",
      price: "฿1,200 per ride",
      image: "images/activity/jet-ski.jpg",
      included: [
        "Safety briefing",
        "Jet ski rental",
        "Life jacket",
        "Professional guide",
        "Insurance coverage"
      ],
      safety: [
        "Weight limit: 45-120kg",
        "Life jacket mandatory",
        "Weather dependent activity",
        "Safety distance rules"
      ],
      requirements: [
        "Minimum age: 16 years",
        "Valid ID required",
        "Swimming ability required",
        "Signed waiver form"
      ],
      reviews: [
        {
          name: "Mike R.",
          rating: 5,
          comment: "Incredible experience! The jet skis were well-maintained and the guide was very helpful."
        },
        {
          name: "Lisa T.",
          rating: 5,
          comment: "So much fun! Will definitely do this again on my next visit."
        }
      ]
    },
    "Banana Boat Ride": {
      name: "Banana Boat Ride",
      description: "Enjoy a thrilling ride on our inflatable banana boat with friends and family. Perfect for group fun and excitement on the water.",
      duration: "15 minutes",
      price: "฿400 per person",
      image: "images/activity/banana-boat.jpg",
      included: [
        "Safety briefing",
        "Life jacket",
        "Professional boat driver",
        "Insurance coverage"
      ],
      safety: [
        "Weight limit: 30-100kg",
        "Life jacket mandatory",
        "Weather dependent activity",
        "Group size: 4-6 people"
      ],
      requirements: [
        "Minimum age: 8 years",
        "Basic swimming ability",
        "Signed waiver form",
        "Children must be accompanied by adult"
      ],
      reviews: [
        {
          name: "David K.",
          rating: 4,
          comment: "Great fun for the whole family! Kids loved it."
        },
        {
          name: "Sarah M.",
          rating: 5,
          comment: "Such a blast! Our group had so much fun together."
        }
      ]
    },
    "Snorkeling Experience": {
      name: "Snorkeling Experience",
      description: "Discover the vibrant underwater world of Coral Island with our guided snorkeling experience. Swim among colorful tropical fish and explore beautiful coral reefs.",
      duration: "1 hour",
      price: "฿600 per person",
      image: "images/activity/snorkeling.jpg",
      included: [
        "Professional guide",
        "Snorkeling equipment",
        "Safety briefing",
        "Marine life guide book",
        "Underwater photos",
        "Insurance coverage"
      ],
      safety: [
        "Life jacket available",
        "Designated safe zones",
        "Professional supervision",
        "Emergency equipment on standby"
      ],
      requirements: [
        "Basic swimming ability",
        "Minimum age: 7 years",
        "Signed waiver form",
        "Medical fitness declaration"
      ],
      reviews: [
        {
          name: "Emma W.",
          rating: 5,
          comment: "Incredible experience! Saw so many beautiful fish and the guide was very knowledgeable."
        },
        {
          name: "James P.",
          rating: 4,
          comment: "Great activity for the whole family. Equipment was clean and well-maintained."
        }
      ]
    },
    "Sea Walking": {
      name: "Sea Walking",
      description: "Experience walking on the ocean floor with our unique sea walking helmets. No diving experience needed to explore the underwater world up close.",
      duration: "30 minutes",
      price: "฿1,500 per person",
      image: "images/activity/sea-walking.jpg",
      included: [
        "Professional instructor",
        "Helmet equipment",
        "Underwater photography",
        "Safety briefing",
        "Insurance coverage",
        "Souvenir certificate"
      ],
      safety: [
        "Constant surface communication",
        "Maximum depth: 5 meters",
        "Professional supervision",
        "Emergency oxygen available"
      ],
      requirements: [
        "Minimum age: 12 years",
        "No swimming ability required",
        "Medical clearance form",
        "Not suitable for pregnant women"
      ],
      reviews: [
        {
          name: "Peter L.",
          rating: 5,
          comment: "Unique experience! Felt very safe with the professional team. Amazing underwater views."
        },
        {
          name: "Sophie R.",
          rating: 5,
          comment: "Absolutely magical! The staff was extremely helpful and patient."
        }
      ]
    },
    "Glass Bottom Boat Tour": {
      name: "Glass Bottom Boat Tour",
      description: "Enjoy the underwater world from the comfort of our glass bottom boat. Perfect for those who want to see marine life without getting wet.",
      duration: "45 minutes",
      price: "฿500 per person",
      image: "images/activity/glass-bottom-boat.jpg",
      included: [
        "Guided tour",
        "Marine life commentary",
        "Comfortable seating",
        "Refreshments",
        "Insurance coverage"
      ],
      safety: [
        "Coast guard certified boat",
        "Life jackets available",
        "Weather monitoring",
        "First aid equipment onboard"
      ],
      requirements: [
        "Suitable for all ages",
        "No physical requirements",
        "Children under 4 free",
        "Subject to weather conditions"
      ],
      reviews: [
        {
          name: "Linda M.",
          rating: 4,
          comment: "Great way to see the marine life. Very informative guide and comfortable boat."
        },
        {
          name: "Robert K.",
          rating: 5,
          comment: "Perfect for our family with small children. Saw lots of colorful fish!"
        }
      ]
    }
  };

  const handleSeeMoreActivity = (activity: string) => {
    const activityDetails = activityMap[activity];
    if (activityDetails) {
      setSelectedActivity(activityDetails);
    }
  };
  const handleSeeMorePackage = (packageName: string) => {
    const packageDetails: PackageType = {
      name: packageName,
      description: "Our premium package offers the ultimate Coral Island experience with VIP services and exclusive amenities.",
      includes: [
        "VIP speedboat transfer",
        "Premium beachfront lunch buffet",
        "Priority access to all activities",
        "Personal tour guide",
        "Professional photography service",
        "Refreshments throughout the day",
        "Insurance coverage"
      ],
      price: "฿1,800 per person",
      duration: "Full day (8 hours)",
      highlights: [
        "Skip-the-line access to all activities",
        "Gourmet lunch with sea view",
        "Personalized service",
        "Luxury amenities"
      ]
    };
    setSelectedPackage(packageDetails);
  };
  const handleCloseModal = () => {
    setSelectedActivity(null);
    setSelectedPackage(null);
  };
  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "Australia",
      rating: 5,
      text: "Absolutely breathtaking! The crystal clear waters and pristine beaches of Coral Island exceeded all our expectations. Our guide was knowledgeable and friendly, making this the highlight of our Thailand trip.",
      package: "Premium Tour Package",
      image: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20smiling%20young%20woman%20with%20blonde%20hair%20and%20sunglasses%2C%20natural%20lighting%2C%20beach%20background%2C%20casual%20summer%20style%2C%20professional%20photography%20with%20soft%20focus%2C%20high%20quality%20portrait&width=80&height=80&seq=1&orientation=squarish"
    },
    {
      name: "Raj Patel",
      country: "India",
      rating: 5,
      text: "The parasailing experience was incredible! My family loved every moment on Coral Island. The lunch was delicious and the staff took care of everything. Will definitely recommend to all my friends visiting Pattaya.",
      package: "Family Adventure Package",
      image: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20smiling%20Indian%20man%20in%20his%2030s%20with%20short%20black%20hair%2C%20natural%20lighting%2C%20beach%20background%2C%20casual%20summer%20style%2C%20professional%20photography%20with%20soft%20focus%2C%20high%20quality%20portrait&width=80&height=80&seq=2&orientation=squarish"
    },
    {
      name: "Chen Wei",
      country: "Singapore",
      rating: 4,
      text: "Beautiful island with lots of activities to enjoy. The speedboat ride was thrilling and the beach was clean and not too crowded. The only thing that could be improved was the waiting time for some activities.",
      package: "Water Sports Package",
      image: "https://readdy.ai/api/search-image?query=portrait%20of%20an%20Asian%20man%20in%20his%2040s%20with%20glasses%2C%20natural%20lighting%2C%20beach%20background%2C%20casual%20summer%20style%2C%20professional%20photography%20with%20soft%20focus%2C%20high%20quality%20portrait&width=80&height=80&seq=3&orientation=squarish"
    }
  ];
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      {/* Featured Tour Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Tour Packages</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose from our most popular tour packages designed to give you the perfect Coral Island experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=luxury%20speedboat%20approaching%20Coral%20Island%20Pattaya%20with%20crystal%20clear%20turquoise%20waters%2C%20white%20sandy%20beach%20visible%20in%20background%2C%20sunny%20day%2C%20blue%20sky%2C%20professional%20travel%20photography%2C%20vibrant%20colors%2C%20paradise%20tropical%20destination&width=400&height=250&seq=5&orientation=landscape"
                  alt="Premium Tour Package"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="text-yellow-400 flex">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-gray-600 text-sm ml-2">(128 reviews)</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Tour Package</h3>
                <p className="text-gray-600 mb-4">Luxury speedboat transfer, buffet lunch, and access to all beach activities with premium service.</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">From ฿1,800</p>
                  <a
                    href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                    data-readdy="true"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            {/* Package 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=family%20enjoying%20beach%20activities%20at%20Coral%20Island%20Pattaya%2C%20parents%20with%20children%20playing%20in%20shallow%20turquoise%20water%2C%20white%20sandy%20beach%2C%20colorful%20beach%20umbrellas%2C%20sunny%20day%2C%20blue%20sky%2C%20professional%20travel%20photography%2C%20vibrant%20colors&width=400&height=250&seq=6&orientation=landscape"
                  alt="Family Adventure Package"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="text-yellow-400 flex">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <span className="text-gray-600 text-sm ml-2">(94 reviews)</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Family Adventure Package</h3>
                <p className="text-gray-600 mb-4">Perfect for families with kids-friendly activities, special lunch options, and family photo service.</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">From ฿1,500</p>
                  <a
                    href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                    data-readdy="true"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            {/* Package 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=water%20sports%20activities%20at%20Coral%20Island%20Pattaya%2C%20jet%20ski%20riding%20on%20turquoise%20waters%2C%20parasailing%20in%20background%2C%20white%20sandy%20beach%2C%20sunny%20day%2C%20blue%20sky%2C%20professional%20travel%20photography%2C%20vibrant%20colors%2C%20action%20shot&width=400&height=250&seq=7&orientation=landscape"
                  alt="Water Sports Package"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="text-yellow-400 flex">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-gray-600 text-sm ml-2">(156 reviews)</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Water Sports Package</h3>
                <p className="text-gray-600 mb-4">For adventure lovers with parasailing, jet ski, and banana boat rides included in the package.</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">From ฿2,200</p>
                  <a
                    href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                    data-readdy="true"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Special Offers */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Special Offers</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Take advantage of our limited-time offers and save on your next Coral Island adventure.</p>
          </div>
          <div className="flex overflow-x-auto pb-6 space-x-6">
            {/* Offer 1 */}
            <div className="bg-white rounded-lg shadow-lg min-w-[300px] flex-shrink-0 overflow-hidden border-t-4 border-yellow-500">
              <div className="p-6">
                <div className="bg-yellow-100 text-yellow-800 font-bold py-1 px-3 rounded-full text-sm inline-block mb-4">
                  SAVE 20%
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Early Bird Special</h3>
                <p className="text-gray-600 mb-4">Book at least 7 days in advance and get 20% off on any tour package.</p>
                <p className="text-sm text-gray-500 mb-4">Valid until April 30, 2025</p>
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-1 rounded text-gray-600 text-sm">
                    Code: <span className="font-bold">EARLY20</span>
                  </div>
                  <a
                    href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                    data-readdy="true"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            {/* Offer 2 */}
            <div className="bg-white rounded-lg shadow-lg min-w-[300px] flex-shrink-0 overflow-hidden border-t-4 border-green-500">
              <div className="p-6">
                <div className="bg-green-100 text-green-800 font-bold py-1 px-3 rounded-full text-sm inline-block mb-4">
                  FAMILY DEAL
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Family Package</h3>
                <p className="text-gray-600 mb-4">Kids under 6 years go free with two paying adults. Includes lunch for everyone.</p>
                <p className="text-sm text-gray-500 mb-4">Valid for all bookings in 2025</p>
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-1 rounded text-gray-600 text-sm">
                    Code: <span className="font-bold">FAMILY</span>
                  </div>
                  <a
                    href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                    data-readdy="true"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            {/* Offer 3 */}
            <div className="bg-white rounded-lg shadow-lg min-w-[300px] flex-shrink-0 overflow-hidden border-t-4 border-purple-500">
              <div className="p-6">
                <div className="bg-purple-100 text-purple-800 font-bold py-1 px-3 rounded-full text-sm inline-block mb-4">
                  GROUP DISCOUNT
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Group Booking</h3>
                <p className="text-gray-600 mb-4">Book for 10 or more people and get 15% off the total price plus free hotel pickup.</p>
                <p className="text-sm text-gray-500 mb-4">Valid for bookings made before May 31, 2025</p>
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-1 rounded text-gray-600 text-sm">
                    Code: <span className="font-bold">GROUP15</span>
                  </div>
                  <a
                    href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                    data-readdy="true"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            {/* Offer 4 */}
            <div className="bg-white rounded-lg shadow-lg min-w-[300px] flex-shrink-0 overflow-hidden border-t-4 border-red-500">
              <div className="p-6">
                <div className="bg-red-100 text-red-800 font-bold py-1 px-3 rounded-full text-sm inline-block mb-4">
                  LAST MINUTE
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Last Minute Deal</h3>
                <p className="text-gray-600 mb-4">25% off for bookings made within 48 hours of departure. Subject to availability.</p>
                <p className="text-sm text-gray-500 mb-4">Limited spots available daily</p>
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-1 rounded text-gray-600 text-sm">
                    Code: <span className="font-bold">LAST25</span>
                  </div>
                  <a
                    href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                    data-readdy="true"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tour Schedule */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tour Schedule</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Plan your perfect day at Coral Island with our organized tour schedule.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TourScheduleCard
              icon="fas fa-sun"
              iconColor="blue-600"
              title="Morning Departure"
              scheduleItems={[
                { icon: "far fa-clock", time: "10:00 - Hotel pickup" },
                { icon: "fas fa-ship", time: "10:30 - Speedboat departure" },
                { icon: "fas fa-map-marker-alt", time: "11:15 - Arrive at Coral Island" }
              ]}
            />
            <TourScheduleCard
              icon="fas fa-umbrella-beach"
              iconColor="yellow-500"
              title="Activities"
              scheduleItems={[
                { icon: "fas fa-water", time: "11:30 - Water activities begin" },
                { icon: "fas fa-fish", time: "13:00 - Snorkeling session" },
                { icon: "fas fa-camera", time: "14:00 - Photo opportunities" }
              ]}
            />
            <TourScheduleCard
              icon="fas fa-utensils"
              iconColor="red-500"
              title="Lunch Break"
              scheduleItems={[
                { icon: "fas fa-hamburger", time: "14:30 - Buffet lunch" },
                { icon: "fas fa-coffee", time: "15:00 - Rest & refreshments" },
                { icon: "fas fa-umbrella", time: "15:30 - Beach relaxation" }
              ]}
            />
            <TourScheduleCard
              icon="fas fa-moon"
              iconColor="purple-600"
              title="Return Journey"
              scheduleItems={[
                { icon: "fas fa-ship", time: "16:00 - Depart island" },
                { icon: "fas fa-building", time: "16:45 - Arrive at pier" },
                { icon: "fas fa-hotel", time: "17:00 - Hotel drop-off" }
              ]}
            />
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">* Schedule may vary slightly based on weather conditions and season</p>
            <a
              href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
              data-readdy="true"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
            >
              Book This Tour
            </a>
          </div>
        </div>
      </section>
      {/* Popular Activities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Activities</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Enhance your Coral Island experience with these exciting activities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(activityMap).map(([name, activity]) => (
              <ActivityCard
                key={name}
                name={activity.name}
                duration={activity.duration}
                price={activity.price}
                image={activity.image}
                onViewDetails={() => handleSeeMoreActivity(name)}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Read about the experiences of travelers who have enjoyed our Coral Island tours.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TestimonialCard
              name={testimonials[currentTestimonial].name}
              country={testimonials[currentTestimonial].country}
              rating={testimonials[currentTestimonial].rating}
              text={testimonials[currentTestimonial].text}
              package={testimonials[currentTestimonial].package}
              image={testimonials[currentTestimonial].image}
            />
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition cursor-pointer"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition cursor-pointer"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Coral Island Pattaya</h2>
              <p className="text-gray-600 mb-4">
                Located just 7.5 kilometers off the coast of Pattaya, Coral Island (Koh Larn) is a tropical paradise known for its pristine white sandy beaches and crystal clear waters. The island offers a perfect escape from the hustle and bustle of Pattaya city.
              </p>
              <p className="text-gray-600 mb-4">
                Our tour company has been providing exceptional island experiences since 2010, with a focus on customer satisfaction, safety, and environmental responsibility. We offer a variety of tour packages suitable for families, couples, and adventure seekers.
              </p>
              <p className="text-gray-600 mb-6">
                All our tours include comfortable transportation, professional guides, insurance coverage, and delicious meal options to ensure you have a memorable and worry-free experience at Coral Island.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-button transition duration-300 whitespace-nowrap cursor-pointer">
                Learn More About Us
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="images/beach1.jpg"
                alt="Coral Island Beach"
                className="rounded-lg shadow-md h-full object-cover object-top"
              />
              <img
                src="images/beach2.jpg"
                alt="Traditional Long-tail Boat"
                className="rounded-lg shadow-md h-full object-cover object-top"
              />
              <img
                src="images/beach3.jpg"
                alt="Aerial View of Coral Island"
                className="rounded-lg shadow-md h-full object-cover object-top"
              />
              <img
                src="images/beach4.jpg"
                alt="Beachside Dining"
                className="rounded-lg shadow-md h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Paradise?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Book your Coral Island tour today and create unforgettable memories in one of Thailand's most beautiful destinations.
          </p>
          <a
            href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
            data-readdy="true"
            className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-button transition duration-300 text-lg whitespace-nowrap cursor-pointer"
          >
            Book Your Tour Now
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Coral Island Pattaya</h3>
              <p className="text-blue-200 mb-4">Experience the beauty of Thailand's most stunning island destination with our premium tour packages.</p>
              <div className="flex space-x-4">
                <SocialMediaLink platform="facebook" href="#" />
                <SocialMediaLink platform="instagram" href="#" />
                <SocialMediaLink platform="twitter" href="#" />
                <SocialMediaLink platform="youtube" href="#" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                  <span>123 Beach Road, Pattaya, Chonburi 20150, Thailand</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-3"></i>
                  <span>+66 38 123 4567</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-3"></i>
                  <span>info@coralislandtour.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-blue-200">
                <FooterLink href="#">Home</FooterLink>
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Tour Packages</FooterLink>
                <FooterLink href="#">Activities</FooterLink>
                <FooterLink href="#">Gallery</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">We Accept</h3>
              <div className="flex flex-wrap gap-3">
                <PaymentMethodIcon method="visa" />
                <PaymentMethodIcon method="mastercard" />
                <PaymentMethodIcon method="amex" />
                <PaymentMethodIcon method="paypal" />
              </div>
              <h3 className="text-lg font-semibold mt-6 mb-4">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full text-gray-800 rounded-l-lg focus:outline-none border-none"
                />
                <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-4 rounded-r-lg !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-10 pt-6 text-center text-blue-300">
            <p>© 2025 Coral Island Pattaya Tours. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <FooterLink href="#">Terms & Conditions</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Refund Policy</FooterLink>
            </div>
          </div>
        </div>
      </footer>
      {/* Activity Details Modal */}
      <Modal
        isOpen={!!selectedActivity}
        onClose={handleCloseModal}
        title={selectedActivity?.name || ''}
        size="lg"
      >
        {selectedActivity && (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-600">{selectedActivity.description}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-50 rounded-lg p-4 flex-1">
                <div className="flex items-center text-blue-600 mb-2">
                  <i className="far fa-clock mr-2"></i>
                  <span className="font-semibold">Duration</span>
                </div>
                <p className="text-gray-600">{selectedActivity.duration}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex-1">
                <div className="flex items-center text-green-600 mb-2">
                  <i className="fas fa-tag mr-2"></i>
                  <span className="font-semibold">Price</span>
                </div>
                <p className="text-gray-600">{selectedActivity.price}</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">What's Included</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedActivity.included.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Safety Information</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedActivity.safety.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <i className="fas fa-shield-alt text-blue-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedActivity.requirements.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <i className="fas fa-exclamation-circle text-yellow-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Customer Reviews</h4>
              <div className="space-y-4">
                {selectedActivity.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">{review.name}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t">
              <button onClick={handleCloseModal} className="mr-4 px-6 py-2 border border-gray-300 rounded-button text-gray-600 hover:bg-gray-50 transition duration-300 whitespace-nowrap cursor-pointer">
                Close
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-button transition duration-300 whitespace-nowrap cursor-pointer">
                Add to Tour
              </button>
            </div>
          </div>
        )}
      </Modal>
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{selectedPackage.name}</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 p-2">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-6">{selectedPackage.description}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 flex-1">
                    <div className="flex items-center text-blue-600 mb-2">
                      <i className="far fa-clock mr-2"></i>
                      <span className="font-semibold">Duration</span>
                    </div>
                    <p className="text-gray-600">{selectedPackage.duration}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 flex-1">
                    <div className="flex items-center text-green-600 mb-2">
                      <i className="fas fa-tag mr-2"></i>
                      <span className="font-semibold">Price</span>
                    </div>
                    <p className="text-gray-600">{selectedPackage.price}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Package Includes</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedPackage.includes.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Package Highlights</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedPackage.highlights.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <i className="fas fa-star text-yellow-500 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <button onClick={handleCloseModal} className="mr-4 px-6 py-2 border border-gray-300 rounded-button text-gray-600 hover:bg-gray-50 transition duration-300 whitespace-nowrap cursor-pointer">
                  Close
                </button>
                <a
                  href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                  data-readdy="true"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="+66381234567" />
    </div>
  );
}
export default App
