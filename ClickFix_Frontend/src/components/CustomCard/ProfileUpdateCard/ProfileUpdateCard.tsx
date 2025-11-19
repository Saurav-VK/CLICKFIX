import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfileUpdateCard: React.FC = () => {
const userId = localStorage.getItem('userId');

if (!token || !userId) {
  console.error("Missing token or userId");
  return <Alert variant="danger">You are not logged in. Please log in again.</Alert>;
}


  const [formData, setFormData] = useState({
    userId: userId,
    name: '',
    email: '',
    phone: '',
    address: '',
    passwordHash: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    passwordHash: false,
  });

  const [success, setSuccess] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const validateFields = () => {
    const nameValid = /^[A-Za-z ]{2,50}$/.test(formData.name);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const phoneValid = /^[6-9][0-9]{9}$/.test(formData.phone);
    const addressValid = formData.address.length >= 5 && formData.address.length <= 100;
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.passwordHash);

    setErrors({
      name: !nameValid,
      email: !emailValid,
      phone: !phoneValid,
      address: !addressValid,
      passwordHash: !passwordValid,
    });

    return nameValid && emailValid && phoneValid && addressValid && passwordValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateFields();
    console.log('Validation result:', isValid);
    console.log('Form data:', formData);

    if (!isValid) {
      alert('Please fix the validation errors before submitting.');
      return;
    }

    try {
      let token = localStorage.getItem('token');
      await axios.put(`http://localhost:9999/users/profile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      setSuccess(true);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="p-4 shadow-sm">
            <Card.Title className="mb-3 text-center">Profile Update</Card.Title>
            {success && <Alert variant="success">Profile updated successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  Name must contain only letters and spaces (2–50 characters).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  Phone number must be a valid 10-digit number starting with 6–9.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  Address must be between 5 and 100 characters.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="passwordHash">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter a secure password"
                  value={formData.passwordHash}
                  onChange={handleChange}
                  isInvalid={errors.passwordHash}
                />
                <Form.Control.Feedback type="invalid">
                  Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary">
                  Update Profile
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileUpdateCard;
