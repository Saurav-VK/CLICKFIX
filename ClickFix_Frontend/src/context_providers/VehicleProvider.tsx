import React, { useState } from "react";
import { VehicleContext } from "../context/VehicleContext";
import type { Vehicle } from "../types/vehicle.types";

export const VehicleProvider = ({ children }: { children: React.ReactNode }) => {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);

  return (
    <VehicleContext.Provider value={{ vehicleList, setVehicleList }}>
      {children}
    </VehicleContext.Provider>
  );
};
