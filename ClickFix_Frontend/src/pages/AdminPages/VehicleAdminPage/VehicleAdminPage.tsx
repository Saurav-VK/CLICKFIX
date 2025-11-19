import React, { useEffect, useState } from 'react';
import './VehicleAdminPage.css';
import AdminVehiclesCard from '../../../components/CustomCard/AdminVehiclesCard/AdminVehiclesCard';
import { Stack } from 'react-bootstrap';
import axios from 'axios';
import type { Vehicle } from '../../../types/vehicle.types';
import UpdateVehicleModal from '../../../components/CustomModals/UpdateVehicleModal/UpdateVehicleModal';
import { toast } from 'react-toastify';
import AddVehicleModal from '../../../components/CustomModals/AddVehicleModal/AddVehicleModal';
import VehicleImagePreview from '../../../components/CustomModals/VehicleAdmin/VehicleImagePreview';

type AdminVehicleData = {
  userId: number;
  name: string;
  phoneNo: string;
  userVehicleList: Vehicle[];
};

function VehicleAdminPage() {
  console.log("enterimg my page");
  const [adminVehicles, setAdminVehicles] = useState<AdminVehicleData[]>([]);
  const [vehicleToUpdate, setVehicleToUpdate] = useState<Vehicle | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetUserIdForAdd, setTargetUserIdForAdd] = useState<number | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewVehicle, setPreviewVehicle] = useState<Vehicle | null>(null);
  


  useEffect(() => {
    let token = localStorage.getItem('token');
    console.log("TOKEN FOR VEHICLE ACCESS :" +token);
    axios.get('http://localhost:9999/vehicle-api/admin/vehicle' , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } )
      .then(response => setAdminVehicles(response.data))
      .catch(error => console.error('Failed to fetch admin vehicle data:', error));
  }, []);


  const isDuplicateRegNumber = (newVehicle: Vehicle): boolean => {
    return adminVehicles.some(user =>
      user.userVehicleList.some(existingVehicle =>
        existingVehicle.registrationNumber === newVehicle.registrationNumber &&
        existingVehicle.vehicleId !== newVehicle.vehicleId
      )
    );
  };
  

  
  const addVehicleState = (
    userId: number,
    newVehicle: {
      vehicleId: number;
      make: string;
      model: string;
      year: string;
      url: string;
      registrationNumber: string;
    }
  ) => {
    setAdminVehicles(prev =>
      prev.map(user =>
        user.userId === userId
          ? {
              ...user,
              userVehicleList: [
                ...user.userVehicleList,
                { userId, ...newVehicle }
              ]
            }
          : user
      )
    );
  };
  
  const updateVehicleState = (userId: number, vehicleId: number, newMake: string, newmodel: string, newUrl: string, newregistrationNumber : string, newYear : string) => {
    setAdminVehicles(prev =>
      prev.map(user =>
        user.userId === userId
          ? {
              ...user,
              userVehicleList: user.userVehicleList.map(vehicle =>
                vehicle.vehicleId === vehicleId
                  ? { ...vehicle, make: newMake, model: newmodel, url: newUrl , registrationNumber : newregistrationNumber, year : newYear }
                  : vehicle
              )
            }
          : user
      )
    );
  };


  const deleteVehicleState = (userId: number, vehicleId: number) => {
    setAdminVehicles(prev =>
      prev.map(user =>
        user.userId === userId
          ? {
              ...user,
              userVehicleList: user.userVehicleList.filter(
                vehicle => vehicle.vehicleId !== vehicleId
              )
            }
          : user
      )
    );
  };
  

  const handleDeleteClick = async (vehicle:Vehicle) =>{
    try{
      let token = localStorage.getItem('token');
      const response = await toast.promise(
        axios.delete(`http://localhost:9999/vehicle-api/vehicle/${vehicle.vehicleId}` , {
          headers : {
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
        deleteVehicleState(vehicle.userId, vehicle.vehicleId);
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
  }

  const handlePreviewVehicle = (vehicle: Vehicle) => {
    console.log('Preview vehicle:', vehicle);
    setPreviewVehicle(vehicle);
    setShowPreviewModal(true);
   
  };

  const handleUpdateVehicle = (vehicle: Vehicle) => {
    setVehicleToUpdate(vehicle);
    setShowUpdateModal(true);
  };

  // console.log(adminVehicles);

  const handleAddClick = (userId: number) => {
    setTargetUserIdForAdd(userId);
    setShowAddModal(true);
  };
  
  return (
    <div className='vadmin-main'>
      <Stack gap={4}>
        {Array.isArray(adminVehicles) && adminVehicles.map(user => (
          <AdminVehiclesCard
            key={user.userId}
            user={user}
            onPreview={handlePreviewVehicle}
            onUpdate={handleUpdateVehicle}
            onDelete={handleDeleteClick}
            onAdd={handleAddClick}
          />
        ))}
      </Stack>

      <UpdateVehicleModal
        show={showUpdateModal}
        intialVehicleData={vehicleToUpdate}
        onClose={() => {
          setShowUpdateModal(false);
          setVehicleToUpdate(null);
        }}
        onUpdateSucces={(vehicle: Vehicle) => {
          updateVehicleState(vehicle.userId, vehicle.vehicleId, vehicle.make, 
            vehicle.model,vehicle.url, vehicle.registrationNumber,vehicle.year);
          setShowUpdateModal(false);
          setVehicleToUpdate(null);
        }}
      />

<AddVehicleModal
  show={showAddModal}
  onClose={() => {
    setShowAddModal(false);
    setTargetUserIdForAdd(null);
  }}
  validateRegNum={isDuplicateRegNumber}
  setUserId={targetUserIdForAdd || -1}
  onAddSuccess={(vehicle: Vehicle) => {
    if (targetUserIdForAdd !== null) {
      const { vehicleId, make, model, year, url, registrationNumber } = vehicle;
      addVehicleState(targetUserIdForAdd, {
        vehicleId,
        make,
        model,
        year,
        url,
        registrationNumber
      });
    }
    setShowAddModal(false);
    setTargetUserIdForAdd(null);
  }}
  
/>
{showPreviewModal && previewVehicle && (
  <VehicleImagePreview
    show={showPreviewModal}
    preview={previewVehicle.url}
    onClose={() => {
      setShowPreviewModal(false);
      setPreviewVehicle(null);
    }}
  />
)}

    </div>
  );
}

export default VehicleAdminPage;
