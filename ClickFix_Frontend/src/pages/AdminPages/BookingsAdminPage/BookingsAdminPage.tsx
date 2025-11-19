import React, { useEffect, useState } from 'react';
import './BookingsAdminPage.css';
 
interface Booking {
  bookingId: number;
  userId: number;
  vehicleId: number;
  serviceCenterId: number;
  date: string;
  timeSlot: string;
  serviceType: string | null;
  status: string;
}
 
const statusOrder = ['Pending', 'In-Progress', 'Completed' , 'Paid'];
 
const BookingsAdminPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedDate, setEditedDate] = useState<string>('');
  const [editedTimeSlot, setEditedTimeSlot] = useState<string>('');
  const [searchId, setSearchId] = useState<string>('');
 
  useEffect(() => {
    let token = localStorage.getItem('token');
    fetch('http://localhost:9999/booking-api/bookings/getall' , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.warn('Unexpected response format:', data);
        }
      })
      .catch(err => console.error('Error fetching bookings:', err));
  }, []);
 
  const handleSearch = async () => {
    if (!searchId.trim()) return;
    let token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:9999/booking-api/bookings/${searchId}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data && data.bookingId) {
        setBookings([data]);
      } else {
        alert('Booking not found');
      }
    } catch (err) {
      console.error('Error fetching booking by ID:', err);
      alert('Booking not found');
    }
  };
 
  const handleRescheduleClick = (booking: Booking) => {
    setEditingId(booking.bookingId);
    setEditedDate(booking.date);
    setEditedTimeSlot(booking.timeSlot);
  };
 
  const handleSaveClick = async (id: number) => {
    if (!editedDate || !editedTimeSlot) {
      alert('Please enter both date and time slot.');
      return;
    }
 
    const bookingToUpdate = bookings.find(b => b.bookingId === id);
    if (!bookingToUpdate) return;
 
    const updatedBooking = {
      ...bookingToUpdate,
      date: editedDate,
      timeSlot: editedTimeSlot,
    };
 
    try {
      let token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:9999/booking-api/bookings/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(updatedBooking),
      });
      const result = await res.json();
      setBookings(bookings.map(b => (b.bookingId === id ? result : b)));
      setEditingId(null);
    } catch (err) {
      console.error('Error updating booking:', err);
      alert('Failed to reschedule booking.');
    }
  };
 
  const handleDeleteClick = async (id: number) => {
    try {
      let token = localStorage.getItem('token')
      await fetch(`http://localhost:9999/booking-api/bookings/${id}`, {
          method: 'DELETE',
          headers : {
            'Authorization' : `Bearer ${token}`
      }
       });
      setBookings(bookings.filter(b => b.bookingId !== id));
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };
 
  const handleChangeStatus = async (id: number) => {
    const booking = bookings.find(b => b.bookingId === id);
    if (!booking) return;
 
    const currentIndex = statusOrder.indexOf(booking.status);
    if (currentIndex < statusOrder.length - 1) {
      const newStatus = statusOrder[currentIndex + 1];
      const updatedBooking = { ...booking, status: newStatus };
 
      try {
        let token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:9999/booking-api/bookings/${id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json' ,
            'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify(updatedBooking),
        });
        const result = await res.json();
        setBookings(bookings.map(b => (b.bookingId === id ? result : b)));
      } catch (err) {
        console.error('Error updating status:', err);
      }
    }
  };
 
  const handleUndoStatus = async (id: number) => {
    const booking = bookings.find(b => b.bookingId === id);
    if (!booking) return;
 
    const currentIndex = statusOrder.indexOf(booking.status);
    if (currentIndex > 0) {
      const newStatus = statusOrder[currentIndex - 1];
      const updatedBooking = { ...booking, status: newStatus };
 
      try {
        let token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:9999/booking-api/bookings/${id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json' ,
            'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify(updatedBooking),
        });
        const result = await res.json();
        setBookings(bookings.map(b => (b.bookingId === id ? result : b)));
      } catch (err) {
        console.error('Error undoing status:', err);
      }
    }
  };
 
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'status-badge pending';
      case 'In-Progress':
        return 'status-badge inprogress';
      case 'Completed':
        return 'status-badge complete'
      case 'Paid':
        return 'status-badge paid';
      default:
        return 'status-badge';
    }
  };
 
  return (
    <div className="admin-panel">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Booking ID"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="card-container">
        {bookings.map(booking => (
          <div
            key={booking.bookingId}
            className={`booking-card ${editingId === booking.bookingId ? 'editing' : ''}`}
          >
            <div><strong>BookingID:</strong> {booking.bookingId}</div>
            <div><strong>UserID:</strong> {booking.userId}</div>
            <div><strong>VehicleID:</strong> {booking.vehicleId}</div>
            <div><strong>ServiceCenterID:</strong> {booking.serviceCenterId}</div>
            <div>
              <strong>Date:</strong>{' '}
              {editingId === booking.bookingId ? (
                <input
                  type="date"
                  value={editedDate}
                  onChange={e => setEditedDate(e.target.value)}
                />
              ) : (
                booking.date
              )}
            </div>
            <div>
              <strong>TimeSlot:</strong>{' '}
              {editingId === booking.bookingId ? (
                <input
                  type="text"
                  value={editedTimeSlot}
                  onChange={e => setEditedTimeSlot(e.target.value)}
                />
              ) : (
                booking.timeSlot
              )}
            </div>
            <div><strong>Service Type:</strong> {booking.serviceType ?? 'N/A'}</div>
            <div>
              <strong>Status:</strong>{' '}
              <span className={getStatusClass(booking.status)}>{booking.status}</span>
            </div>
            <div className="actions">
              {editingId === booking.bookingId ? (
                <>
                  <button onClick={() => handleSaveClick(booking.bookingId)}>Save</button>
                  <button className="cancel" onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleRescheduleClick(booking)}>Reschedule</button>
              )}
              <button onClick={() => handleDeleteClick(booking.bookingId)}>Delete</button>
              <button onClick={() => handleChangeStatus(booking.bookingId)}>Change Status</button>
              <button onClick={() => handleUndoStatus(booking.bookingId)}>Undo</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default BookingsAdminPage;
 
 
