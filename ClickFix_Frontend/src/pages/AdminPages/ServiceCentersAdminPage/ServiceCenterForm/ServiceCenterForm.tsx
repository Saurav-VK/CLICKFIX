import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

interface ServiceCenter {
  serviceCenterId?: number;
  name: string;
  location: string;
  contact: number;
}

interface Props {
  serviceCenter: ServiceCenter | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ServiceCenterForm: React.FC<Props> = ({ serviceCenter, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<ServiceCenter>({
    name: '',
    location: '',
    contact: 0,
  });

  useEffect(() => {
    if (serviceCenter) {
      setFormData(serviceCenter);
    }
  }, [serviceCenter]);

  const handleAdd = (e: React.FormEvent) => {
     e.preventDefault();
     let token = localStorage.getItem('token');
     fetch('http://localhost:9999/servicecenter/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' ,
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Add failed');
        return res.json();
      })
      .then(() => onSuccess())
      .catch(err => console.error(err));

    alert("Service Center added successfully!");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceCenter?.serviceCenterId) {
      console.error('Missing service center ID for update.');
      return;
    }
    
    let token = localStorage.getItem('token'); 

    fetch('http://localhost:9999/servicecenter/update', {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json' ,
        'Authorization' : `Bearer ${token}`
        },
      body: JSON.stringify({
        serviceCenterId: serviceCenter.serviceCenterId,
        ...formData,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(() => onSuccess())
      .catch(err => console.error(err));

    alert("Service Center updated successfully!");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{serviceCenter ? 'Edit Service Center' : 'Add Service Center'}</Card.Title>
        <Form onSubmit={serviceCenter ? handleUpdate : handleAdd}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              required
              type="number"
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: Number(e.target.value) })}
            />
            </Form.Group>
         <Button type="submit" variant="success" className="me-2">
            {serviceCenter ? 'Update' : 'Add'}
          </Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ServiceCenterForm;
