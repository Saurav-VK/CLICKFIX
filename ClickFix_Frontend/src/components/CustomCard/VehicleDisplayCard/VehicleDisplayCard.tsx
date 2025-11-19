import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import type { Vehicle } from '../../../types/vehicle.types';
import './VehicleDisplayCard.css';

type vehicleCardProps = {
  vehicle : Vehicle;
  onUpdateClick: (vehicle: Vehicle) => void;
  onDeleteClick: (vehicle: Vehicle) => void;
}
function VehicleCard( { vehicle, onUpdateClick, onDeleteClick } : vehicleCardProps ) {

  const {make, model, year, registrationNumber, url} = vehicle;
  const title = make + " " +model + " " + `[${year}]`;


  return (

    <Card className="vehicle-card" style={{backgroundColor: '#f5f5f5'}}>

      <div className='image-container'>

        <Card.Img
          variant="top"
          src={url}
          style={{ height: "11rem", width: "100%", objectFit: "cover" }}
        />

        <div className='overlay-title'>
          <Card.Title className="overflow-preventer">{title}</Card.Title>
        </div>

      </div>

      <Card.Body>

        <Stack gap={2}>
          <div className="overflow-preventer">
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th><strong>Registration Number:</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>{registrationNumber}</b></td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between">
            <Button variant="primary" className='btn-3d' onClick={() => onUpdateClick(vehicle)}>Update</Button>
            <Button variant="danger" className='btn-3d-danger' onClick={() => onDeleteClick(vehicle)}>Delete</Button>
          </div>
        </Stack>

      </Card.Body>
    </Card>
  );
}

export default VehicleCard;
