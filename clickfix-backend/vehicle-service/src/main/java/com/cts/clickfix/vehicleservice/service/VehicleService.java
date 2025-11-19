package com.cts.clickfix.vehicleservice.service;

import java.util.List;



import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.cts.clickfix.vehicleservice.model.AdminVehicleDto;
import com.cts.clickfix.vehicleservice.model.VehicleDto;
public interface VehicleService {
	
	 VehicleDto addVehicles(@RequestBody VehicleDto vehicleDto);
	 VehicleDto getVehicle(int userId);
	 VehicleDto updateVehicle(VehicleDto vehicleDto);
	 String deleteVehicle(int vehicleId);
	List<VehicleDto> getAllVehiclesByUserId(int userId);
	public int getIdFromRegNo(String name);
	String storeImage(MultipartFile file);

	List<AdminVehicleDto> getAllVehiclesAdmin();
}
