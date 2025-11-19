import React from 'react';
import { Card } from 'react-bootstrap';
import ActivityFeedCarousel from '../../Carousels/ActivityFeedCarousel/ActivityFeedCarousel';

const ActivityFeedCard: React.FC = () => {
  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <Card.Title className="text-center mb-4">Activity Feed</Card.Title>
        <ActivityFeedCarousel />
      </Card.Body>
    </Card>
  );
};

export default ActivityFeedCard;
