import React from 'react';

interface CardProps {
  variant?: 'default' | 'activity' | 'package' | 'offer' | 'schedule';
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  variant = 'default',
  className = '',
  children,
  onClick,
  hoverable = false,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-lg overflow-hidden';
  
  const variantClasses = {
    default: '',
    activity: 'transition-transform hover:scale-105',
    package: 'transition-transform hover:scale-105',
    offer: 'border-t-4',
    schedule: ''
  };

  const hoverClass = hoverable ? 'cursor-pointer hover:shadow-xl transition-shadow duration-300' : '';

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
          {title && <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">{title}</h2>}
          {subtitle && <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default Card; 