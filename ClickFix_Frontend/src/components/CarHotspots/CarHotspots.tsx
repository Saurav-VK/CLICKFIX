import React, { useEffect, useState } from "react";
import "./CarHotspots.css";

interface ServiceType {
  serviceTypeId: number;
  serviceName: string;
  description: string;
  price: number;
}

interface HotspotPosition {
  top: string;
  left: string;
}

// Predefined positions for each service type
const hotspotPositions: Record<string, HotspotPosition> = {
  "Diagnostics": { top: "20%", left: "40%" },
  "Dents, Paint & Detailing": { top: "45%", left: "60%" },
  "Oil, Lube & Filter": { top: "70%", left: "50%" },
  "Brakes": { top: "60%", left: "75%" },
  "Suspension": { top: "55%", left: "25%" },
  "Engine & Transmission": { top: "35%", left: "20%" }
};

const CarHotspots: React.FC = () => {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        let token = localStorage.getItem('token');
        const res = await fetch("http://localhost:9999/servicetype/get/all" , {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        });
        const data: ServiceType[] = await res.json();
        setServiceTypes(data);
      } catch (error) {
        console.error("Error fetching service types:", error);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleHotspotClick = (name: string) => {
    setActiveHotspot(name);
  };

  const closeDialog = () => {
    setActiveHotspot(null);
  };

  return (
    <div className="carContainer">
      <img src="/car-img.png" alt="Car" className="carImage" />

      {serviceTypes.map((service) => {
        const position = hotspotPositions[service.serviceName];
        if (!position) return null;

        return (
          <div
            key={service.serviceTypeId}
            className="hotspot"
            style={{ top: position.top, left: position.left }}
            onMouseEnter={() => handleHotspotClick(service.serviceName)}
            onMouseLeave={() => closeDialog()}
          />
        );
      })}

      {serviceTypes.map((service) => {
        const position = hotspotPositions[service.serviceName];
        if (!position || activeHotspot !== service.serviceName) return null;

        return (
          <div
            key={`dialog-${service.serviceTypeId}`}
            className="dialogBox"
            style={{ top: position.top, left: position.left }}
          >

            <h4>{service.serviceName}</h4>
            <p>{service.description}</p>
            <p><strong>₹{service.price.toFixed(2)}</strong></p>
          </div>
        );
      })}
    </div>
  );
};

export default CarHotspots;
