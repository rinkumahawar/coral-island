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
        <div className="p-4">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card; 