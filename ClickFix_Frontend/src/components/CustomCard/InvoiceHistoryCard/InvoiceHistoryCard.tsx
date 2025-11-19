import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export interface InvoiceReciptDto {
  serviceName: string;
  quantity: number;
  amount: number;
  tax: number;
  total: number;
  status: string;
}

const InvoiceHistoryCard: React.FC = () => {
  const [invoices , setInvoices] = useState<InvoiceReciptDto[]>([]);
  let hasInvoices : boolean;
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  
  
   
  const handleViewClick = () => {
    let token = localStorage.getItem('token');
    fetch(`http://localhost:9999/booking-api/bookings/invoicehistory/${userId}` , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setInvoices(data);
      const FilteredData = data.filter((d: { status: string; })=> d.status == 'Paid')
      hasInvoices = FilteredData.length > 0;
      navigate('/home/invoice-history', {
        state: { invoices: data , userId , hasInvoices : hasInvoices}
      });
    })
    .catch(err => console.error('Failed to fetch invoices:', err));
  };
  return (
    <Card style={{ width: '18rem',minHeight: '220px'  }} className="shadow-sm h-100 ">
      <Card.Body className="text-center align-content-center">
        <FaFileInvoiceDollar size={40} className="mb-3" />
        <Card.Title>Invoice History</Card.Title>
        <Card.Text>View all your past service invoices.</Card.Text>
        <Button variant="primary" onClick={handleViewClick}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default InvoiceHistoryCard;
