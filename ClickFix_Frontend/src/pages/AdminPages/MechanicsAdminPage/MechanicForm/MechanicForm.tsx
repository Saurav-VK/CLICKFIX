
import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

interface Mechanic {
  mechanicId?: number;
  serviceCenterId: number;
  name: string;
  expertise: string;
}

interface ServiceCenter {
  serviceCenterId: number;
  name: string;
  location: string;
  contact: number;
}

interface Props {
  mechanic: Mechanic | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const MechanicForm: React.FC<Props> = ({ mechanic, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<Mechanic>({
    name: '',
    expertise: '',
    serviceCenterId: 0,
  });

  const [serviceCenters, setServiceCenters] = useState<ServiceCenter[]>([]);


  useEffect(() => {
    let token = localStorage.getItem('token');
    fetch('http://localhost:9999/servicecenter/get/all' , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setServiceCenters)
      .catch(err => console.error(err));

    if (mechanic) {
      setFormData(mechanic);
      console.log(mechanic);
    }
  }, [mechanic]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  
    const postBody = {
      name: formData.name,
      expertise: formData.expertise,
      serviceCenterId: formData.serviceCenterId
    };
    
    let token = localStorage.getItem('token');

    fetch('http://localhost:9999/mechanic/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' , 
        'Authorization'  :`Bearer ${token}`
      },
      body: JSON.stringify(postBody),
    })
      .then(res => {
        if (!res.ok) throw new Error('Add failed');
        return res.json();
      })
      .then(() => onSuccess())
      .catch(err => console.error(err));

    alert("Mechanic added successfully!");
  };

  
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!mechanic?.mechanicId) {
      console.error('Missing mechanic ID for update.');
      return;
    }
    
    let token = localStorage.getItem('token');

    fetch('http://localhost:9999/mechanic/update', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json' ,
        'Authorization' : `Bearer ${token}`   
      },
      body: JSON.stringify({
        mechanicId: mechanic.mechanicId, // ✅ from props only
        name: formData.name,
        expertise: formData.expertise,
        serviceCenterId: formData.serviceCenterId
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(() => onSuccess())
      .catch(err => console.error(err));

    alert("Mechanic updated successfully!");
  };
  
  

  return (
    <Card>
      <Card.Body>
        <Card.Title>{mechanic ? 'Edit Mechanic' : 'Add Mechanic'}</Card.Title>
        <Form onSubmit={mechanic ? handleUpdate : handleAdd}>
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
    <Form.Label>Expertise</Form.Label>
    <Form.Control
      required
      type="text"
      value={formData.expertise}
      onChange={e => setFormData({ ...formData, expertise: e.target.value })}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Service Center</Form.Label>
    <Form.Select
      required
      value={formData.serviceCenterId}
      onChange={e => setFormData({ ...formData, serviceCenterId: Number(e.target.value) })}
    >
      <option value="">Select Service Center</option>
      {serviceCenters.map((sc) => (
        <option key={sc.serviceCenterId} value={sc.serviceCenterId}>
          {sc.name} ({sc.location})
        </option>
      ))}
    </Form.Select>
  </Form.Group>

  <Button type="submit" variant="success" className="me-2">
    {mechanic ? 'Update' : 'Add'}
  </Button>
  <Button variant="secondary" onClick={onCancel}>Cancel</Button>
</Form>

      </Card.Body>
    </Card>
  );
};

export default MechanicForm;
