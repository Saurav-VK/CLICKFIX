import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import MechanicForm from './MechanicForm/MechanicForm';

interface Mechanic {
  mechanicId: number;
  serviceCenterId: number;
  name: string;
  expertise: string;
}

const MechanicsAdminPage: React.FC = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [editingMechanic, setEditingMechanic] = useState<Mechanic | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMechanics = () => {
    let token = localStorage.getItem('token');
    fetch('http://localhost:9999/mechanic/get/all'  , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setMechanics)
      .catch(err => console.error(err));
  };

  const handleDelete = (mechanicId: number) => {
    let token = localStorage.getItem('token');
    fetch(`http://localhost:9999/mechanic/delete/id/${mechanicId}`, { 
      method: 'DELETE' ,
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(() => fetchMechanics())
      .catch(err => console.error(err));

    alert("Mechanic deleted successfully!");
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col><h2>Mechanics</h2></Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => { setEditingMechanic(null); setShowForm(true); }}>
            + Add Mechanic
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Row className="mb-4">
          <Col>
            <MechanicForm
              mechanic={editingMechanic}
              onSuccess={() => { setShowForm(false); fetchMechanics(); }}
              onCancel={() => setShowForm(false)}
            />
          </Col>
        </Row>
      )}

      <Row>
        {mechanics.map((mechanic) => (
          <Col key={mechanic.mechanicId} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{mechanic.name}</Card.Title>
                <Card.Text>
                  ID: {mechanic.mechanicId}<br />
                  Expertise: {mechanic.expertise}<br />
                  Service Center ID: {mechanic.serviceCenterId}
                </Card.Text>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => {
                    setEditingMechanic(mechanic);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(mechanic.mechanicId)}>
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

export default MechanicsAdminPage;