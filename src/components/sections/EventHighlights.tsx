'use client';

import React from 'react';
import Card from '../base/Card';
import '../../styles/html-content.css';

interface EventHighlightsProps {
  highlight: string;
}

const EventHighlights: React.FC<EventHighlightsProps> = ({ highlight }) => (
  <Card title="Event Highlights" className="mb-8">
    <div className="prose max-w-none text-gray-700 html-content" dangerouslySetInnerHTML={{ __html: highlight }} />
  </Card>
);

export default EventHighlights; 