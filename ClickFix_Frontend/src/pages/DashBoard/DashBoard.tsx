import React from 'react';
import ServiceBookingHistoryCard from '../../components/CustomCard/ServiceBookingHistoryCard/ServiceBookingHistoryCard';
import ServiceTrackingStatusCard from '../../components/CustomCard/ServiceTrackingStatusCard/ServiceTrackingStatusCard';
import InvoiceHistoryCard from '../../components/CustomCard/InvoiceHistoryCard/InvoiceHistoryCard';
import ActivityFeedCard from '../../components/CustomCard/ActivityCard/ActivityCard';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  return (
    <Container className="py-4 align-content-center">
      {/* Responsive row of cards */}
      <Row className="g-4">
        <Col xs={12} sm={12} md={6} lg={4} >
          <div>
            <ServiceBookingHistoryCard />
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={4} >
          <div>
            <ServiceTrackingStatusCard />
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={4} >
          <div>
            <InvoiceHistoryCard />
          </div>
        </Col>
      </Row>

      {/* Carousel card below */}
      <div>
        <ActivityFeedCard />
      </div>
    </Container>
  );
};

export default Dashboard;
