import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
  className?: string;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000,
  className,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle',
  };

  return (
    <div className={cn(
      'fixed top-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out',
      types[type],
      className
    )}>
      <div className="flex items-center">
        <i className={`fas ${icons[type]} mr-2`}></i>
        {message}
      </div>
    </div>
  );
};

export default Toast; 