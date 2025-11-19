import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import emptyBookingImg from '../../assets/empty-box.gif';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

interface BookingDto {
  bookingId : number;
  userId : number;
  vehicleId : number;
  serviceCenterId : number;
  date : string;
  timeSlot : string;
  status : string;
  serviceType : string;
}

const BookingHistory: React.FC = () => {

  const navigate = useNavigate();
  const [invoiceId , setInvoiceId] = useState(0); 
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const navHome =() => {
    navigate('/home');
  }

  const handlePayNow =(bookingId : number , userId : number) => {
    let token = localStorage.getItem('token');
      fetch(`http://localhost:9999/booking-api/bookings/getinvoiceId/${bookingId}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setInvoiceId(data);
        navigate('/home/payment' , {state : {bookingId , userId , invoiceId : data}});
      })
  }

  const location = useLocation();
  const bookings : BookingDto[] = location.state?.bookings ??[];
  const hasBookings : boolean = location.state?.hasBookings;

  console.log(bookings);

  const filteredBookings = selectedStatus === 'All'
  ? bookings
  : bookings.filter(booking => booking.status === selectedStatus);

  return (
    <>
    {hasBookings ? ( 
    <Container className="mt-4">

      <h2 className="mb-4">Your Booking History</h2>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Filter by Status:</strong>{' '}
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <Row>
        {filteredBookings.map((booking , index) => (
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Booking # {index + 1}</Card.Title>
              <Card.Text>
                Date: {booking.date}<br />
                Status: {booking.status}<br />
                Service Type: {booking.serviceType}
              </Card.Text>
              {booking.status === 'Completed' && (
                <Button variant = "success" onClick = {() => handlePayNow(booking.bookingId , booking.userId)}>PAY NOW</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
  ) : (
    <Card className = "text-center">
      <Card.Img
        variant="top"
        src={emptyBookingImg}
        alt="No bookings"
        style={{ maxWidth: '350px', height: 'auto', objectFit: 'contain', margin: '0 auto', padding: '1rem' }}
      />
    <Card.Header>No Bookings yet</Card.Header>
    <Card.Body>
      <Card.Title>Your booking list is empty</Card.Title>
      <Button variant="primary" onClick ={navHome}>HOME</Button>
      </Card.Body>
    </Card>
  )}
  </>
  );
};

export default BookingHistory;
