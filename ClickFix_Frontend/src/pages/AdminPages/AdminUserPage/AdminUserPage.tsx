import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface UserDto {
  userId: number;
  name: string;
  email: string;
  phone: string;
  address:string;
  // Add other fields as needed
}

const AdminUserPage: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios.get("http://localhost:9999/users/admin/users" , {
      headers : {
      Authorization : `Bearer ${token}`}
    }) // Adjust base URL if needed
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = async (targetUserId: number) => {
    try {
      let token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9999/users/profile/${targetUserId}` , {
        headers : {
        Authorization : `Bearer ${token}`}
      });
      toast.success('User deleted successfully.');
  
      // Update UI by removing the deleted user from the state
      setUsers(prevUsers => prevUsers.filter(user => user.userId !== targetUserId));
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user.');
    }
  };
  
  
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Manage Users</h2>
      <Form.Control
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredUsers.map(user => (
          <Col key={user.userId}>
            <Card>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Phone:</strong> {user.phone}<br/>
                  <strong>Address:</strong>{user.address}
                </Card.Text>
                <Button variant="danger" onClick={() => handleDelete(user.userId)}>
                  Delete User
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminUserPage;
