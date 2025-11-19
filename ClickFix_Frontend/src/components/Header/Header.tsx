import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Image, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import './Header.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 // Adjust path to your logo

const Header: React.FC = () => {

  
const [showToast, setShowToast] = useState(false);
 const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  
toast.info('You have been logged out.', {
  position: 'top-right',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'colored',
});

  setTimeout(() => {
    window.location.href = '/'; // Full reload to reset route state
  }, 500);
};


 const handleDeleteAccount = async () => {
  const userId = localStorage.getItem('userId');

  if (!userId || !token) {
    alert('Missing user credentials.');
    return;
  }

  try {
    let token = localStorage.getItem('token')
    await axios.delete(`http://localhost:9999/users/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success('User account deleted successfully.', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  } catch (error) {
    console.error('Error deleting account:', error);
    toast.error('Failed to delete user account.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    
  }
};



  return (
    <>
      <Navbar className="nav" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center gap-2 flex-wrap">
            <div className="logo-container">
              <Image src={logo} alt="ClickFix Logo" fluid roundedCircle />
            </div>
            <span className="fw-bold text-dark brand">ClickFix</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto nav-pills-custom">
              <Nav.Link as={Link} to="/home">User Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/home/vehicle">Vehicle</Nav.Link>
              <Nav.Link as={Link} to="/home/service-center">Service Center</Nav.Link>
              <Nav.Link as={Link} to="/home/book-service">New Booking</Nav.Link>
            </Nav>

            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" className="settings-toggle" id="dropdown-settings" aria-label="Settings">
                Settings
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/home/profile">Profile Update</Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteAccount}>Delete Account</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Toast Notification */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={1500}
        autohide
        className="bg-primary text-white"
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          minWidth: '250px',
        }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">ClickFix</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body>You have been logged out.</Toast.Body>
      </Toast>
    </>
  );
};

export default Header;
