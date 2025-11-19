import { createContext } from "react";
import type { Vehicle } from "../types/vehicle.types";

export const VehicleContext = createContext<{
  vehicleList: Vehicle[];
  setVehicleList: React.Dispatch<React.SetStateAction<Vehicle[]>>;
} | null>(null);