import React, { useEffect, useState,  type FormEvent } from 'react'
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// interface BillToDto {
//   name : string;
//   email : string;
//   address : string;
//   phoneNo : string;
// }

interface InvoiceReciptDto {
  serviceName: string;
  quantity: number;
  amount: number;
  tax: number;
  total: number;
  status: string;
}

interface InvoiceHistoryDto {
    invoiceId : number;
    serviceName : string;
    quantity : number;
    amount : number;
    tax : number;
    total : number;
    status : string;
    bookingId : number;
}  

const InvoiceAdminPage : React.FC = () => {
     const navigate = useNavigate();
     const [inputData , setInputData] = useState<string>(''); 
     const [reciptList , setReciptList] = useState<InvoiceHistoryDto[]>([]);
     const [invoiceId , setInvoiceId] = useState(0);
     const [bookingId , setBookingId] = useState(0);
     const [userId , setUserId] = useState(0);

   const handleSubmit = (e : FormEvent) => {
       e.preventDefault();
       sendData(inputData);
   };

   const sendData = async (data:string) => {
    try{
      console.log("INCOMING DATA: " + data);
        let token = localStorage.getItem('token');
       const response = await fetch(`http://localhost:9999/users/admin/users/getuid/${data}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
       const uid = await response.json();
       setUserId(uid);
       console.log("USER ID : " + JSON.stringify(uid));
       const response2 = await fetch(`http://localhost:9999/invoice/getinvoicehistoryrecipt/${uid}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
       const reciptlist = await response2.json();
       setReciptList(reciptlist);

     }
     catch(err) {
      console.log(err);
     }
   }

         const viewReport = async (invoiceId : number , bookingId : number) => {
          let token = localStorage.getItem('token');
         const invrec = await fetch(`http://localhost:9999/invoice/displayrecipt/${invoiceId}` , {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        });
         const recipt = await invrec.json();
         const detailsresponse = await fetch (`http://localhost:9999/users/profile/${userId}` , {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
         }) ;
         const details = await detailsresponse.json();
         navigate('/admin/view-invoice' , {state : {invoiceRecipt : recipt, invoiceId , bookingId : bookingId , details : details}});

       }

  return (
    <div>
         <Form onSubmit={handleSubmit} className="my-3">
              <InputGroup>
                <InputGroup.Text id="email-label">Email</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter email ID"
                  aria-label="Email"
                  aria-describedby="email-label"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                />
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </InputGroup>
            </Form>
         <Container className="mt-4">
            <h2 className="mb-4">Invoice History</h2>
            <Row>
              {reciptList
              // .filter(invoice => invoice.status === 'Paid')
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
                      <Button variant="success" onClick={() => viewReport(invoice.invoiceId , invoice.bookingId)}>VIEW INVOICE</Button>
                    </Card.Body>
                  </Card> 
                </Col> 
              ))}
            </Row>
          </Container>
    </div>
  );
}

export default InvoiceAdminPage;
