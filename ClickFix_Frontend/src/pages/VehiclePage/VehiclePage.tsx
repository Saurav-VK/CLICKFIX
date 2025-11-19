import './VehiclePage.css'
import UpdateVehicleModal from '../../components/CustomModals/UpdateVehicleModal/UpdateVehicleModal';
import VehiclesContainerCard from '../../components/CustomCard/VehiclesContainerCard/VehiclesContainerCard';
import {  useState } from "react";
import type { Vehicle } from "../../types/vehicle.types";
import { useVehicle } from '../../custom_hooks/useVehicle';
import { Badge, Button } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';
import AddVehicleModal from '../../components/CustomModals/AddVehicleModal/AddVehicleModal';


const VehiclePage: React.FC = () => {
  const {vehicleList,setVehicleList} = useVehicle();
  const [vehicleToUpdate, setVehicleToUpdate] = useState<Vehicle | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const addNewVehicleState = (newVehicle : Vehicle) =>{
    setVehicleList(
      (prevVehicles) => [...prevVehicles, newVehicle]
      );
  }

  const handleUpdateClick = (vehicle: Vehicle) => {
    setVehicleToUpdate(vehicle);
    setShowUpdateModal(true);

  };

  const updateVehicleState = (updatedData : Vehicle) =>{
    setVehicleList(
      (prevVehicles) => prevVehicles.map(
        (v : Vehicle) => v.vehicleId === updatedData.vehicleId ? updatedData : v
      )
    );
  }

  const isDuplicateRegNumber = (newVehicle: Vehicle): boolean =>{
    console.log(vehicleList);
    return vehicleList.some(
      (existingVehicle) =>
        existingVehicle.registrationNumber === newVehicle.registrationNumber &&
        existingVehicle.vehicleId !== newVehicle.vehicleId
    );
  }

  const handleAddClick = () =>{
    setShowAddModal(true);
  }

  return (
  <div className='VehiclePage-wrapper'>
    <div className="title">
      <div className="title-content">
        <span>Vehicle Dashboard</span>
        <span className='title-badge'>
          <Badge bg="primary">{vehicleList.length}</Badge>
        </span>
      </div>
        <Button variant="primary"className='Add-Vehicle-btn btn-3d' onClick={handleAddClick}><MdAdd size={20}/>add</Button>
    </div>
      
    <VehiclesContainerCard handleUpdateClick={handleUpdateClick}/>

    <UpdateVehicleModal
      show={showUpdateModal}
      intialVehicleData={vehicleToUpdate}

      onClose={() => {
        setShowUpdateModal(false);
        setVehicleToUpdate(null);
      }}  

      onUpdateSucces={updateVehicleState}
    />
    <AddVehicleModal
      show={showAddModal}
      onClose={() => {
        setShowAddModal(false);
      }}
      validateRegNum={isDuplicateRegNumber}
      onAddSuccess={addNewVehicleState}
    />

  </div>

    
  );
};

export default VehiclePage;
