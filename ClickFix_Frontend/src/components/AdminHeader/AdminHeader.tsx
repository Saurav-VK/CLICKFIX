
import React, { useState } from 'react';
import { Navbar, Container, Dropdown, Image, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import './AdminHeader.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminHeader: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
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
      navigate('/');
    }, 500);
  };

  return (
    <>
      <Navbar className="admin-nav bg-primary" expand="lg">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <Image src={logo} alt="ClickFix Logo" height={60} roundedCircle />
            <h1 className="admin-heading mb-0">Admin Dashboard</h1>
          </div>

          <Dropdown align="end">
            <Dropdown.Toggle variant="secondary" className="settings-toggle" id="dropdown-settings">
              Settings
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

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

export default AdminHeader;
