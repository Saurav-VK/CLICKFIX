import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import emptyInvoiceImg from '../../assets/invoice-animation.gif';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


interface InvoiceHistoryDto {
  invoiceId: number;
  serviceName: string;
  quantity: number;
  amount: number;
  tax: number;
  total: number;
  status: string;
  bookingId: number;
}


const InvoiceHistory: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  const hasInvoices = location.state?.hasInvoices;

  const [recipts, setRecipts] = useState<InvoiceHistoryDto[]>([]);

  useEffect(() => {
    if (userId) {
      let token = localStorage.getItem('token');
      fetch(`http://localhost:9999/invoice/getinvoicehistoryrecipt/${userId}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(data => {
          setRecipts(data);})
        .catch(err => {
          console.error("Failed to fetch invoice history", err);
          alert("Unable to load invoices.");
        });
    }
  }, [userId]);
  
  const navHome =() => {
    navigate('/home');
  }

  const viewReport = async (invoice: InvoiceHistoryDto) => {
    try {
      const bookingId = invoice.bookingId;
      let token = localStorage.getItem('token');
      // Fetch the data from booking endpoint
      const response = await fetch(`http://localhost:9999/booking-api/bookings/getuser/${bookingId}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
      const userDetails = await response.json();
      console.log(userDetails);
      const response2 = await fetch(`http://localhost:9999/booking-api/bookings/${bookingId}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      const bookingDetails = await response2.json();
      console.log(bookingDetails);
      // Navigate and pass data under `details`
      navigate('/home/invoice', {
        state: {
          invoiceRecipt: {
            serviceName: invoice.serviceName,
            quantity: invoice.quantity,
            amount: invoice.amount,
            tax: invoice.tax,
            total: invoice.total,
            status: invoice.status
          },
          invoiceId: invoice.invoiceId,
          bookingId: invoice.bookingId,
          details: {
            ...userDetails
          } ,
          date : bookingDetails.date
        }
      });
    } catch (err) {
      console.error("Failed to fetch booking details:", err);
      alert("Unable to load invoice details.");
    }
  };
  

  return (
    <>
    { hasInvoices ? (
    <Container className="mt-4">
      <h2 className="mb-4">Your Invoice History</h2>
      <Row>
        {recipts
        .filter(invoice => invoice.status === 'Paid')
        .map((invoice, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Invoice #{index + 1}</Card.Title>
                <Card.Text>
                  Service: {invoice.serviceName}<br />
                  Quantity: {invoice.quantity}<br />
                  Amount: ₹{invoice.amount}<br />
                  Tax: {invoice.tax}%<br />
                  Total: ₹{invoice.total.toFixed(2)}<br />
                  Status: {invoice.status}
                </Card.Text>
                <Button variant="success" onClick={() => viewReport(invoice)}>VIEW INVOICE</Button>
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
      src={emptyInvoiceImg}
      alt="No bookings"
      style={{ maxWidth: '350px', height: 'auto', objectFit: 'contain', margin: '0 auto', padding: '1rem' }}
    />
     <Card.Header>No Invoices yet</Card.Header>
     <Card.Body>
    <Card.Title>Your Invoice list is empty</Card.Title>
    <Button variant="primary" onClick ={navHome}>HOME</Button>
    </Card.Body>
  </Card>
  )}
  </>
  );
};

export default InvoiceHistory;

