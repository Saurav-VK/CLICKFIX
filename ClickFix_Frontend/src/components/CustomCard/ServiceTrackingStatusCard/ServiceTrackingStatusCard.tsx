import React, { useEffect, useState } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';

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

const ServiceTrackingStatusCard: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('No Bookings yet');
  const [service , setService] = useState('');
  const [bookings , setBookings] = useState<BookingDto[]>([]);
  
  const progressMap : Record<string , number> = {'Pending' : 0 , 'In-Progress' : 50 , 'Completed' : 100}
 

  useEffect(() => {
    let token = localStorage.getItem('token');
    fetch(`http://localhost:9999/users/bookings/user/${userId}` , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        
        if (!Array.isArray(data)) {
          throw new Error('User does not have any bookings');
        }
  
        setBookings(data);
  
        const filteredBookings = data.filter((booking: { status: string }) => booking.status !== 'Paid');
  
        if (filteredBookings.length === 0) {
          let stage = 0;
          const interval = window.setInterval(() => {
            setProgress(stage === 0 ? 0 : progressMap['Pending']);
            setStatusText('No Bookings yet');
            stage = (stage + 1) % 2;
          }, 5000);
          return () => clearInterval(interval);
        } else {
          const latestStatus = filteredBookings.at(-1)?.status ?? 'Pending';
          setService(latestStatus);
          setProgress(progressMap[latestStatus] ?? 0);
          setStatusText(latestStatus);
        }
      })
      .catch(err => {
        console.log(err);
       } );
      },[]);

  return (
    <Card style={{ width: '18rem', minHeight: '220px'}} className="shadow-sm h-100">
      <Card.Body className="text-center align-content-center">
        <FaMapMarkerAlt size={40} className="mb-3" />
        <Card.Title>Current Service Tracking Status</Card.Title>
        <Card.Text>{bookings.at(-1)?.bookingId}</Card.Text>
        <ProgressBar
          now={progress}
          label={`${progress}%`}
          variant={progress < 50 ? 'warning' : progress < 100 ? 'info' : 'success'}
          className="mb-2"
        />
        <Card.Text>{statusText}</Card.Text>
      </Card.Body>
    </Card>
  );
}; 

export default ServiceTrackingStatusCard;
