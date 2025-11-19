import React, {
  useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
    type KeyboardEvent,
  } from 'react';
  import { useNavigate } from 'react-router-dom';
  import './BookingFormCard.css';
  import {Button, Card, Modal } from 'react-bootstrap';
  import Placeholder from 'react-bootstrap/Placeholder';
  import Alert from 'react-bootstrap/Alert';
  import emptyImg from "../../../assets/mechanic_animated.gif";
import { toast } from 'react-toastify';
  
  interface FormData {
    bookingId?: number;
    id: string;
    name: string;
    contact: string;
    email: string;
    vehicleName: string;
    serviceType: string;
    serviceCenter: string;
    date: string;
    time: string;
    status: string;  
  }
  
  interface VehicleNameDto {
    make: string;
    model: string;
    registrationNumber: string;
  }
  
  interface ServiceTypeDisplayDto {
    serviceName: string;
    price: number;
  }
  
  interface ServiceDetailsDto {
    name: string;
    location: string;
  }
  
  const BookingFormCard: React.FC = () => {
    
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const [formData, setFormData] = useState<FormData>({
      id: localStorage.getItem('userId') ?? '',
      name: '',
      contact: '',
      email: '',
      vehicleName: '',
      serviceType: '',
      serviceCenter: '',
      date: '',
      time: '',
      status: 'Pending',
  
    });
  
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const [hasVehicles , setHasVehicles] = useState(false);
    const [vehicleOptions, setVehicleOptions] = useState<VehicleNameDto[]>([]);
    const [serviceTypeOptions, setServiceTypeOptions] = useState<ServiceTypeDisplayDto[]>([]);
    const [serviceCenterOptions, setServiceCenterOptions] = useState<ServiceDetailsDto[]>([]);
    const [invoiceId , setInvoiceId] = useState<number | null>(null);
    const [conditional , setConditional] = useState(false);

    const render = async () => {
      let token = localStorage.getItem('token');
      fetch(`http://localhost:9999/booking-api/bookings/displayvehicles/${userId}` , { 
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setVehicleOptions(data);
      })
      .catch(err => {console.log(err);})
    };
     
    useEffect(() => {
      render();
    },[userId]);
    
    useEffect(() => {
    setHasVehicles(vehicleOptions.length > 0);
    })

    const fieldLabels: Record<string, string> = {
      bookingId: 'Booking ID',
      id: 'Customer ID',
      name: 'Full Name',
      contact: 'Contact Number',
      email: 'Email Address',
      vehicleName: 'Vehicle',
      serviceType: 'Service Type',
      serviceCenter: 'Service Center',
      date: 'Service Date',
      time: 'Service Time',
      status: 'Status',
    };
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleUserIdEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setConditional(true);
        e.preventDefault();
        const userId = formData.id.trim();
        if (!userId) return;

        let token = localStorage.getItem('token');

        fetch(`http://localhost:9999/booking-api/bookings/autofill/${userId}` , {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setFormData(prev => ({
              ...prev,
              name: data.name,
              contact: data.phone,
              email: data.email,
            }));
          })
          .catch(console.error);
  
        fetch(`http://localhost:9999/booking-api/bookings/displayvehicles/${userId}` , {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(setVehicleOptions)
          .catch(console.error);

        fetch('http://localhost:9999/booking-api/bookings/service-types' , {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(setServiceTypeOptions)
          .catch(console.error);
  
        fetch('http://localhost:9999/booking-api/bookings/service-centers' , {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(setServiceCenterOptions)
          .catch(console.error);

      }
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       setShow(true);
       try {
        let token = localStorage.getItem('token');
          const [vehicleIdRes, scIdRes] = await Promise.all([
          fetch(`http://localhost:9999/booking-api/bookings/get-v-id/${formData.vehicleName}` , {
            headers : {
              'Authorization' : `Bearer ${token}`
            }
          }).then(res => res.json()),
          fetch(`http://localhost:9999/booking-api/bookings/get-sc-id/${formData.serviceCenter}` , {
            headers : {
              'Authorization' : `Bearer ${token}`
            }
          }).then(res => res.json()),
        ]);
    
        const enrichedBooking = {
          ...formData,
          userId: formData.id,
          vehicleId: vehicleIdRes,
          serviceCenterId: scIdRes,
          date: formData.date,
          timeSlot: formData.time,
        };
    
        const response = await fetch('http://localhost:9999/booking-api/bookings', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' ,
            'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify(enrichedBooking),
        });
    
        const result = await response.json();
        setSubmittedData({
          ...formData,
          bookingId: result.bookingId,
          status: result.status ?? formData.status,
        });
    
        alert(`Booking submitted successfully! Your Booking ID is ${result.bookingId}`);
      } catch (err) {
        console.error('Submission failed:', err);
        alert('Something went wrong. Please try again.');
      }
    };
      
    const handleNav = () => {
          toast.success(
            "redirecting to home page" ,{
              autoClose : 2000
            }
          );
          setTimeout(() => {
            navigate('/home');
          }, 2080);
        };
  
    const GoToVehiclePage = () => {
      navigate('/home/vehicle');
    } 

    return (
      <>
      { hasVehicles ? (
      <div className="booking-form">
        {!submittedData ? (
          <form onSubmit={handleSubmit}>

                    <Alert variant = "success">
                    Bookings can be paid for, after service completion. 
                    Please check the current service status to be updated
                    </Alert>

            <h2>Vehicle Service Booking Form</h2>
  
            <fieldset>
              <legend>Customer Details</legend>
              <div className="form-row">
                <label htmlFor="id">Customer ID:</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  onKeyDown={handleUserIdEnter}
                  required
                />
                {(!conditional) ? (
                    <p
                      style={{
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        padding: "8px",
                        marginTop: "10px",
                        borderRadius: "10px",
                        fontSize: "0.9rem",
                        border: "1px solid #c3e6cb",
                        marginLeft: "5px",
                      }}
                    >
                      ✅ Press Enter to auto-fill details
                    </p>
                  )
                  
                 : (
                  <></>
                )}
              </div>
              <div className="form-row">
                <label htmlFor="name">Full Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label htmlFor="contact">Contact Number:</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email Address:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </fieldset>
            <fieldset>
              <legend>Vehicle Details</legend>
              <div className="form-row">
                <label htmlFor="vehicleName">Vehicle:</label>
                <select name="vehicleName" value={formData.vehicleName} onChange={handleChange} required>
                  <option value="">Select Vehicle</option>
                  {vehicleOptions.map(v => (
                    <option key={v.registrationNumber} value={v.registrationNumber}>
                      {`${v.make} ${v.model} (${v.registrationNumber})`}
                    </option>
                  ))}
                </select>
              </div>
             </fieldset>
  
             <fieldset>
              <legend>Service Details</legend>
              <div className="form-row">
                <label htmlFor="serviceType">Service Type:</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                  <option value="">Select Service Type</option>
                  {serviceTypeOptions.map(st => (
                    <option key={st.serviceName} value={st.serviceName}>
                      {`${st.serviceName} - ₹${st.price}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="serviceCenter">Service Center:</label>
                <select name="serviceCenter" value={formData.serviceCenter} onChange={handleChange} required>
                  <option value="">Select Service Center</option>
                  {serviceCenterOptions.map(sc => (
                    <option key={sc.name} value={sc.name}>
                      {`${sc.name}, ${sc.location}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange}
                min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} />
              </div>
              
              <div className="form-row">
                <label htmlFor="time">Time:</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              </div>
              
            </fieldset> 
            <Button type="submit">Submit Booking</Button>
          </form>
        ) : (
          <div className="booking-details">
            <h2>Booking Details</h2>
            <Alert>
             Payments can be made only upon service completion. Service statrus can be tracked in the dashboard.
            </Alert>
            <table className="details-table">
              <tbody>
                {Object.entries(submittedData).map(([key, value]) => {
                  const label = fieldLabels[key]; 
                  const isEmpty = value === '0' || value === '' || value === null || value === undefined;
                  return label && !isEmpty ? ( <tr key={key}> <td>{label}</td> <td>{value}</td> </tr> ) : null; })}
                   </tbody> 
                   </table>
                   <br></br>
                   <div>

                     <Button className='btn btn-primary me-2' onClick={handleNav}>Home</Button>
                     </div> 
                     </div> )} 
                     </div> 
                    ) :
                    (
                    <Card className="text-center">
                    <Card.Img
                        variant="top"
                        src={emptyImg}
                        alt="No vehicle"
                        style={{ maxWidth: '200px', height: 'auto', objectFit: 'contain', margin: '0 auto', padding: '1rem' }}
                      />

                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                      <Card.Title>Your garage is empty</Card.Title>
                      <Card.Text>
                        Please register a vehicle to book a service
                      </Card.Text>
                      <Button variant="primary" onClick ={GoToVehiclePage}>Add Vehicle</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Clickfix</Card.Footer>
                  </Card>
                  )}
                  </>
                  );
                };
                  
                export default BookingFormCard;                  
                       