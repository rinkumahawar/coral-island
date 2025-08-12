import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg p-6 w-full mx-4 max-h-[90vh] overflow-y-auto ${sizeClasses[size]} ${className}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <Button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <i className="fas fa-times"></i>
          </Button>
        </div>
        
        <div className="space-y-6">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end pt-4 border-t mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 