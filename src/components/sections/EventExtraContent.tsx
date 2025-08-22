'use client';

import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Card from '../base/Card';
import '../../styles/html-content.css';

interface EventExtraContentProps {
  extraContent: any;
  maxWords: number;
}

const EventExtraContent: React.FC<EventExtraContentProps> = ({ extraContent, maxWords }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const truncateContent = (content: string, maxWords: number) => {
    // Handle null or undefined content
    if (!content) {
      return { content: '', isTruncated: false };
    }
    
    // Remove HTML tags for word counting
    const textContent = content.replace(/<[^>]*>/g, '');
    const words = textContent.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length <= maxWords) {
      return { content, isTruncated: false };
    }
    
    // Find the position to truncate while preserving HTML structure
    const truncatedWords = words.slice(0, maxWords);
    const truncatedText = truncatedWords.join(' ');
    
    // Find the closest position in the original HTML content
    let truncatedContent = content;
    let currentWordCount = 0;
    let lastSpaceIndex = 0;
    
    // Remove HTML tags temporarily for counting
    const tempContent = content.replace(/<[^>]*>/g, '');
    const tempWords = tempContent.split(/\s+/).filter(word => word.length > 0);
    
    if (tempWords.length > maxWords) {
      // Find the position in original content where we reach maxWords
      let wordCount = 0;
      let charIndex = 0;
      let inTag = false;
      
      for (let i = 0; i < content.length; i++) {
        if (content[i] === '<') inTag = true;
        if (content[i] === '>') inTag = false;
        
        if (!inTag && content[i] === ' ') {
          const word = content.substring(lastSpaceIndex, i).trim();
          if (word.length > 0) {
            wordCount++;
            if (wordCount >= maxWords) {
              charIndex = i;
              break;
            }
          }
          lastSpaceIndex = i;
        }
      }
      
      truncatedContent = content.substring(0, charIndex) + '...';
    }
    
    return { content: truncatedContent, isTruncated: true };
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(extraContent).map(([key, item], idx) => {
          const { content: displayContent, isTruncated } = truncateContent((item as any).content, maxWords);
          
          return (
            <Card key={idx} title={(item as any).title} fullHeight>
              <div className="html-content flex flex-col h-full">
                <div 
                  className="flex-1"
                  dangerouslySetInnerHTML={{ 
                    __html: displayContent
                  }} 
                />
                {isTruncated && (
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => openModal(item)}
                      className="text-green-600 hover:text-green-800 font-medium underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Read More
                    </button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Responsive Modal */}
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            {/* Desktop: Center Modal */}
            <div className="hidden md:flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl h-[80vh] transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all flex flex-col">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {selectedItem?.title}
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-400" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="html-content">
                      <div dangerouslySetInnerHTML={{ __html: selectedItem?.content }} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>

            {/* Mobile: Bottom Sheet */}
            <div className="md:hidden absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-x-0 bottom-0 flex max-w-full">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-y-full"
                  enterTo="translate-y-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-y-0"
                  leaveTo="translate-y-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-full h-[85vh] bg-white rounded-t-3xl shadow-2xl">
                    {/* Handle Bar */}
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200">
                      <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                        {selectedItem?.title}
                      </Dialog.Title>
                      <button
                        onClick={closeModal}
                        className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                      >
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                      </button>
                    </div>
                    
                    {/* Content */}
                    <div className="h-full overflow-y-auto px-6 py-4">
                      <div className="html-content">
                        <div dangerouslySetInnerHTML={{ __html: selectedItem?.content }} />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EventExtraContent; 