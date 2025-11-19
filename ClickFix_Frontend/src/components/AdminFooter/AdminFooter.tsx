import React from 'react';
import { Container } from 'react-bootstrap';

const AdminFooter: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#515860' }}  className="text-center py-3 mt-4 ">
      <Container>
        <small>© 2025 ClickFix. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default AdminFooter;
