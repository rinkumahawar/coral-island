'use client';

import React from 'react';
import Card from '../base/Card';

interface EventOverviewProps {
  content: string;
}

const EventOverview: React.FC<EventOverviewProps> = ({ content }) => (
  <Card title="Overview" className="mb-8">
    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
  </Card>
);

export default EventOverview; 