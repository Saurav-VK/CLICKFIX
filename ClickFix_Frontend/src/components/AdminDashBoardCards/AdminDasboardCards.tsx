
import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaCar, FaCalendarCheck, FaTools, FaListAlt, FaFileInvoice } from 'react-icons/fa';
import './AdminDashboardCards.css';
import { useNavigate } from 'react-router-dom';

const cardData = [
  {
    icon: <FaUser size={40} className="admin-card-icon" />,
    id : 'users',
    title: 'Users',
    description: 'Manage user accounts and permissions.',
    buttonLabel: 'View Users',
  },
  {
    icon: <FaCar size={40} className="admin-card-icon" />,
    id : 'vehicles',
    title: 'Vehicles',
    description: 'View and update vehicle information.',
    buttonLabel: 'Manage Vehicles',
  },
  {
    icon: <FaCalendarCheck size={40} className="admin-card-icon" />,
    id : 'bookings' ,
    title: 'Bookings',
    description: 'Review and manage service bookings.',
    buttonLabel: 'Check Bookings',
  },
  {
    icon: <FaCalendarCheck size={40} className="admin-card-icon" />,
    id : 'mechanics' ,
    title: 'Mechanics',
    description: 'Edit and maintain mechanic details.',
    buttonLabel: 'Mechanics',
  },
  {
    icon: <FaTools size={40} className="admin-card-icon" />,
    id : 'service-centers',
    title: 'Service Centers',
    description: 'Edit and maintain service center details.',
    buttonLabel: 'Service Centers',
  },
  {
    icon: <FaListAlt size={40} className="admin-card-icon" />,
    id : 'servicetypes',
    title: 'Service Types',
    description: 'Configure available service types.',
    buttonLabel: 'Service Types',
  },
  {
    icon: <FaFileInvoice size={40} className="admin-card-icon" />,
    id : 'invoices',
    title: 'Invoices',
    description: 'Access and manage invoice records.',
    buttonLabel: 'View Invoices',
  },
];


const AdminDashboardCards = () => {
  
  const navigate = useNavigate();
  
  const handleCardClick = (id : string) => {
    if(id === 'bookings') {
       navigate("/admin/bookings");
    } else if(id === 'users'){
      navigate('/admin/users');
    } else if(id === 'mechanics') {
       navigate("/admin/mechanics");
    } else if(id === 'service-centers') {
       navigate("/admin/service-centers");
    } else if(id === 'servicetypes') {
       navigate("/admin/servicetypes");
    } else if(id === 'invoices') {
      navigate('/admin/invoice');
    } else if(id === "vehicles") {
      navigate("/admin/vehicles");
    }
  }

  return (
    <Container className="admin-dashboard-cards py-4">
      <Row>
        {cardData.map((card, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} className="mb-4">
            <Card className="admin-card h-100 text-center p-3 shadow-sm">
              <div className="mb-3">{card.icon}</div>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
              <Button variant="primary" onClick={() => handleCardClick(card.id)}>{card.buttonLabel}</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboardCards;
