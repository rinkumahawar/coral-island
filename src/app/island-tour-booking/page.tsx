'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCheckCircle, 
    faChevronDown, 
    faUser, 
    faKey, 
    faCalendarAlt, 
    faSignOutAlt, 
    faTimes, 
    faCheck, 
    faPlus, 
    faMinus, 
    faExclamationCircle, 
    faClock, 
    faRoute, 
    faGift, 
    faBan, 
    faInfo, 
    faCalendarTimes, 
    faShieldAlt, 
    faMapMarkerAlt, 
    faPhoneAlt, 
    faEnvelope, 
    faPaperPlane,
    faUmbrellaBeach,
    faTable,
    faCalendarCheck,
    faStar,
    faUsers,
    faShieldAlt as faShield,
    faTimesCircle,
    faCheckCircle as faCheckCircleSolid,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import TicketTypes from '@/components/booking/TicketTypes';
import DateTimeSelection from '@/components/booking/DateTimeSelection';
import PaxSelection from '@/components/booking/PaxSelection';
import AddOnSelection from '@/components/booking/AddOnSelection';
import BookingSummaryList from '@/components/booking/BookingSummaryList';
import Footer from '@/components/layout/Footer';
import TourInformation from '@/components/booking/TourInformation';
import Button from '@/components/base/Button';
import BookingModals from '@/components/booking/BookingModals';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
}
interface Booking {
    id: string;
    date: string;
    time: string;
    packageType: string;
    adults: number;
    children: number;
    addons: string[];
    status: 'upcoming' | 'completed' | 'cancelled';
    totalAmount: number;
}
const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const [showBookingsModal, setShowBookingsModal] = useState<boolean>(false);
    const [showPackageModal, setShowPackageModal] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userBookings, setUserBookings] = useState<Booking[]>([]);
    // Login form state
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    // Profile form state
    const [profileName, setProfileName] = useState<string>('');
    const [profileEmail, setProfileEmail] = useState<string>('');
    const [profilePhone, setProfilePhone] = useState<string>('');
    // Password change state
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    // Mock user data
    const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+66891234567',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20friendly%20smile%2C%20modern%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20studio%20lighting&width=100&height=100&seq=9&orientation=squarish'
    };
    // Mock bookings data
    const mockBookings: Booking[] = [
        {
            id: 'BK001',
            date: '2025-04-25',
            time: '09:00 AM',
            packageType: 'Premium Tour Package',
            adults: 2,
            children: 1,
            addons: ['Parasailing Adventure', 'Snorkeling Experience'],
            status: 'upcoming',
            totalAmount: 5200
        },
        {
            id: 'BK002',
            date: '2025-03-15',
            time: '10:00 AM',
            packageType: 'Standard Tour Package',
            adults: 2,
            children: 0,
            addons: ['Banana Boat Ride'],
            status: 'completed',
            totalAmount: 2800
        }
    ];
    useEffect(() => {
        // Check login state from localStorage
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const savedUser = localStorage.getItem('user');
        if (isLoggedIn && savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setCurrentUser(parsedUser);
                setIsLoggedIn(true);
                setUserBookings(mockBookings);
            } catch (error) {
                // Handle corrupted localStorage data
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('isLoggedIn');
            }
        }
    }, []);
    const [loginError, setLoginError] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [couponCode, setCouponCode] = useState<string>('');
    const [couponDiscount, setCouponDiscount] = useState<number>(0);
    const [couponError, setCouponError] = useState<string>('');
    const applyCoupon = () => {
        // Reset previous error and discount
        setCouponError('');
        setCouponDiscount(0);
        // Mock coupon validation
        const mockCoupons = {
            'SUMMER25': 0.25,
            'WELCOME10': 0.10,
            'SPECIAL15': 0.15
        };
        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code');
            return;
        }
        const discountRate = mockCoupons[couponCode.toUpperCase() as keyof typeof mockCoupons];
        if (discountRate) {
            const discount = Math.round(subtotal * discountRate);
            setCouponDiscount(discount);
            setCouponCode(''); // Clear the input after successful application
        } else {
            setCouponError('Invalid coupon code');
        }
    };
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Get form elements using ID selectors
        const emailInput = document.getElementById('loginEmail') as HTMLInputElement;
        const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;
        const loginBtn = document.getElementById('loginButton') as HTMLButtonElement;
        // Form validation
        if (!emailInput.value.trim()) {
            setLoginError('Email is required');
            emailInput.focus();
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            setLoginError('Please enter a valid email address');
            emailInput.focus();
            return;
        }
        if (!passwordInput.value.trim()) {
            setLoginError('Password is required');
            passwordInput.focus();
            return;
        }
        // Disable button during authentication
        loginBtn.disabled = true;
        loginBtn.innerHTML = `
            <span class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </span>
            Logging in...
        `;
        try {
            // Reset previous error
            setLoginError('');
            // Mock API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Mock authentication check
            if (emailInput.value === mockUser.email && passwordInput.value === 'password') {
                // Update state and localStorage
                setCurrentUser(mockUser);
                setIsLoggedIn(true);
                setUserBookings(mockBookings);
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('isLoggedIn', 'true');
                // Clear form and close modal
                setLoginEmail('');
                setLoginPassword('');
                setShowLoginModal(false);
                // Show success toast
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            setLoginError(error instanceof Error ? error.message : 'Invalid email or password');
        } finally {
            // Re-enable button
            loginBtn.disabled = false;
            loginBtn.innerHTML = 'Login';
        }
    };
    const handleLogout = () => {
        // Clear state
        setCurrentUser(null);
        setIsLoggedIn(false);
        setUserBookings([]);
        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        // Show logout toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };
    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                name: profileName,
                email: profileEmail,
                phone: profilePhone
            };
            setCurrentUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setShowProfileModal(false);
        }
    };
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        // Mock password change logic
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('Password updated successfully');
    };
    const downloadVoucher = (bookingId: string) => {
        // Mock download logic
        alert(`Downloading voucher for booking ${bookingId}`);
    };
    const downloadReceipt = (bookingId: string) => {
        // Mock download logic
        alert(`Downloading receipt for booking ${bookingId}`);
    };
    const cancelBooking = (bookingId: string) => {
        // Mock cancel logic
        setUserBookings(prevBookings =>
            prevBookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: 'cancelled' as const }
                    : booking
            )
        );
    };
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childCount, setChildCount] = useState<number>(0);
    const [selectedTicket, setSelectedTicket] = useState<string>('standard');
    const [addons, setAddons] = useState<{ [key: string]: { selected: boolean; quantity: number } }>({
        parasailing: { selected: false, quantity: 0 },
        snorkeling: { selected: false, quantity: 0 },
        jetski: { selected: false, quantity: 0 },
        bananaride: { selected: false, quantity: 0 },
        seawalker: { selected: false, quantity: 0 },
        indianlunch: { selected: false, quantity: 0 },
        thailunch: { selected: false, quantity: 0 },
        insurance: { selected: false, quantity: 0 }
    });
    const tickets = {
        custom: {
            name: "Custom Tour Package",
            adultPrice: 800,
            childPrice: 500,
            description: "Basic Coral Island tour with lunch and shared transfer - perfect for flexible travelers",
            inclusions: [
                "Shared round-trip transfers from Pattaya city area",
                "Basic Thai Lunch",
                "Drinking water",
                "Basic accident insurance",
                "English-speaking guide (shared)"
            ],
            exclusions: [
                "Beach chairs and umbrellas",
                "Additional water activities",
                "Premium beach access",
                "Personal guide",
                "Fruits and snacks",
                "Premium insurance coverage"
            ],
            itinerary: [
                { time: "09:00 - 09:30", activity: "Hotel pickup (shared transfer)" },
                { time: "10:00 - 10:30", activity: "Boat transfer to Coral Island" },
                { time: "10:30 - 12:30", activity: "Free time for beach activities" },
                { time: "12:30 - 13:30", activity: "Basic Thai lunch" },
                { time: "13:30 - 15:00", activity: "Continue beach activities" },
                { time: "15:00 - 15:30", activity: "Return boat transfer" },
                { time: "16:00 - 16:30", activity: "Hotel drop-off (shared transfer)" }
            ]
        },
        standard: {
            name: "Standard Tour Package",
            adultPrice: 1200,
            childPrice: 800,
            description: "Full day Coral Island tour with lunch and round-trip speed boat transfer",
            inclusions: [
                "Round-trip hotel transfers in Pattaya city area",
                "Round-trip speed boat transfers",
                "Thai Lunch at beachfront restaurant",
                "Drinking water and seasonal fruits",
                "Beach chairs and umbrellas (subject to availability)",
                "Basic accident insurance",
                "English-speaking guide"
            ],
            exclusions: [
                "Premium beach access",
                "Personal guide",
                "Sea Walker experience",
                "Indian lunch option",
                "Premium insurance coverage",
                "Additional water activities"
            ],
            itinerary: [
                { time: "08:00 - 08:30", activity: "Hotel pickup" },
                { time: "09:00 - 09:30", activity: "Speed boat transfer to Coral Island" },
                { time: "09:30 - 12:00", activity: "Free time for beach activities" },
                { time: "12:00 - 13:00", activity: "Thai lunch at beachfront restaurant" },
                { time: "13:00 - 15:30", activity: "Continue beach activities" },
                { time: "15:30 - 16:00", activity: "Return speed boat transfer" },
                { time: "16:00 - 16:30", activity: "Hotel drop-off" }
            ]
        },
        premium: {
            name: "Premium Tour Package",
            adultPrice: 1800,
            childPrice: 1200,
            description: "Full day Coral Island tour with premium lunch, private beach access, and VIP speed boat transfer",
            inclusions: [
                "Round-trip hotel transfers in luxury van",
                "Round-trip VIP speed boat transfers",
                "Choice of Thai or Indian lunch",
                "Premium beach access",
                "Unlimited drinking water and fresh fruits",
                "Premium beach chairs and umbrellas",
                "Enhanced accident insurance",
                "Multilingual guide",
                "Sea Walker experience (15 minutes)",
                "Underwater photography"
            ],
            exclusions: [
                "Personal guide",
                "Additional water activities beyond included ones",
                "Spa treatments",
                "Premium insurance coverage"
            ],
            itinerary: [
                { time: "08:00 - 08:30", activity: "Luxury van hotel pickup" },
                { time: "09:00 - 09:30", activity: "VIP speed boat transfer" },
                { time: "09:30 - 11:00", activity: "Beach activities at premium area" },
                { time: "11:00 - 12:00", activity: "Sea Walker experience" },
                { time: "12:00 - 13:30", activity: "Premium lunch (Thai/Indian)" },
                { time: "13:30 - 15:30", activity: "Continue beach activities" },
                { time: "15:30 - 16:00", activity: "Return VIP transfer" },
                { time: "16:00 - 16:30", activity: "Luxury van hotel drop-off" }
            ]
        },
        vip: {
            name: "VIP Tour Package",
            adultPrice: 2500,
            childPrice: 1600,
            description: "Exclusive full day Coral Island tour with gourmet lunch, private beach area, personal guide, and luxury speed boat transfer",
            inclusions: [
                "Private round-trip luxury van transfers",
                "Private luxury speed boat transfers",
                "Personal multilingual guide",
                "Exclusive VIP beach area access",
                "Gourmet Thai or Indian lunch with seafood",
                "Premium drinks and fresh tropical fruits",
                "Luxury beach beds and private cabana",
                "Comprehensive premium insurance",
                "Extended Sea Walker experience (30 minutes)",
                "Professional photography package",
                "Private beach butler service"
            ],
            exclusions: [
                "Spa treatments",
                "Additional water activities beyond included ones",
                "Special dietary requirements beyond menu"
            ],
            itinerary: [
                { time: "Flexible", activity: "Private luxury van pickup" },
                { time: "Morning", activity: "Private speed boat transfer" },
                { time: "All Day", activity: "Exclusive beach access with butler" },
                { time: "Morning", activity: "Extended Sea Walker experience" },
                { time: "Noon", activity: "Gourmet lunch of choice" },
                { time: "Afternoon", activity: "Private beach activities" },
                { time: "Flexible", activity: "Return private transfer" }
            ]
        }
    };
    const addonOptions = [
        {
            id: "parasailing",
            name: "Parasailing Adventure",
            price: 800,
            duration: "30 minutes",
            available: true,
            image: "https://readdy.ai/api/search-image?query=Parasailing%20adventure%20in%20Coral%20Island%20Pattaya%2C%20person%20flying%20high%20above%20crystal%20clear%20turquoise%20waters%20with%20colorful%20parachute%2C%20beautiful%20beach%20and%20island%20scenery%20visible%20below%2C%20sunny%20day%20with%20few%20clouds%2C%20vibrant%20colors&width=400&height=300&seq=1&orientation=landscape"
        },
        {
            id: "snorkeling",
            name: "Snorkeling Experience",
            price: 500,
            duration: "1 hour",
            available: true,
            image: "https://readdy.ai/api/search-image?query=Person%20snorkeling%20in%20clear%20turquoise%20waters%20around%20Coral%20Island%20Pattaya%2C%20colorful%20tropical%20fish%20and%20coral%20reefs%20visible%20underwater%2C%20bright%20sunshine%20creating%20beautiful%20light%20rays%20through%20water%2C%20vibrant%20marine%20life%2C%20professional%20underwater%20photography&width=400&height=300&seq=2&orientation=landscape"
        },
        {
            id: "jetski",
            name: "Jet Ski Ride",
            price: 1200,
            duration: "45 minutes",
            available: true,
            image: "https://readdy.ai/api/search-image?query=Person%20riding%20jet%20ski%20on%20crystal%20clear%20blue%20waters%20around%20Coral%20Island%20Pattaya%2C%20creating%20splashing%20waves%2C%20beautiful%20tropical%20island%20scenery%20in%20background%2C%20sunny%20day%20with%20perfect%20weather%2C%20action%20shot%20with%20water%20spray%2C%20exciting%20water%20sport%20adventure&width=400&height=300&seq=3&orientation=landscape"
        },
        {
            id: "bananaride",
            name: "Banana Boat Ride",
            price: 400,
            duration: "20 minutes",
            available: true,
            image: "https://readdy.ai/api/search-image?query=Group%20of%20people%20enjoying%20banana%20boat%20ride%20being%20pulled%20by%20speedboat%20on%20turquoise%20waters%20near%20Coral%20Island%20Pattaya%2C%20people%20laughing%20and%20holding%20on%20tight%2C%20splashing%20water%2C%20beautiful%20beach%20background%2C%20exciting%20water%20activity%2C%20sunny%20tropical%20day&width=400&height=300&seq=4&orientation=landscape"
        },
        {
            id: "seawalker",
            name: "Sea Walker Experience",
            price: 1500,
            duration: "30 minutes",
            available: true,
            image: "https://readdy.ai/api/search-image?query=Person%20experiencing%20underwater%20sea%20walking%20with%20special%20helmet%20equipment%20in%20crystal%20clear%20waters%20of%20Coral%20Island%20Pattaya%2C%20surrounded%20by%20colorful%20tropical%20fish%20and%20coral%20reefs%2C%20professional%20guide%20assistance%2C%20unique%20underwater%20adventure%20experience&width=400&height=300&seq=5&orientation=landscape"
        },
        {
            id: "indianlunch",
            name: "Indian Lunch Upgrade",
            price: 300,
            duration: "1.5 hours",
            available: true,
            image: "https://readdy.ai/api/search-image?query=Luxurious%20Indian%20lunch%20spread%20at%20beachfront%20restaurant%20in%20Coral%20Island%20Pattaya%2C%20variety%20of%20authentic%20Indian%20dishes%2C%20naan%20bread%2C%20curries%2C%20and%20desserts%2C%20elegant%20table%20setting%20with%20ocean%20view%2C%20professional%20food%20photography%20style&width=400&height=300&seq=6&orientation=landscape"
        },
        {
            id: "thailunch",
            name: "Thai Lunch Upgrade",
            price: 250,
            duration: "1.5 hours",
            available: true,
            image: "https://readdy.ai/api/search-image?query=Traditional%20Thai%20lunch%20spread%20at%20beachside%20restaurant%20in%20Coral%20Island%20Pattaya%2C%20colorful%20authentic%20Thai%20dishes%2C%20tom%20yum%2C%20pad%20thai%2C%20fresh%20seafood%2C%20beautiful%20presentation%20with%20tropical%20garnishes%2C%20ocean%20view%20dining%20setting&width=400&height=300&seq=7&orientation=landscape"
        },
        {
            id: "insurance",
            name: "Premium Insurance Coverage",
            price: 200,
            duration: "Full day",
            available: true,
            image: "https://readdy.ai/api/search-image?query=Professional%20medical%20and%20safety%20equipment%20display%20on%20tropical%20beach%20setting%2C%20first%20aid%20kits%2C%20life%20jackets%2C%20emergency%20supplies%2C%20with%20Coral%20Island%20Pattaya%20beach%20background%2C%20representing%20premium%20travel%20insurance%20coverage&width=400&height=300&seq=8&orientation=landscape"
        }
    ];
    const availableTimeSlots = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "01:00 PM", "02:00 PM"
    ];
    const handleAddonToggle = (addonId: string) => {
        setAddons({
            ...addons,
            [addonId]: {
                ...addons[addonId],
                selected: !addons[addonId].selected,
                quantity: addons[addonId].selected ? 0 : 1
            }
        });
    };
    const handleAddonQuantity = (addonId: string, change: number) => {
        const totalPeople = adultCount + childCount;
        const newQuantity = Math.max(0, Math.min(addons[addonId].quantity + change, totalPeople));
        // Update all premium package addons when one is changed
        if (selectedTicket === 'premium' &&
            (addonId === 'parasailing' || addonId === 'jetski' || addonId === 'bananaride')) {
            setAddons(prev => ({
                ...prev,
                parasailing: { ...prev.parasailing, selected: true, quantity: newQuantity },
                jetski: { ...prev.jetski, selected: true, quantity: newQuantity },
                bananaride: { ...prev.bananaride, selected: true, quantity: newQuantity }
            }));
        } else {
            setAddons(prev => ({
                ...prev,
                [addonId]: {
                    ...prev[addonId],
                    selected: newQuantity > 0,
                    quantity: newQuantity
                }
            }));
        }
    };
    const handlePackageSelect = (packageId: string) => {
        setSelectedTicket(packageId);
        const totalPeople = adultCount + childCount;
        // Reset all addons first with quantity structure
        const resetAddons = Object.keys(addons).reduce((acc, key) => {
            acc[key] = { selected: false, quantity: 0 };
            return acc;
        }, {} as { [key: string]: { selected: boolean; quantity: number } });
        // Set specific addons based on selected package
        if (packageId === 'standard') {
            setAddons({
                ...resetAddons,
                indianlunch: { selected: true, quantity: totalPeople },
                insurance: { selected: true, quantity: totalPeople }
            });
        } else if (packageId === 'premium') {
            setAddons({
                ...resetAddons,
                indianlunch: { selected: true, quantity: totalPeople },
                parasailing: { selected: true, quantity: totalPeople },
                jetski: { selected: true, quantity: totalPeople },
                bananaride: { selected: true, quantity: totalPeople },
                insurance: { selected: true, quantity: totalPeople }
            });
        } else if (packageId === 'vip') {
            // Enable all addons for VIP package
            const allAddonsEnabled = Object.keys(addons).reduce((acc, key) => {
                acc[key] = { selected: true, quantity: totalPeople };
                return acc;
            }, {} as { [key: string]: { selected: boolean; quantity: number } });
            setAddons(allAddonsEnabled);
        } else {
            setAddons(resetAddons);
        }
    };
    const incrementCount = (type: 'adult' | 'child') => {
        if (type === 'adult') {
            setAdultCount(prev => {
                const newCount = prev + 1;
                updateAddonsForPeopleChange(newCount, childCount);
                return newCount;
            });
        } else {
            setChildCount(prev => {
                const newCount = prev + 1;
                updateAddonsForPeopleChange(adultCount, newCount);
                return newCount;
            });
        }
    };
    const updateAddonsForPeopleChange = (newAdultCount: number, newChildCount: number) => {
        const totalPeople = newAdultCount + newChildCount;
        if (selectedTicket === 'premium') {
            setAddons(prev => ({
                ...prev,
                parasailing: { ...prev.parasailing, selected: true, quantity: totalPeople },
                jetski: { ...prev.jetski, selected: true, quantity: totalPeople },
                bananaride: { ...prev.bananaride, selected: true, quantity: totalPeople },
                indianlunch: { ...prev.indianlunch, selected: true, quantity: totalPeople },
                insurance: { ...prev.insurance, selected: true, quantity: totalPeople }
            }));
        } else if (selectedTicket === 'vip') {
            setAddons(prev =>
                Object.keys(prev).reduce((acc, key) => {
                    acc[key] = { selected: true, quantity: totalPeople };
                    return acc;
                }, {} as typeof prev)
            );
        } else if (selectedTicket === 'standard') {
            setAddons(prev => ({
                ...prev,
                indianlunch: { ...prev.indianlunch, selected: true, quantity: totalPeople },
                insurance: { ...prev.insurance, selected: true, quantity: totalPeople }
            }));
        }
    };
    const decrementCount = (type: 'adult' | 'child') => {
        if (type === 'adult' && adultCount > 1) {
            setAdultCount(prev => {
                const newCount = prev - 1;
                updateAddonsForPeopleChange(newCount, childCount);
                return newCount;
            });
        } else if (type === 'child' && childCount > 0) {
            setChildCount(prev => {
                const newCount = prev - 1;
                updateAddonsForPeopleChange(adultCount, newCount);
                return newCount;
            });
        }
    };
    const calculateSubtotal = () => {
        const selectedTicketObj = tickets[selectedTicket as keyof typeof tickets];
        const ticketTotal = (selectedTicketObj.adultPrice * adultCount) + (selectedTicketObj.childPrice * childCount);
        const addonTotal = addonOptions.reduce((total, addon) => {
            if (addons[addon.id].selected) {
                return total + addon.price * addons[addon.id].quantity;
            }
            return total;
        }, 0);
        return ticketTotal + addonTotal;
    };
    const subtotal = calculateSubtotal();
    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Success Toast */}
            {showToast && (
                <div
                    id="successToast"
                    className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out"
                >
                    <div className="flex items-center">
                        <i className="fas fa-check-circle mr-2"></i>
                        Successfully logged in
                    </div>
                </div>
            )}
            {/* Header */}
            <header className="relative">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://readdy.ai/api/search-image?query=Panoramic%20view%20of%20Coral%20Island%20Pattaya%20with%20crystal%20clear%20turquoise%20waters%2C%20white%20sandy%20beaches%2C%20lush%20green%20palm%20trees%2C%20colorful%20long-tail%20boats%2C%20people%20enjoying%20beach%20activities%2C%20stunning%20blue%20sky%20with%20few%20clouds%2C%20perfect%20tropical%20paradise%20destination&width=1440&height=600&seq=5&orientation=landscape"
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
                                            onClick={() => setShowProfileModal(true)}
                                            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faUser} className="mr-2" /> Edit Profile
                                        </button>
                                        <button
                                            onClick={() => setShowPasswordModal(true)}
                                            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faKey} className="mr-2" /> Change Password
                                        </button>
                                        <button
                                            onClick={() => setShowBookingsModal(true)}
                                            className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> My Bookings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Button 
                                    variant="outline" 
                                    transparent 
                                    onClick={() => setShowLoginModal(true)}
                                    iconName={faUser}
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                        <Button 
                            variant="yellow" 
                            onClick={() => {
                                const packageSection = document.getElementById('tourPackages');
                                if (packageSection) {
                                    packageSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            Book Now
                        </Button>
                        
                        {/* Package Comparison Modal */}
                        {showPackageModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">Package Comparison</h2>
                                        <button onClick={() => setShowPackageModal(false)} className="text-gray-500 hover:text-gray-700">
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-1"></div>
                                        {Object.entries(tickets).map(([id, ticket]) => (
                                            <div key={id} className="col-span-1">
                                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                    <h3 className="text-xl font-bold text-gray-800">{ticket.name}</h3>
                                                    <p className="text-blue-600 font-semibold mt-2">
                                                        From ฿{ticket.adultPrice.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {/* Price Section */}
                                        <div className="col-span-1 font-semibold text-gray-700 py-3">Pricing</div>
                                        {Object.entries(tickets).map(([id, ticket]) => (
                                            <div key={`${id}-price`} className="col-span-1 py-3">
                                                <p>Adult: ฿{ticket.adultPrice.toLocaleString()}</p>
                                                <p>Child: ฿{ticket.childPrice.toLocaleString()}</p>
                                            </div>
                                        ))}
                                        {/* Inclusions Section */}
                                        <div className="col-span-1 font-semibold text-gray-700 py-3">Inclusions</div>
                                        {Object.entries(tickets).map(([id, ticket]) => (
                                            <div key={`${id}-inclusions`} className="col-span-1 py-3">
                                                {ticket.inclusions.map((item, index) => (
                                                    <p key={index} className="flex items-start mb-2">
                                                        <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1" />
                                                        {item}
                                                    </p>
                                                ))}
                                            </div>
                                        ))}
                                        {/* Exclusions Section */}
                                        <div className="col-span-1 font-semibold text-gray-700 py-3">Exclusions</div>
                                        {Object.entries(tickets).map(([id, ticket]) => (
                                            <div key={`${id}-exclusions`} className="col-span-1 py-3">
                                                {ticket.exclusions.map((item, index) => (
                                                    <p key={index} className="flex items-start mb-2">
                                                        <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-2 mt-1" />
                                                        {item}
                                                    </p>
                                                ))}
                                            </div>
                                        ))}
                                        {/* Action Buttons */}
                                        <div className="col-span-1"></div>
                                        {Object.entries(tickets).map(([id, ticket]) => (
                                            <div key={`${id}-action`} className="col-span-1 text-center">
                                                <Button
                                                    variant="blue"
                                                    onClick={() => {
                                                        setShowPackageModal(false);
                                                        handlePackageSelect(id);
                                                        const packageSection = document.getElementById('tourPackages');
                                                        if (packageSection) {
                                                            packageSection.scrollIntoView({ behavior: 'smooth' });
                                                        }
                                                    }}
                                                >
                                                    Select Package
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Bookings Modal */}
                        {showBookingsModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
                                        <button onClick={() => setShowBookingsModal(false)} className="text-gray-500 hover:text-gray-700">
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                    <div className="space-y-6">
                                        {userBookings.map((booking) => (
                                            <div key={booking.id} className="border rounded-lg p-6 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-800">{booking.packageType}</h3>
                                                        <p className="text-gray-600">Booking ID: {booking.id}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                                                            booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}>
                                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
                                                        <p className="text-gray-600">Time: {booking.time}</p>
                                                        <p className="text-gray-600">Adults: {booking.adults}</p>
                                                        <p className="text-gray-600">Children: {booking.children}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Add-ons:</p>
                                                        <ul className="list-disc list-inside text-gray-600">
                                                            {booking.addons.map((addon, index) => (
                                                                <li key={index}>{addon}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t space-y-4 sm:space-y-0">
                                                    <div className="text-lg font-semibold text-blue-600">
                                                        Total: ฿{booking.totalAmount.toLocaleString()}
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {booking.status === 'upcoming' && (
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => cancelBooking(booking.id)}
                                                            >
                                                                Cancel Booking
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="success"
                                                            onClick={() => downloadVoucher(booking.id)}
                                                        >
                                                            Download Voucher
                                                        </Button>
                                                        <Button
                                                            variant="blue"
                                                            onClick={() => downloadReceipt(booking.id)}
                                                        >
                                                            Download Receipt
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </nav>
                    <div className="container mx-auto px-6 py-12 md:py-32">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience Paradise at Coral Island</h2>
                            <p className="text-xl text-blue-100 mb-8">Discover crystal-clear waters, pristine beaches, and unforgettable adventures on Thailand's most beautiful island.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="yellow"
                                    size="lg"
                                    iconName={faUmbrellaBeach}
                                    onClick={() => {
                                        const packageSection = document.getElementById('tourPackages');
                                        if (packageSection) {
                                            packageSection.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            setShowPackageModal(true);
                                        }
                                    }}
                                >
                                    Explore Packages
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    transparent
                                    iconName={faTable}
                                    onClick={() => setShowPackageModal(true)}
                                >
                                    Compare Plans
                                </Button>
                                <Button
                                    variant="blue"
                                    size="lg"
                                    iconName={faCalendarCheck}
                                    onClick={() => {
                                        const packageSection = document.getElementById('tourPackages');
                                        if (packageSection) {
                                            packageSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Book Now
                                </Button>
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
            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    <div className="lg:col-span-2 space-y-10">
                        <TicketTypes 
                            tickets={tickets}
                            selectedTicket={selectedTicket}
                            onTicketSelect={handlePackageSelect}
                        />
                        <DateTimeSelection 
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            availableTimeSlots={availableTimeSlots}
                            onDateChange={setSelectedDate}
                            onTimeChange={setSelectedTime}
                            selectedTicket={tickets[selectedTicket as keyof typeof tickets]}
                            adultCount={adultCount}
                            childCount={childCount}
                        />
                        <PaxSelection 
                            adultCount={adultCount}
                            childCount={childCount}
                            adultPrice={tickets[selectedTicket as keyof typeof tickets].adultPrice}
                            childPrice={tickets[selectedTicket as keyof typeof tickets].childPrice}
                            onAdultIncrement={() => incrementCount('adult')}
                            onAdultDecrement={() => decrementCount('adult')}
                            onChildIncrement={() => incrementCount('child')}
                            onChildDecrement={() => decrementCount('child')}
                        />
                        <AddOnSelection 
                            addons={addons}
                            addonOptions={addonOptions}
                            selectedTicket={selectedTicket}
                            totalPeople={adultCount + childCount}
                            onAddonToggle={handleAddonToggle}
                            onAddonQuantityChange={handleAddonQuantity}
                        />
                    </div>
                    {/* Booking Summary */}
                    <div className="lg:col-span-1">
                        <BookingSummaryList 
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            selectedTicket={tickets[selectedTicket as keyof typeof tickets]}
                            adultCount={adultCount}
                            childCount={childCount}
                            addons={addons}
                            addonOptions={addonOptions}
                            couponDiscount={couponDiscount}
                            onApplyCoupon={applyCoupon}
                            couponCode={couponCode}
                            onCouponChange={(code) => setCouponCode(code)}
                            couponError={couponError}
                        />
                    </div>
                </div>
                {/* Tour Information */}
                <TourInformation selectedTicket={tickets[selectedTicket as keyof typeof tickets]} />
                
            </main>
            {/* Footer */}
            <Footer />
            
            {/* Booking Modals */}
            <BookingModals 
                showLoginModal={showLoginModal}
                showProfileModal={showProfileModal}
                showPasswordModal={showPasswordModal}
                showBookingsModal={showBookingsModal}
                showPackageModal={showPackageModal}
                currentUser={currentUser}
                userBookings={userBookings}
                loginEmail={loginEmail}
                loginPassword={loginPassword}
                loginError={loginError}
                profileName={profileName}
                profileEmail={profileEmail}
                profilePhone={profilePhone}
                currentPassword={currentPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                tickets={tickets}
                onCloseLoginModal={() => setShowLoginModal(false)}
                onCloseProfileModal={() => setShowProfileModal(false)}
                onClosePasswordModal={() => setShowPasswordModal(false)}
                onCloseBookingsModal={() => setShowBookingsModal(false)}
                onClosePackageModal={() => setShowPackageModal(false)}
                onLoginEmailChange={setLoginEmail}
                onLoginPasswordChange={setLoginPassword}
                onLoginSubmit={handleLogin}
                onProfileNameChange={setProfileName}
                onProfileEmailChange={setProfileEmail}
                onProfilePhoneChange={setProfilePhone}
                onProfileSubmit={handleProfileUpdate}
                onCurrentPasswordChange={setCurrentPassword}
                onNewPasswordChange={setNewPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onPasswordSubmit={handlePasswordChange}
                onDownloadVoucher={downloadVoucher}
                onDownloadReceipt={downloadReceipt}
                onCancelBooking={cancelBooking}
                onPackageSelect={handlePackageSelect}
            />
        </div>
    );
}
export default App
