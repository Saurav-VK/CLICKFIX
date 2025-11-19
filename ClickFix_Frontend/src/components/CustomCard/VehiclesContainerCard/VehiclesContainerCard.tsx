import axios from "axios";
import {Col, Container, Row } from "react-bootstrap";


import VehicleCard from "../VehicleDisplayCard/VehicleDisplayCard";
import './VehiclesContainerCard.css'
import { useVehicle } from "../../../custom_hooks/useVehicle";
import type { Vehicle } from "../../../types/vehicle.types";
import { useEffect } from "react";
import { toast } from "react-toastify";

type ContainerProp = {
  handleUpdateClick : (vehicle: Vehicle) => void;
}
function VehiclesContainerCard ({handleUpdateClick}:ContainerProp){
  const {vehicleList, setVehicleList} = useVehicle(); 

  useEffect(() => {
    const fetchVehicles = async () => {
      let token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:9999/vehicle-api/allvehicles/${userId}`,{
          headers: {
          Authorization: `Bearer ${token}`,
        },});

        setVehicleList(response.data);
      } catch (error) {
        // toast.error('Failed to Connect to Server',{
        //   position: 'top-center',
        //   theme: 'dark',
        //   autoClose: 3000
        // })
        console.error('Error fetching data:', error);
      }
    };
  
    fetchVehicles();
  }, []);
  

  const deleteVehicleState = (vehicle:Vehicle) =>{
    setVehicleList( currVehicleList =>
      currVehicleList.filter( obj =>
       obj.vehicleId != vehicle.vehicleId
     ));
  }
  const handleDeleteClick = async (vehicle:Vehicle) =>{
    try{ 
      let token = localStorage.getItem('token');
      const response = await toast.promise(
        axios.delete(`http://localhost:9999/vehicle-api/vehicle/${vehicle.vehicleId}` , { 
          headers :  {
            Authorization : `Bearer ${token}`
          }
        }),
        {
          pending: 'Deleting vehicle...',
          success: 'Vehicle Deleted successfully!',
          error: 'Failed to Delete vehicle. Connection to Server Failed.',
        },
        {
          position: 'top-center',
          theme: 'dark',
        }
      );
      console.log(response);
      if (typeof response.data === 'string' && response.data.includes('is deleted successfully')) {
        deleteVehicleState(vehicle);
      } else {
        toast.error(response.data, {
          position: 'top-right',
          theme: 'dark',
          autoClose: 4000
        });
      }
    } catch(error){
      console.error("delete request to server failed", error);
    }
  };
    return (
        <Container
            style={{backgroundColor: '#f9f9f9'}}
            className="flex-grow-1 py-3 d-flex flex-column vehicle-tab-container"
          >
            <Row className="g-4 flex-grow-1 align-items-stretch">
              {vehicleList.length > 0 ? (
                vehicleList.map((vehicle, index) => (
                  <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <VehicleCard vehicle={vehicle}  onUpdateClick={handleUpdateClick} onDeleteClick={handleDeleteClick}/>
                  </Col>
                ))
              ) : (
                <div className="text-center w-100 py-5">No vehicles available</div>
              )}
            </Row>
          </Container>
);
}

export default VehiclesContainerCard;


