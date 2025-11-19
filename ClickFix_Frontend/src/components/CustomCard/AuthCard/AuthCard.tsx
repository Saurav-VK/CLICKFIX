import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

interface Field {
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}

interface AuthCardProps {
  title: string;
  fields: Field[];
  buttonLabel: string;
  onSubmit: (formData: Record<string, string>) => void;
  footerText: string;
  onFooterClick: () => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  fields,
  buttonLabel,
  onSubmit,
  footerText,
  onFooterClick,
}) => {
  const isSignup = title === 'Sign Up for ClickFix';

  const initialFormState = fields.reduce((acc, field) => {
    acc[field.label] = '';
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState<Record<string, string>>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'Name':
        if (!/^[A-Za-z ]{2,50}$/.test(value)) return 'Name must contain only letters and spaces (2–50 characters)';
        break;
      case 'Email':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Invalid email format';
        break;
      case 'Phone':
        if (!/^[6-9]\d{9}$/.test(value)) return 'Phone must be a valid 10-digit number starting with 6-9';
        break;
      case 'Address':
        if (value.length < 5 || value.length > 100) return 'Address must be between 5 and 100 characters';
        break;
      case 'Password':
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/.test(value))
         ' be at least 7 characters and include uppercase, lowercase, number, and special character';
        break;
      default:
        break;
    }
    return '';
  };
    

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
  
    fields.forEach(({ label }) => {
      const value = formData[label];
  
      if (!value) {
        newErrors[label] = `${label} is required`;
      } else {
        switch (label) {
          case 'Name':
            if (!/^[A-Za-z ]{2,50}$/.test(value)) {
              newErrors[label] = 'Name must contain only letters and spaces (2–50 characters)';
            }
            break;
          case 'Email':
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
              newErrors[label] = 'Invalid email format';
            }
            break;
          case 'Phone':
            if (!/^[6-9]\d{9}$/.test(value)) {
              newErrors[label] = 'Phone must be a valid 10-digit number starting with 6-9';
            }
            break;
          case 'Address':
            if (value.length < 5 || value.length > 100) {
              newErrors[label] = 'Address must be between 5 and 100 characters';
            }
            break;
          case 'Password':
            if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
            ) {
              newErrors[label] =
                'Password must contain uppercase, lowercase, number, and special character and should be atleast 7 charchters';
            }
            break;
          default:
            break;
        }
      }
    });
  
    return newErrors;
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
      console.log("Register payload:", {
        name: formData.Name,
        email: formData.Email,
        phone: formData.Phone,
        address: formData.Address,
        passwordHash: formData.Password
      });
    }
  };

  return (
    <Card className="auth-card p-4 w-100">
      <Card.Title className="mb-4 text-center">{title}</Card.Title>
      <Form onSubmit={handleSubmit} noValidate>
        {isSignup ? (
          <>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName" className="mb-3 text-start">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    placeholder="Enter name"
                    autoComplete="name"
                    value={formData['Name']}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors['Name']}
                  />
                  <Form.Control.Feedback type="invalid">{errors['Name']}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail" className="mb-3 text-start">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    placeholder="Enter email"
                    autoComplete="email"
                    value={formData['Email']}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors['Email']}
                  />
                  <Form.Control.Feedback type="invalid">{errors['Email']}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formPhone" className="mb-3 text-start">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="Phone"
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    value={formData['Phone']}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors['Phone']}
                  />
                  <Form.Control.Feedback type="invalid">{errors['Phone']}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPassword" className="mb-3 text-start">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    placeholder="Enter password"
                    autoComplete="new-password"
                    value={formData['Password']}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors['Password']}
                  />
                  <Form.Control.Feedback type="invalid">{errors['Password']}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formAddress" className="mb-4 text-start">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="Address"
                placeholder="Enter address"
                autoComplete="street-address"
                value={formData['Address']}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors['Address']}
              />
              <Form.Control.Feedback type="invalid">{errors['Address']}</Form.Control.Feedback>
            </Form.Group>
          </>
        ) : (
          fields.map((field, idx) => (
            <Form.Group controlId={`form${field.label}`} key={idx} className="mb-3 text-start">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                name={field.label}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                value={formData[field.label]}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors[field.label]}
              />
              <Form.Control.Feedback type="invalid">{errors[field.label]}</Form.Control.Feedback>
            </Form.Group>
          ))
        )}

        <Button variant="primary" type="submit" className="w-100 mb-3">
          {buttonLabel}
        </Button>

        <div className="text-center">
          <small>
            {footerText}{' '}
            <span className="text-primary" role="button" onClick={onFooterClick}>
              {isSignup ? 'Login' : 'Sign Up'}
            </span>
          </small>
        </div>
      </Form>
    </Card>
  );
};

export default AuthCard;
