import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ServiceCenterForm from './ServiceCenterForm/ServiceCenterForm';

interface ServiceCenter {
  serviceCenterId: number;
  name: string;
  location: string;
  contact: number;
}

const ServiceCenterAdminPage: React.FC = () => {
  const [serviceCenters, setServiceCenters] = useState<ServiceCenter[]>([]);
  const [editingCenter, setEditingCenter] = useState<ServiceCenter | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchServiceCenters = () => {
    let token = localStorage.getItem('token');
    fetch('http://localhost:9999/servicecenter/get/all' , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setServiceCenters)
      .catch(err => console.error(err));
  };

  const handleDelete = (id: number) => {
    let token = localStorage.getItem('token');
    fetch(`http://localhost:9999/servicecenter/delete/${id}`, {
       method: 'DELETE' ,
       headers : {
        'Authorization' : `Bearer ${token}`
       }
      })
      .then(() => fetchServiceCenters())
      .catch(err => console.error(err));

    alert("Service Center deleted successfully!");
  };

  useEffect(() => {
    fetchServiceCenters();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col><h2>Service Centers</h2></Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => { setEditingCenter(null); setShowForm(true); }}>
            + Add Service Center
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col>
            <ServiceCenterForm
              serviceCenter={editingCenter}
              onSuccess={() => { setShowForm(false); fetchServiceCenters(); }}
              onCancel={() => setShowForm(false)}
            />
          </Col>
        </Row>
      )}

      <Row>
        {serviceCenters.map((sc) => (
          <Col key={sc.serviceCenterId} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{sc.name}</Card.Title>
                <Card.Text>
                  ID: {sc.serviceCenterId}<br />
                  Location: {sc.location}<br />
                  Contact: {sc.contact}
                </Card.Text>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setEditingCenter(sc);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(sc.serviceCenterId)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiceCenterAdminPage;
