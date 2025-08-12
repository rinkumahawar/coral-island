import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-gray-700 font-medium text-sm mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
            icon && 'pl-10',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input; 