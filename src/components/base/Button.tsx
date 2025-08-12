import React from 'react';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow'  | 'danger' | 'success' | 'orange' | 'blue' | 'purple' | 'pink' | 'gray' | 'black';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconName?: IconDefinition;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  transparent?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconName,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  transparent = false,
  ...props
}) => {
  const baseClasses = 'rounded-sm font-bold transition duration-300 whitespace-nowrap cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'border border-gray-300 text-gray-600 hover:bg-gray-50',
    yellow: 'bg-yellow-500 hover:bg-yellow-400 text-blue-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    orange: 'bg-orange-500 hover:bg-orange-400 text-white',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    purple: 'bg-purple-600 hover:bg-purple-700 text-white',
    pink: 'bg-pink-600 hover:bg-pink-700 text-white',
    gray: 'bg-gray-600 hover:bg-gray-700 text-white',
    black: 'bg-black hover:bg-gray-800 text-white',
  };

  const getTransparentVariant = (variant: ButtonProps['variant']) => {
    const colorMap: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: 'border-blue-500 text-blue-500 hover:bg-blue-50',
      secondary: 'border-gray-500 text-gray-500 hover:bg-gray-50',
      outline: 'border-gray-500 text-gray-500 hover:bg-gray-50',
      yellow: 'border-yellow-500 text-yellow-500 hover:bg-yellow-50',
      success: 'border-green-500 text-green-500 hover:bg-green-50',
      danger: 'border-red-500 text-red-500 hover:bg-red-50',
      orange: 'border-orange-500 text-orange-500 hover:bg-orange-50',
      blue: 'border-blue-500 text-blue-500 hover:bg-blue-50',
      purple: 'border-purple-500 text-purple-500 hover:bg-purple-50',
      pink: 'border-pink-500 text-pink-500 hover:bg-pink-50',
      gray: 'border-gray-500 text-gray-500 hover:bg-gray-50',
      black: 'border-black text-black hover:bg-black',
    };
    
    return `${transparent ? 'bg-transparent border-2' : ''} ${colorMap[variant || 'secondary']}`;
  };

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-8',
    lg: 'py-4 px-10 text-lg'
  };

  const renderIcon = () => {
    if (icon) {
      return <span className={iconPosition === 'left' ? 'mr-2' : 'ml-2'}>{icon}</span>;
    }
    
    if (iconName) {
      return (
        <FontAwesomeIcon 
          icon={iconName} 
          className={iconPosition === 'left' ? 'mr-2' : 'ml-2'} 
        />
      );
    }
    
    return null;
  };

  return (
    <button
      className={cn(
        baseClasses,
        transparent ? getTransparentVariant(variant) : variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button; 