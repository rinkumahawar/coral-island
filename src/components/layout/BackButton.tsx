"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton: React.FC = () => {
    const router = useRouter();

    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <button 
            onClick={handleBack}
            className="text-white hover:text-blue-200 transition-colors flex items-center md:hidden"
            aria-label="Go back"
        >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
            <span className="text-sm">Back</span>
        </button>
    );
};

export default BackButton; 