'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Card from '../base/Card';
import '../../styles/html-content.css';

interface TabContentProps {
	title: string;
	content: any;
	maxWords?: number;
}

const TabContent: React.FC<TabContentProps> = ({ 
	title,
	content, 
	maxWords = 100 
}) => {
	const [activeTab, setActiveTab] = useState(0);
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
		if (!content) {
			return { content: '', isTruncated: false };
		}
		
		const textContent = content.replace(/<[^>]*>/g, '');
		const words = textContent.split(/\s+/).filter(word => word.length > 0);
		
		if (words.length <= maxWords) {
			return { content, isTruncated: false };
		}
		
		let truncatedContent = content;
		let wordCount = 0;
		let charIndex = 0;
		let inTag = false;
		let lastSpaceIndex = 0;
		
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
		return { content: truncatedContent, isTruncated: true };
	};

	const contentEntries = Object.entries(content);
	const activeContent = contentEntries[activeTab];

	if (!activeContent) return null;

	const [activeKey, activeItem] = activeContent;
	const img_url = (activeItem as any).img_url;
	const { content: displayContent, isTruncated } = truncateContent(
		(activeItem as any).content, 
		maxWords
	);

	return (
		<>
			<Card title={`Trip your ${title}`} className="mb-8">
				{/* Tab Navigation */}
				<div className="border-b border-gray-200 mb-6">
					<nav className="-mb-px flex space-x-8 overflow-x-auto">
						{contentEntries.map(([key, item], index) => (
							<button
								key={key}
								onClick={() => setActiveTab(index)}
								className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 cursor-pointer ${
									activeTab === index
										? 'border-green-500 text-green-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								{(item as any).title}
							</button>
						))}
					</nav>
				</div>

				{/* Tab Content */}
				<div className="min-h-[200px]">
					<div className={`flex flex-col md:flex-row gap-6 ${img_url ? '' : 'md:flex-row'}`}>
						{/* Image Section - Left Side (only if image exists) */}
						{img_url && (
							<div className="md:w-1/3 flex-shrink-0">
								<Image 
									src={img_url} 
									alt={title}
									width={400}
									height={256}
									sizes="(max-width: 768px) 100vw, 33vw"
									className="w-full h-64 md:h-auto object-cover rounded-lg shadow-md"
								/>
							</div>
						)}
						
						{/* Content Section - Right Side or Full Width */}
						<div className={img_url ? "md:w-2/3 flex-1" : "w-full"}>
							<div className="html-content">
								<div 
									dangerouslySetInnerHTML={{ 
										__html: displayContent
									}} 
								/>
								{isTruncated && (
									<div className="mt-6">
										<button
											onClick={() => openModal(activeItem)}
											className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
										>
											Read Full Content
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</Card>

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

export default TabContent; 