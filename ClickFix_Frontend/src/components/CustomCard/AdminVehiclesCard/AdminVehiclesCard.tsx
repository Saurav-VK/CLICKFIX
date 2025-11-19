import { Button, Card, Table } from "react-bootstrap";
import './AdminVehicleCard.css';
import type { Vehicle } from "../../../types/vehicle.types";

type Props = {
  user: {
    userId: number;
    name: string;
    phoneNo: string;
    userVehicleList: Vehicle[];
  };
  onPreview: (vehicle: Vehicle) => void;
  onUpdate: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
  onAdd: (userId : number) => void
};

function AdminVehiclesCard({ user, onPreview, onUpdate, onDelete, onAdd }: Props) {
  const { userId, name, phoneNo, userVehicleList } = user;

  return (
    <Card key={user.userId} className="rounded user-card-admin">
      <Card.Body>
        <Card.Title>
          <div className="userCard-title-admin">
            <div className="p-2">{userId} — {name} — {phoneNo}</div>
            <Button onClick={() => onAdd(userId)}>ADD</Button>
          </div>
        </Card.Title>
        <div className="p-2">
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Registration Number</th>
                <th>IMG Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userVehicleList) && userVehicleList.map((vehicle, index) => (
                <tr key={vehicle.vehicleId}>
                  <td>{index + 1}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>
                    <Button onClick={() => onPreview(vehicle)}>Preview</Button>
                  </td>
                  <td>
                    <Button className="me-3 mb-2" onClick={() => onUpdate(vehicle)}>Update</Button>
                    <Button className="me-3 mb-2" onClick={() => onDelete(vehicle)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AdminVehiclesCard;
