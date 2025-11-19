import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaWrench } from 'react-icons/fa'; // You can replace this with any icon you prefer

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

function ServiceBookingHistoryCard() {
  const [bookings , setBookings] = useState<BookingDto[]>([]);
  // let hasBookings : boolean = false;
  let hasBookings : boolean;
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId')
  const handleViewClick = () => {
    let token = localStorage.getItem('token');
    fetch(`http://localhost:9999/users/bookings/user/${userId}` , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(res => {
      if(!res.ok) {
         if(res.status === 401) {
          return [];
         }
      throw new Error(`HTTP error! Status: ${res.status}`); }
      return res.json();
    })
    .then(data => {
      setBookings(data);
      hasBookings = data.length > 0;
      navigate('/home/booking-history' , {
        state : {bookings : data , hasBookings}
      });
    })
    .catch(err => console.error('Failed to fetch bookings:', err));
  };

  return (
    <Card style={{ width: '18rem' }} className="shadow-sm">
      <Card.Body className="text-center">
        <FaWrench size={40} className="mb-3" />
        <Card.Title>Booking Service History</Card.Title>
        <Card.Text>
          View your past service bookings and details.
        </Card.Text>
        <Button variant="primary" onClick={handleViewClick}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ServiceBookingHistoryCard;
