import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ServiceTypeForm from './ServicetypeForm/ServiceTypeForm';

interface ServiceType {
  serviceTypeId: number;
  serviceName: string;
  description: string;
  price: number;
}

const ServiceTypeAdminPage: React.FC = () => {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [editingType, setEditingType] = useState<ServiceType | null>(null);

  const fetchServiceTypes = () => {
    let token = localStorage.getItem('token');
    fetch('http://localhost:9999/servicetype/get/all' , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setServiceTypes)
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col><h2>Service Types</h2></Col>
      </Row>

      {editingType && (
        <Row className="mb-4">
          <Col>
            <ServiceTypeForm
              serviceType={editingType}
              onSuccess={() => {
                setEditingType(null);
                fetchServiceTypes();
              }}
              onCancel={() => setEditingType(null)}
            />
          </Col>
        </Row>
      )}

      <Row>
        {serviceTypes.map((st) => (
          <Col key={st.serviceTypeId} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{st.serviceName}</Card.Title>
                <Card.Text>
                  ID: {st.serviceTypeId}<br />
                  Description: {st.description}<br />
                  Price: ₹{st.price}
                </Card.Text>
                <Button
                  variant="warning"
                  onClick={() => setEditingType(st)}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiceTypeAdminPage;
