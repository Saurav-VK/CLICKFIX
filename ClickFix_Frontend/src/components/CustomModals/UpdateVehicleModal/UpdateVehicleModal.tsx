import Modal from 'react-bootstrap/Modal';
import VehicleForm from '../../CustomForms/BasicVehicleForm/BasicVehicleForm';
import axios from 'axios';
import type { Vehicle } from '../../../types/vehicle.types';

import { toast } from 'react-toastify';

type Props = {
  show: boolean;
  intialVehicleData: Vehicle | null ;
  onClose: () => void;
  onUpdateSucces: (updatedData: Vehicle) => void


};


function VehicleUpdateModel({ show, intialVehicleData, onClose, onUpdateSucces }: Props) {

  function isVehicleDataModified(v1: Vehicle |null , v2: Vehicle): boolean {
    if(!v1) return true;
    return (
      v1.vehicleId !== v2.vehicleId ||
      v1.userId !== v2.userId ||
      v1.make !== v2.make ||
      v1.model !== v2.model ||
      v1.url !== v2.url ||
      v1.registrationNumber !== v2.registrationNumber ||
      v1.year !== v2.year
    );
  } 
  


  const submitVehicleUpdate = async (
    updatedData: Vehicle
  ) => {
    try {
      if(isVehicleDataModified(intialVehicleData, updatedData)){
        let token = localStorage.getItem('token');
        console.log("TOKEN : " + token);
        const response = await toast.promise(
          axios.put(`http://localhost:9999/vehicle-api/vehicle`, updatedData , {
            headers : {
              Authorization : `Bearer ${token}`
            }
          }),
          {
            pending: 'Updating vehicle...',
            success: 'Vehicle updated successfully!',
            error: 'Failed to update vehicle. Connection to Server Failed.',
          },
          {
            position: 'top-center',
            theme: 'dark',
          }
        );
        console.log(response)
        onUpdateSucces(updatedData);
      }
      // onClose(); 
    } catch (error) {
      console.error(' put request to server failed:', error);
      // onClose();
    }
  };
  
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header  closeButton>
      <div className="w-100 text-center fw-bold fs-4">Update Vehicle Details</div>
      </Modal.Header>
      <Modal.Body>
        {intialVehicleData && (
          <VehicleForm
            initialData={intialVehicleData}
            mode={"edit"}
            onSubmit={(updatedData:Vehicle) => submitVehicleUpdate(updatedData)}
            onSuccess={onClose}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default VehicleUpdateModel;
