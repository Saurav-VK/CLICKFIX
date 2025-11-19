import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { BiFontSize } from 'react-icons/bi';

interface ServiceType {
  serviceTypeId: number;
  serviceName: string;
  description: string;
  price: number;
}

interface Props {
  serviceType: ServiceType;
  onSuccess: () => void;
  onCancel: () => void;
}

const ServiceTypeForm: React.FC<Props> = ({ serviceType, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<ServiceType>(serviceType);

  useEffect(() => {
    setFormData(serviceType);
  }, [serviceType]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:9999/servicetype/update', {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json' ,
         'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(() => onSuccess())
      .catch(err => console.error(err));

    alert("Service Type updated successfully!");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Edit Service Type : {serviceType.serviceName}</Card.Title>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </Form.Group>

          <Button type="submit" variant="success" className="me-2">Update</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ServiceTypeForm;
