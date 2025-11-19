import { Modal } from "react-bootstrap";
import VehicleForm from "../../CustomForms/BasicVehicleForm/BasicVehicleForm";
import type { Vehicle } from "../../../types/vehicle.types";
import axios from "axios";
import { useVehicle } from "../../../custom_hooks/useVehicle";
import { toast } from "react-toastify";

type Props = {
show: boolean;
onClose: () => void;
onAddSuccess: (newVehicle: Vehicle) => void;
validateRegNum: (newVehicle: Vehicle) => boolean;
setUserId?:number;
};

function AddVehicleModal( { show, onClose, onAddSuccess, validateRegNum,setUserId }: Props ){
  

  


  const submitNewVehicle = async (
    newVehicle: Vehicle
  ) => {
    try {
      if(validateRegNum(newVehicle)){
        console.log("Duplicate Registration Numbers Not Allowed!!");
        toast.error('Registration Number already exists',{
          position: 'top-center',
          theme: 'dark',
          autoClose: 3000
        })

      } else{
        console.log(newVehicle);
        if(localStorage.getItem('userRole') === 'admin'){
          if(typeof setUserId === 'number') newVehicle = { ...newVehicle, userId: setUserId };
        }
        let token = localStorage.getItem('token');
        const response = await toast.promise(
          axios.post(`http://localhost:9999/vehicle-api/vehicle`, newVehicle , {
            headers : {
              Authorization : `Bearer ${token}`
            }
          }),
          {
            pending: 'Adding vehicle...',
            success: 'Vehicle Added successfully!',
            error: 'Failed to Add vehicle. Connection to Server Failed.',
          },
          {
            position: 'top-center',
            theme: 'dark',
          }
        );
        console.log(response)
        onAddSuccess(response.data);
      }
      // onClose(); 
    } catch (error) {     
      console.error('Post Request to Server  failed:', error);
      // onClose();
    }
  };


return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header  closeButton>
      <div className="w-100 text-center fw-bold fs-4">Add Vehicle Details</div>
      </Modal.Header>
      <Modal.Body>
        { 
          <VehicleForm
            mode={"add"}
            onSubmit={(newData:Vehicle) => submitNewVehicle(newData)}
            onSuccess={onClose}
          />
        }
      </Modal.Body>
    </Modal>
  );
}

export default AddVehicleModal;