import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CarHotspots from "../../components/CarHotspots/CarHotspots";
import ServiceCenterCard from "../../components/ServiceCenterCard/ServiceCenterCard";

// Types
interface ServiceType {
  serviceTypeId: number;
  serviceName: string;
  description: string;
  price: number;
}

interface ServiceCenter {
  serviceCenterId: number;
  name: string;
  location: string;
  contact: number;
}

function ServiceCenterPage() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [centers, setCenters] = useState<ServiceCenter[]>([]);

  useEffect(() => {
    // const fetchServiceTypes = async () => {
    //   try {
    //     const res = await fetch("http://localhost:9085/servicecenter/get/all");
    //     const data: ServiceType[] = await res.json();
    //     setServiceTypes(data);
    //   } catch (error) {
    //     console.error("Error fetching service types:", error);
    //   }
    // };

    const fetchCenters = async () => {
      try {
        let token = localStorage.getItem('token');
        const res = await fetch("http://localhost:9999/servicecenter/get/all" , {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        });
        const data: ServiceCenter[] = await res.json();
        setCenters(data);
      } catch (error) {
        console.error("Error fetching service centers:", error);
      }
    };

    // fetchServiceTypes();
    fetchCenters();
  }, []);

  // const getLogoPath = (name: string) =>
  //   `/logos/${name.toLowerCase().replace(/[^a-z0-9]/gi, "").replace(/&/g, "and")}.png`;

  return (
    <Container>
      <br />
      <br />
      <br />
      <h2 className="mb-4" style={{textDecoration: "underline"}} >Car Services Overview</h2>

      {/* Car Hotspots Section */}
      <Row className="mb-5">
        <Col>
          <CarHotspots />
        </Col>
      </Row>

      {/* Service Types Section
      <h3 className="mb-3">Service Types</h3>
      <Row>
        {serviceTypes.map((service) => (
          <Col key={service.serviceTypeId} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={getLogoPath(service.serviceName)}
                alt={service.serviceName}
                style={{ height: "150px", objectFit: "contain", padding: "10px" }}
              />
              <Card.Body>
                <Card.Title>{service.serviceName}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Card.Text><strong>₹{service.price.toFixed(2)}</strong></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}

      {/* Service Center Cards Section */}
      <br />
      <br />
      <h3 className="mb-4" style={{ textAlign: "center", textDecoration: "underline"}} >Available Service Centers</h3>
      <br />
      <Row>
        {centers.map((center) => (
          <Col key={center.serviceCenterId} md={4} className="mb-4">
            <ServiceCenterCard center={center} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServiceCenterPage;
