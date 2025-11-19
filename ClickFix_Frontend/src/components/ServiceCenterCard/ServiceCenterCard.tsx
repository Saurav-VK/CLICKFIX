import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ServiceCenterCard.css";

// Types
interface ServiceCenter {
  serviceCenterId: number;
  name: string;
  location: string;
  contact: number;
}

interface Mechanic {
  mechanicId: number;
  name: string;
  expertise: string;
  serviceCenterId: number;
}

interface Details {
  mechanics: Mechanic[];
}

interface Props {
  center: ServiceCenter;
}

function ServiceCenterCard({ center }: Props) {
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    if (details) {
      setDetails(null);
      return;
    }
  
    setLoading(true);
  
    try {
      let token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:9999/mechanic/get/servicecenterid/${center.serviceCenterId}` , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const mechanics: Mechanic[] = await res.json();
      setDetails({ mechanics });
    } catch (error) {
      console.error("Error loading details:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const imageUrl = `https://picsum.photos/400/200?random=${center.serviceCenterId}`;

  return (
    <Row className="g-4">
     <Col >    
    <Card className="mb-3 custom-card">
      <Card.Body className="text-center d-flex flex-column align-items-center">
                <div className="image-container">
                <Card.Img 
                variant="top" 
                src={imageUrl} 
                alt={center.name}
                className="custom-card-image"
              />
                <div className="image-overlay"></div>
                </div>
                <br />
        <Card.Title className="custom-card-title" >{center.name}</Card.Title>
        <Card.Text className="custom-card-text" >
          <strong>Location:</strong> {center.location}
          <br />
          <strong>Contact:</strong> {center.contact}
        </Card.Text>
        <Button variant="primary" onClick={fetchDetails}>
          {details ? "Hide Info" : "View More Info"}
        </Button>

        {loading && (
          <div className="mt-2">
            <Spinner animation="border" size="sm" /> Loading...
          </div>
        )}

        {details && (
          <div className="mt-3">
            <h6>Mechanics</h6>
            <ListGroup variant="flush">
              {details.mechanics.map((mechanic) => (
                <ListGroup.Item key={mechanic.mechanicId}>
                  {mechanic.name} - {mechanic.expertise}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Card.Body>
    </Card>
      </Col>
    </Row>
  );
}

export default ServiceCenterCard;





