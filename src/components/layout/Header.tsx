import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faChevronDown, 
    faTimes, 
    faSpinner,
    faUmbrellaBeach,
    faTable,
    faCalendarCheck,
    faStar,
    faUsers,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
}

interface HeaderProps {
    isLoggedIn: boolean;
    currentUser: User | null;
    onLogin: () => void;
    onLogout: () => void;
    onShowProfileModal: () => void;
    onShowPasswordModal: () => void;
    onShowBookingsModal: () => void;
    onShowPackageModal: () => void;
}

const Header: React.FC<HeaderProps> = ({
    isLoggedIn,
    currentUser,
    onLogin,
    onLogout,
    onShowProfileModal,
    onShowPasswordModal,
    onShowBookingsModal,
    onShowPackageModal
}) => {
    const [showToast, setShowToast] = useState<boolean>(false);

  return (
        <header className="relative">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://readdy.ai/api/search-image?query=Panoramic%20view%20of%20Coral%20Island%20Pattaya%2C%20crystal%20clear%20turquoise%20waters%2C%20white%20sandy%20beaches%2C%20lush%20green%20palm%20trees%2C%20colorful%20long-tail%20boats%2C%20people%20enjoying%20beach%20activities%2C%20stunning%20blue%20sky%20with%20few%20clouds%2C%20perfect%20tropical%20paradise%20destination&width=1440&height=600&seq=5&orientation=landscape"
                    alt="Coral Island Pattaya"
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
            </div>
            <div className="relative z-10">
                <nav className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
                        <a href="/" className="hover:opacity-90 transition-opacity">
              <h1 className="text-3xl font-bold text-white">Coral Island Pattaya</h1>
                        </a>
          </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-white items-center w-full md:w-auto">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="hover:text-blue-200 transition cursor-pointer"
                        >
                            Home
                        </a>
                        <a href="#" className="hover:text-blue-200 transition cursor-pointer">Tours</a>
                        <a href="#" className="hover:text-blue-200 transition cursor-pointer">About</a>
                        <a href="#" className="hover:text-blue-200 transition cursor-pointer">Contact</a>
                        {isLoggedIn ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-white hover:text-blue-200 transition">
                                    <img src={currentUser?.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                                    <span>{currentUser?.name}</span>
                                    <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                                    <button
                                        onClick={onShowProfileModal}
                                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faUser} className="mr-2" /> Edit Profile
                                    </button>
                                    <button
                                        onClick={onShowPasswordModal}
                                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faUser} className="mr-2" /> Change Password
                                    </button>
                                    <button
                                        onClick={onShowBookingsModal}
                                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faUser} className="mr-2" /> My Bookings
                                    </button>
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faUser} className="mr-2" /> Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={onLogin}
                                className="text-white hover:text-blue-200 transition cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faUser} className="mr-2" /> Login
                            </button>
                        )}
          </div>
                    <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-button shadow-lg transition duration-300 whitespace-nowrap cursor-pointer">
                        Book Now
                    </button>
        </nav>
                <div className="container mx-auto px-6 py-12 md:py-32">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience Paradise at Coral Island</h2>
                        <p className="text-xl text-blue-100 mb-8">Discover crystal-clear waters, pristine beaches, and unforgettable adventures on Thailand's most beautiful island.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    const packageSection = document.getElementById('tourPackages');
                                    if (packageSection) {
                                        packageSection.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        onShowPackageModal();
                                    }
                                }}
                                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-button shadow-lg text-lg transition duration-300 whitespace-nowrap cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faUmbrellaBeach} className="mr-2" />
                                Explore Packages
                            </button>
                            <button
                                onClick={onShowPackageModal}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded-button shadow-lg text-lg transition duration-300 whitespace-nowrap cursor-pointer backdrop-blur-sm border-2 border-white/30"
                            >
                                <FontAwesomeIcon icon={faTable} className="mr-2" />
                                Compare Plans
                            </button>
                            <button
                                onClick={() => {
                                    const packageSection = document.getElementById('tourPackages');
                                    if (packageSection) {
                                        packageSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-button shadow-lg text-lg transition duration-300 whitespace-nowrap cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
                                Book Now
                            </button>
                        </div>
                        <div className="mt-12 flex flex-wrap gap-6">
                            <div className="flex items-center text-white">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
                                <span>4.9/5 Rating</span>
                            </div>
                            <div className="flex items-center text-white">
                                <FontAwesomeIcon icon={faUsers} className="text-blue-300 mr-2" />
                                <span>10,000+ Happy Customers</span>
                            </div>
                            <div className="flex items-center text-white">
                                <FontAwesomeIcon icon={faShieldAlt} className="text-green-400 mr-2" />
                                <span>100% Secure Booking</span>
                            </div>
                        </div>
                    </div>
                </div>
      </div>
    </header>
  );
};

export default Header; 