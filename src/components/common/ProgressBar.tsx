import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface Step {
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  className = ''
}) => {
  const getStepStyle = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-green-500 text-white',
          text: 'text-green-600',
          icon: faCheck
        };
      case 'current':
        return {
          circle: 'bg-blue-600 text-white',
          text: 'text-blue-600',
          icon: null
        };
      default:
        return {
          circle: 'bg-gray-300 text-gray-500',
          text: 'text-gray-500',
          icon: null
        };
    }
  };

  const progressWidth = `${(currentStep / (steps.length - 1)) * 100}%`;

  return (
    <div className={`mb-6 md:mb-10 ${className}`}>
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => {
          const style = getStepStyle(step.status);
          return (
            <div key={index} className="text-center flex-1">
              <div className={`w-6 h-6 md:w-10 md:h-10 mx-auto rounded-full ${style.circle} flex items-center justify-center`}>
                {step.status === 'completed' && style.icon ? (
                  <FontAwesomeIcon icon={style.icon} className="text-xs md:text-sm" />
                ) : (
                  <span className="font-semibold text-xs md:text-sm">{index + 1}</span>
                )}
              </div>
              <p className={`mt-1 md:mt-2 text-xs md:text-sm font-medium ${style.text}`}>{step.label}</p>
            </div>
          );
        })}
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-1.5 md:h-2 text-xs flex rounded bg-gray-200">
          <div 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300 ease-in-out"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;