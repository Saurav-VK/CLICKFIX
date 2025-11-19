import React, { useEffect, useState } from 'react';
import './PaymentPageCard.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
 
import googlePayIcon from "../../../assets/googlepay.png";
import phonePeIcon from '../../../assets/phonepe.png';
import paytmIcon from '../../../assets/paytm.png';
import { Button } from 'react-bootstrap';
 
  interface BillToDto {
   name : string;
   email : string;
   address : string;
   phoneNo : string;
  }  

  interface InvoiceReciptDto {
  serviceName: string;
  quantity: number;
  amount: number;
  tax: number;
  total: number;
  status: string;
}

const PaymentPageCard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const invoiceId = location.state?.invoiceId;
  const userId = location.state?.userId;
  const bookingId = location.state?.bookingId;
  const [recipt , setRecipt] = useState<InvoiceReciptDto>();
  const [userdetails , setUserdetails] = useState<BillToDto>();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [upiApp, setUpiApp] = useState<string | null>(null);
  const [pin, setPin] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  useEffect(() => {
    let token = localStorage.getItem('token');
    if(invoiceId) {
    fetch(`http://localhost:9999/invoice/displayrecipt/${invoiceId}` , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {setRecipt(data);})
    .catch(err => {console.log(err);})
    }
  },)

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setUpiApp(null);
    setPin('');
    setIsSuccess(false);
  };
 
  const handleContinue = () => {
    let token = localStorage.getItem('token');
    setIsLoading(true);
    setTimeout(() => {
      fetch(`http://localhost:9999/booking-api/bookings/completepayment/${bookingId}` , {
        'method' : 'PUT',
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      setIsLoading(false);
      setIsSuccess(true);

    }, 2000);
  };
  

  const handleInvoice = () => {
    const res = () => {
      let token = localStorage.getItem('token');
      Promise.all([
      fetch(`http://localhost:9999/invoice/displayrecipt/${invoiceId}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      }).then(res => res.json()) ,
     fetch(`http://localhost:9999/invoice/userdetails/${bookingId}` , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    }).then(res => res.json()) ,
    fetch(`http://localhost:9999/booking-api/bookings/${bookingId}` , {
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    }).then(res => res.json())
      ])
      .then(([recipt , userDetails , bookingDetails]) => {
        setRecipt(recipt);
        setUserdetails(userDetails);
        let date = bookingDetails.date;
        console.log(invoiceId);
        navigate(
          '/home/invoice' , 
          {state : {invoiceRecipt : recipt , invoiceId , details : userDetails , date}}
        );
        })
      .catch(err => {console.log(err);})
    }
    res();
  }

  const isValidPin = (value: string) => /^\d{4}$/.test(value);
 
  const isContinueEnabled = () => {
    if (selectedMethod === 'UPI') {
      return upiApp !== null && isValidPin(pin);
    }
    if (selectedMethod === 'Cards') {
      return true; // No PIN required for cards now
    }
    return isValidPin(pin);
  };
 
  const upiApps = [
    { name: 'GooglePay', icon: googlePayIcon },
    { name: 'PhonePe', icon: phonePeIcon },
    { name: 'Paytm', icon: paytmIcon },
  ];
 
  return (
    <div className="payment-container">

      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner" />
          <span>Processing Payment...</span>
        </div>
      )}
 
      {isSuccess ? (
        <div className="success-message">
          <h2>✅ Payment Successful!</h2>
          <p>Thank you for your payment.</p>
          <Button variant = "success" onClick = {handleInvoice}>VIEW INVOICE</Button>
        </div>
      ) : (
        <>
          <header className="payment-header">
            <h1>Payment</h1>
            <span className="trusted-badge">Razorpay Trusted Business {invoiceId}</span>
          </header>
 
          <div className="payment-methods">
            <div className="method" onClick={() => handleMethodSelect('UPI')}>
              <span role="img" aria-label="upi">📱</span> UPI
              {selectedMethod === 'UPI' && (
                <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="radio-group">
                    {upiApps.map((app) => (
                      <div key={app.name} className="radio-option">
                        <input
                          type="radio"
                          id={app.name}
                          name="upiApp"
                          value={app.name}
                          checked={upiApp === app.name}
                          onChange={(e) => setUpiApp(e.target.value)}
                        />
                        <label htmlFor={app.name}>
                          <img src={app.icon} alt={app.name} className="upi-icon" />
                          {app.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {upiApp && (
                    <>
                      <label>Enter 4-digit PIN:</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d{0,4}$/.test(val)) setPin(val);
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
 
            {['Cards', 'Netbanking', 'Wallet'].map((method) => (
              <div key={method} className="method" onClick={() => handleMethodSelect(method)}>
                <span role="img" aria-label={method.toLowerCase()}>
                  {{
                    Cards: '💳',
                    Netbanking: '🏦',
                    Wallet: '👛',
                  }[method]}
                </span> {method}
                {selectedMethod === method && (
                  <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                    {method === 'Cards' ? (
                      <div className="card-details">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" placeholder="Valid Card Number" maxLength={12} />
 
                        <div className="card-row">
                          <div>
                            <label htmlFor="expiry">Expiry Date</label>
                            <input type="text" id="expiry" placeholder="MM/YY" maxLength={5} />
                          </div>
                          <div>
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="CVV" maxLength={3} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <label>Enter 4-digit PIN:</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={pin}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d{0,4}$/.test(val)) setPin(val);
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
 
          <footer className="payment-footer">
            <div className="amount-section">
              <span>Total: {recipt?.total}</span>
            </div>
            <Button onClick={handleContinue} disabled={!isContinueEnabled() || isLoading}>
              Continue
            </Button>
          </footer>
        </>
      )}
    </div>
  );
};
 
export default PaymentPageCard;