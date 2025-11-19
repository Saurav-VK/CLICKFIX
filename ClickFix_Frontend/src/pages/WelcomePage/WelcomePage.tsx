import React, { useState } from 'react';
import { Container, Row, Col, Image, Collapse, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import AuthCard from '../../components/CustomCard/AuthCard/AuthCard';
import WelcomeCarousel from '../../components/Carousels/WelcomeCarousel/WelcomeCarousel';
import './WelcomePage.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(true);

  const loginFields: Field[] = [
    { label: 'Email', name : 'email', type: 'email', placeholder: 'Enter email', autoComplete: 'username' },
    { label: 'Password',name : 'passwordHash', type: 'password', placeholder: 'Enter password', autoComplete: 'current-password' },
  ];

  const signupFields: Field[] = [
    { label: 'Name', name : 'name', type: 'text', placeholder: 'Enter name', autoComplete: 'name' },
    { label: 'Email', name : 'email', type: 'email', placeholder: 'Enter email', autoComplete: 'email' },
    { label: 'Phone', name : 'phone', type: 'tel', placeholder: 'Enter phone number', autoComplete: 'tel' },
    { label: 'Address', name : 'address', type: 'text', placeholder: 'Enter address', autoComplete: 'street-address' },
    { label: 'Password', name : 'passwordHash', type: 'password', placeholder: 'Enter password', autoComplete: 'new-password' },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    console.log('Form submitted:', formData);

    if (isLogin) {
      const { Email, Password } = formData;

      if (Email === 'admin@clickfix.com' && Password === 'Admin@1234') {
          const response = await axios.post('http://localhost:9999/users/login', {
          email: Email,
          passwordHash: Password,
        });

        const token = response.data?.token;


        if (!token || token.split('.').length !== 3) {
          console.error('Invalid or missing token:', token);
          alert('Login failed: Invalid token received.');
          return;
        }
        console.log('Login response token:', token);
        localStorage.setItem('token', token);
        try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = JSON.parse(atob(base64));
        console.log('Decoded JWT payload:', jsonPayload);
        localStorage.setItem('userId', jsonPayload.userId);
        localStorage.setItem('userRole', 'admin');
        navigate('/admin');
        return;
        } catch(err) {
          console.log(err);
        }
      }

      try {
        const response = await axios.post('http://localhost:9999/users/login', {
          email: Email,
          passwordHash: Password,
        });

        const token = response.data?.token;
        console.log('Login response token:', token);

        if (!token || token.split('.').length !== 3) {
          console.error('Invalid or missing token:', token);
          alert('Login failed: Invalid token received.');
          return;
        }

        localStorage.setItem('token', token);

        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = JSON.parse(atob(base64));
          console.log('Decoded JWT payload:', jsonPayload);

          localStorage.setItem('userId', jsonPayload.userId);
          localStorage.setItem('userRole', 'user');
          navigate('/home');
        } catch (err) {
          console.error('Failed to decode token:', err);
          alert('Login failed: Unable to decode token.');
        }
      } catch (error: any) {
        console.error('Login error:', error);
        alert(error?.response?.data || 'Login failed');
      }
    } else {
      const { Name, Email, Phone, Address, Password } = formData;

      try {
        await axios.post('http://localhost:9999/users/register', {
          name: Name,
          email: Email,
          phone: Phone,
          address: Address,
          passwordHash: Password,
        });

        toast.success('Registration successful! Welcome aboard 🎉', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        
        setOpen(false);
        setTimeout(() => {
          setIsLogin(true);
          setOpen(true);
        }, 300);
      } catch (error: any) {
        console.error('Signup error:', error);
        

    toast.error('Registration failed. Please try again.', {
      position: 'top-right',
      autoClose: 2000,
      theme: 'colored',
    });

      }
    }
  };

  const handleFormSwitch = () => {
    setOpen(false);
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setOpen(true);
    }, 300);
  };

  return (
    <div className="welcome-bg">
      <Container className="welcome-content py-5">
        <Card className="p-4 shadow-lg w-100">
          <Row className="align-items-center w-100">
            {/* Left Side: Logo and Carousel */}
            <Col xs={12} md={6} className="text-center left-side">
              <div className="logo-moving">
                <Image src={logo} roundedCircle fluid className="logo" />
                <h1 className="heading">ClickFix</h1>
              </div>
              <WelcomeCarousel />
            </Col>

            {/* Right Side: Auth Card */}
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Collapse in={open} dimension="height">
                <div id="auth-collapse-wrapper">
                  <AuthCard
                    key={isLogin ? 'login' : 'signup'}
                    title={isLogin ? 'Login to ClickFix' : 'Sign Up for ClickFix'}
                    fields={isLogin ? loginFields : signupFields}
                    buttonLabel={isLogin ? 'Login' : 'Sign Up'}
                    onSubmit={handleSubmit}
                    footerText={isLogin ? "Don't have an account?" : 'Already have an account?'}
                    onFooterClick={handleFormSwitch}
                  />
                </div>
              </Collapse>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Welcome;
