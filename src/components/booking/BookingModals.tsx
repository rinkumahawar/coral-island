import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTimes, 
    faUser, 
    faKey, 
    faCalendarAlt, 
    faCheck, 
    faTimes as faTimesIcon
} from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/base/Button';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
}

interface Ticket {
    name: string;
    adultPrice: number;
    childPrice: number;
    inclusions: string[];
    exclusions: string[];
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

interface BookingModalsProps {
    showLoginModal: boolean;
    showProfileModal: boolean;
    showPasswordModal: boolean;
    showBookingsModal: boolean;
    showPackageModal: boolean;
    currentUser: User | null;
    userBookings: Booking[];
    loginEmail: string;
    loginPassword: string;
    loginError: string;
    profileName: string;
    profileEmail: string;
    profilePhone: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    tickets: Record<string, Ticket>;
    onCloseLoginModal: () => void;
    onCloseProfileModal: () => void;
    onClosePasswordModal: () => void;
    onCloseBookingsModal: () => void;
    onClosePackageModal: () => void;
    onLoginEmailChange: (email: string) => void;
    onLoginPasswordChange: (password: string) => void;
    onLoginSubmit: (e: React.FormEvent) => void;
    onProfileNameChange: (name: string) => void;
    onProfileEmailChange: (email: string) => void;
    onProfilePhoneChange: (phone: string) => void;
    onProfileSubmit: (e: React.FormEvent) => void;
    onCurrentPasswordChange: (password: string) => void;
    onNewPasswordChange: (password: string) => void;
    onConfirmPasswordChange: (password: string) => void;
    onPasswordSubmit: (e: React.FormEvent) => void;
    onDownloadVoucher: (bookingId: string) => void;
    onDownloadReceipt: (bookingId: string) => void;
    onCancelBooking: (bookingId: string) => void;
    onPackageSelect: (packageId: string) => void;
}

const BookingModals: React.FC<BookingModalsProps> = ({
    showLoginModal,
    showProfileModal,
    showPasswordModal,
    showBookingsModal,
    showPackageModal,
    currentUser,
    userBookings,
    loginEmail,
    loginPassword,
    loginError,
    profileName,
    profileEmail,
    profilePhone,
    currentPassword,
    newPassword,
    confirmPassword,
    tickets,
    onCloseLoginModal,
    onCloseProfileModal,
    onClosePasswordModal,
    onCloseBookingsModal,
    onClosePackageModal,
    onLoginEmailChange,
    onLoginPasswordChange,
    onLoginSubmit,
    onProfileNameChange,
    onProfileEmailChange,
    onProfilePhoneChange,
    onProfileSubmit,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onPasswordSubmit,
    onDownloadVoucher,
    onDownloadReceipt,
    onCancelBooking,
    onPackageSelect
}) => {
    return (
        <>
            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                            <Button 
                                variant="outline" 
                                transparent 
                                onClick={onCloseLoginModal}
                                iconName={faTimes}
                            >
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <form onSubmit={onLoginSubmit} className="space-y-4" id="loginForm">
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="loginEmail"
                                    value={loginEmail}
                                    onChange={(e) => onLoginEmailChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    id="loginPassword"
                                    value={loginPassword}
                                    onChange={(e) => onLoginPasswordChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            {loginError && (
                                <div className="text-red-500 text-sm" id="loginError">
                                    {loginError}
                                </div>
                            )}
                            <Button
                                type="submit"
                                id="loginButton"
                                variant="blue"
                                fullWidth
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                            <Button 
                                variant="outline" 
                                transparent 
                                onClick={onCloseProfileModal}
                                iconName={faTimes}
                            >
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <form onSubmit={onProfileSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={profileName}
                                    onChange={(e) => onProfileNameChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileEmail}
                                    onChange={(e) => onProfileEmailChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={profilePhone}
                                    onChange={(e) => onProfilePhoneChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="blue"
                                fullWidth
                            >
                                Update Profile
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
                            <Button 
                                variant="outline" 
                                transparent 
                                onClick={onClosePasswordModal}
                                iconName={faTimes}
                            >
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <form onSubmit={onPasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => onCurrentPasswordChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => onNewPasswordChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="blue"
                                fullWidth
                            >
                                Change Password
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Package Comparison Modal */}
            {showPackageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Package Comparison</h2>
                            <Button 
                                variant="outline" 
                                transparent 
                                onClick={onClosePackageModal}
                                iconName={faTimes}
                            >
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1"></div>
                            {Object.entries(tickets).map(([id, ticket]: [string, Ticket]) => (
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
                            {Object.entries(tickets).map(([id, ticket]: [string, Ticket]) => (
                                <div key={`${id}-price`} className="col-span-1 py-3">
                                    <p>Adult: ฿{ticket.adultPrice.toLocaleString()}</p>
                                    <p>Child: ฿{ticket.childPrice.toLocaleString()}</p>
                                </div>
                            ))}
                            {/* Inclusions Section */}
                            <div className="col-span-1 font-semibold text-gray-700 py-3">Inclusions</div>
                            {Object.entries(tickets).map(([id, ticket]: [string, Ticket]) => (
                                <div key={`${id}-inclusions`} className="col-span-1 py-3">
                                    {ticket.inclusions.map((item: string, index: number) => (
                                        <p key={index} className="flex items-start mb-2">
                                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1" />
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            ))}
                            {/* Exclusions Section */}
                            <div className="col-span-1 font-semibold text-gray-700 py-3">Exclusions</div>
                            {Object.entries(tickets).map(([id, ticket]: [string, Ticket]) => (
                                <div key={`${id}-exclusions`} className="col-span-1 py-3">
                                    {ticket.exclusions.map((item: string, index: number) => (
                                        <p key={index} className="flex items-start mb-2">
                                            <FontAwesomeIcon icon={faTimesIcon} className="text-red-500 mr-2 mt-1" />
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            ))}
                            {/* Action Buttons */}
                            <div className="col-span-1"></div>
                            {Object.entries(tickets).map(([id, ticket]: [string, Ticket]) => (
                                <div key={`${id}-action`} className="col-span-1 text-center">
                                    <Button
                                        variant="blue"
                                        onClick={() => {
                                            onClosePackageModal();
                                            onPackageSelect(id);
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
                            <Button 
                                variant="outline" 
                                transparent 
                                onClick={onCloseBookingsModal}
                                iconName={faTimes}
                            >
                                <span className="sr-only">Close</span>
                            </Button>
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
                                                    onClick={() => onCancelBooking(booking.id)}
                                                >
                                                    Cancel Booking
                                                </Button>
                                            )}
                                            <Button
                                                variant="success"
                                                onClick={() => onDownloadVoucher(booking.id)}
                                            >
                                                Download Voucher
                                            </Button>
                                            <Button
                                                variant="blue"
                                                onClick={() => onDownloadReceipt(booking.id)}
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
        </>
    );
};

export default BookingModals; 