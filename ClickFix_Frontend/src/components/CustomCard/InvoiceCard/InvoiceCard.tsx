import './InvoiceCard.css';
import ClickFixlogo from "../../../assets/logo.jpeg"
import {useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { Button } from 'react-bootstrap';

    interface InvoiceReciptDto {
    serviceName: string;
    quantity: number;
    amount: number;
    tax: number;
    total: number;
    status: string;
  }

const InvoiceCard : React.FC = () => {
    const location = useLocation();
    const recipt : InvoiceReciptDto = location.state?.invoiceRecipt;
    const invoiceId = location.state?.invoiceId;
    const details = location.state?.details;
    const bookingId = location.state?.bookingId;
    const date = location.state?.date;

const downloadPDF = () => {
        const element = document.querySelector('.invoice-container');
        if (element) {
          const opt = {
            margin: 0.5,
            filename: `Invoice_INV-${invoiceId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
      
          html2pdf().set(opt).from(element).save();
        }
      };

    return (
             <>
                <div className="invoice-container">
                    <div className="invoice-header">
                    <div className="top-row">
                        <img src={ClickFixlogo} alt="ClickFix Logo" className="logo" />
                        <h1 className="invoice-title">INVOICE</h1>
                    </div>

                    <div className="info-row">
                        <div className="column bill-to">
                        <h3>Bill To:</h3>
                        <p>Name: {details.name}</p>
                        <p>Email: {details.email}</p>
                        <p>Address: {details.address}</p>
                        <p>Phone: +91 {details.phoneNo}</p>
                        </div>
                        
                        <div className="column invoice-details">
                        <br />
                        <br />
                        <p><strong>Invoice ID:</strong> INV-{invoiceId}</p>
                        <p><strong>Date:</strong> <span id="date">{date}</span></p>
                        </div>
                    </div>
                    </div>

                    <table className="invoice-table">
                    <thead>
                        <tr>
                        <th>Service Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{recipt.serviceName}</td>
                        <td>{recipt.quantity}</td>
                        <td>{recipt.amount}</td>
                        </tr>

                    </tbody>
                    </table>

                    <div className="totals">
                    <p><strong>Subtotal:</strong> {recipt.amount}</p>
                    <p><strong>Tax:</strong> {recipt.tax}%</p>
                    <p><strong>Total:</strong> {recipt.total}</p>
                    </div>

                    <div className="payment-info">
                    <p>Account Holder: {details.name}</p>
                    <p>IFSC: HDFC0000123</p>
                    </div>

                    <footer>
                    <p className="footer-center">&copy; 2025 ClickFix. All rights reserved.</p>
                    </footer>
                </div>

                <Button variant="primary" onClick={downloadPDF} className="mt-3">
                Download Invoice as PDF
                </Button>
        </>
    );
}

export default InvoiceCard;
