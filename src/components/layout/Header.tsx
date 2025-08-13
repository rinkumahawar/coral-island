import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faUsers,
    faShieldAlt,
    faChevronRight,
    faHome
} from '@fortawesome/free-solid-svg-icons';
import BackButton from '@/components/layout/BackButton';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface HeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    description?: string;
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs = [], title, description }) => {
    return (
        <header className="relative">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
            </div>
            <div className="relative z-10">
                <nav className="container mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                    <div className="flex items-center w-full md:w-auto justify-between">
                        <BackButton />
                        <Link href="/" className="hover:opacity-90 transition-opacity">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{ process.env.NEXT_PUBLIC_PAGE_NAME}</div>
                        </Link>
                        <div className="w-8 md:hidden"></div> {/* Spacer for mobile layout */}
                    </div>
                </nav>

                <div className="container mx-auto px-4 sm:px-6 py-6 md:py-16">
                    <div className="max-w-2xl">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">{title || process.env.NEXT_PUBLIC_PAGE_DESCRIPTION}</h1>
                         
                        <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-6">
                            <div className="flex items-center text-white">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1 md:mr-2 text-sm" />
                                <span className="text-xs sm:text-sm">4.9/5 Rating</span>
                            </div>
                            <div className="flex items-center text-white">
                                <FontAwesomeIcon icon={faUsers} className="text-blue-300 mr-1 md:mr-2 text-sm" />
                                <span className="text-xs sm:text-sm">10,000+ Happy Customers</span>
                            </div>
                            <div className="flex items-center text-white">
                                <FontAwesomeIcon icon={faShieldAlt} className="text-green-400 mr-1 md:mr-2 text-sm" />
                                <span className="text-xs sm:text-sm">100% Secure Booking</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <div className="container mx-auto px-4 sm:px-6 pb-4">
                        <nav className="flex items-center space-x-2 text-sm text-white/80">
                            <Link href="/" className="hover:text-white transition-colors flex items-center">
                                <FontAwesomeIcon icon={faHome} className="mr-1 text-xs" />
                                <span>Home</span>
                            </Link>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <React.Fragment key={index}>
                                    <FontAwesomeIcon icon={faChevronRight} className="text-white/60 text-xs" />
                                    {breadcrumb.href ? (
                                        <Link 
                                            href={breadcrumb.href}
                                            className="hover:text-white transition-colors"
                                        >
                                            {breadcrumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-white font-medium">{breadcrumb.label}</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 