'use client';

import React, { useState, useRef, useEffect } from 'react';
import Card from '../base/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../../styles/html-content.css';

interface EventFaqsProps {
  faqs: any[];
}

const EventFaqs: React.FC<EventFaqsProps> = ({ faqs }) => {
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isOpen = (index: number) => openFaqs.includes(index);

  // Update refs array when faqs change
  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, faqs.length);
  }, [faqs.length]);

  return (
    <Card title="Frequently Asked Questions" className="mb-8">
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Accordion Header */}
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset group"
            >
              <h4 className="font-semibold text-blue-900 text-lg pr-4 group-hover:text-blue-700 transition-colors duration-200">
                {faq.title}
              </h4>
              <FontAwesomeIcon 
                icon={isOpen(idx) ? faChevronUp : faChevronDown}
                className="text-blue-600 text-sm flex-shrink-0 transition-all duration-300 ease-in-out transform group-hover:scale-110"
                style={{
                  transform: isOpen(idx) ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1)'
                }}
              />
            </button>
            
            {/* Accordion Content */}
            <div 
              ref={(el) => {
                contentRefs.current[idx] = el;
              }}
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isOpen(idx) ? `${contentRefs.current[idx]?.scrollHeight || 0}px` : '0px',
                opacity: isOpen(idx) ? 1 : 0,
                transform: isOpen(idx) ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              <div className="px-6 pb-4 pt-2 bg-gray-50">
                <div 
                  className="text-gray-700 leading-relaxed html-content text-base"
                  dangerouslySetInnerHTML={{ __html: faq.content }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EventFaqs; 