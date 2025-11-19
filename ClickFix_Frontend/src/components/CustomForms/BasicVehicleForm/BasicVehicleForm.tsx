import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './BasicVehicleForm.css';
import type { Vehicle } from '../../../types/vehicle.types';
import axios from 'axios';

type FormErrors = {
  registrationNumber?: string;
  year?: string;
  make?: string;
  model?: string;
};

type VehicleFormProps = {
  initialData?: Vehicle
  onSubmit: (data: any) => Promise<void>;
  onSuccess?: () => void;
  mode?: 'add' | 'edit';
};

//-------------------------------------------------------------------------------------------------
function VehicleForm({
  initialData,
  onSubmit,
  onSuccess,
  mode
}: VehicleFormProps) {
  const sessionUserId = localStorage.getItem('userId') || '';
  const [formData, setFormData] = useState({
    userId: 0,
    url: '',
    make: '',
    model: '',
    registrationNumber: '',
    year: ''
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      userId: parseInt(sessionUserId)
    }));
  }, [sessionUserId]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  // const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);
  

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // cleanup
    }
  }, [imageFile]);

  const imageUpload = async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      console.log("entered imageUpload");
      let token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:9999/vehicle-api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' ,
          'Authorization' : `Bearer ${token}`
        }
      });

      return response.data.url;

    } catch (error) {
      console.error('Image upload failed:', error);
      // Optionally show a toast or error message to the user
    }
  };

  //----------------------------------------------------------------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  
    let newErrors = { ...errors };

    if (name === 'make') {
      const makeErrors = validateMake(value);
      if (!makeErrors.make) {
        delete newErrors.make;
      } else {
        newErrors.make = makeErrors.make;
      }
    }
    
    if (name === 'model') {
      const modelErrors = validateModel(value);
      if (!modelErrors.model) {
        delete newErrors.model;
      } else {
        newErrors.model = modelErrors.model;
      }
    }
    
  
    if (name === 'registrationNumber') {
      const regErrors = validateRegNumber(value);
      if (!regErrors.registrationNumber) {
        delete newErrors.registrationNumber;
      }
    }
  
    if (name === 'year') {
      const yearErrors = validateYear(value);
      if (!yearErrors.year) {
        delete newErrors.year;
      }
    }
  
    setErrors(newErrors);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  //----------------------------------------------------------------------------------------------------------------
  //custome validations
  const validateMake = (value: string): FormErrors => {
    const errors: FormErrors = {};
    if (!value.trim()) {
      errors.make = 'Make is required.';
    }
    return errors;
  };
  const validateModel = (value: string): FormErrors => {
    const errors: FormErrors = {};
    if (!value.trim()) {
      errors.model = 'Model is required.';
    }
    return errors;
  };
  
  
  const validateRegNumber = (value:string): FormErrors => {
    const newErrors: FormErrors = {};
    const regex = /^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/;
    if (!regex.test(value)) {
      newErrors.registrationNumber = 'Registration Number must have capital letters.';
    }
    return newErrors;
  };

  const validateYear = (value:string): FormErrors => {
    const newErrors: FormErrors = {};
    const currentYear = new Date().getFullYear();
    const year = parseInt(value, 10);
    if (!year || year < 1990 || year > currentYear) {
      newErrors.year = `Year must be between 1990 and ${currentYear}.`;
    }
    return newErrors;
  };

  //----------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------
  //form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const makeErrors = validateMake(formData.make);
    const modelErrors = validateModel(formData.model);
    const regErrors = validateRegNumber(formData.registrationNumber);
    const yearErrors = validateYear(formData.year);
    
    const combinedErrors = {
      ...makeErrors,
      ...modelErrors,
      ...regErrors,
      ...yearErrors
    };

    if (Object.keys(combinedErrors).length > 0) {
      setErrors(combinedErrors);
      // setValidated(true);
      return;
    }

    setErrors({});

    try {
      let updatedFormDate = { ...formData };
      if (imageFile) {
        const imageUrl = await imageUpload(imageFile);
        if (imageUrl) {
          updatedFormDate.url = imageUrl;
        }
      }
      console.log(updatedFormDate);

      onSubmit(updatedFormDate);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  //-----------------------------------------------------------------------------------------------------------------------------
  return (
        <Form noValidate  onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId="formFile" className="mb-3">
              <Form.Label className='px-1'>Upload an image</Form.Label>
              <Form.Control
                type="file"
                accept='image/*'
                placeholder="Image Name"
                name="imageFile"
                onChange={handleFileChange}
              />
              {preview && (
                <div className="d-flex justify-content-center">
                  <img src={preview} alt="Preview" className="modal-preview img-thumbnail" />
                </div>

              )}
            </Form.Group>
          </Row>

          <div className="p-2 border border-dark rounded">
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="make">
                <Form.Label>Make/Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Make/Brand"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  isInvalid={!!errors.make}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.make}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="model">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  isInvalid={!!errors.model}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.model}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="registrationNumber">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Registration Number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.registrationNumber}
                  className={`${errors.registrationNumber ? 'is-invalid' : ''} form-control`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.registrationNumber || 'Invalid registration number.'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  isInvalid={!!errors.year}
                  className={`${errors.year ? 'is-invalid' : ''} form-control`}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.year || 'Invalid year.'}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </div>

          <br />
          <Row className="p-1">
            <Button type="submit" style={{ width: '80%' }} className="mx-auto">
              {mode === 'edit' ? 'Update' : 'Submit'}
            </Button>
          </Row>
        </Form>

  );
}

export default VehicleForm;
