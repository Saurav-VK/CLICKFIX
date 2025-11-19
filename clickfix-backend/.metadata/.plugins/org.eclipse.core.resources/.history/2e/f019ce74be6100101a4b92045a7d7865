package com.cts.clickfix.vehicleservice.controller;

import com.cts.clickfix.vehicleservice.model.AdminVehicleDto;

import com.cts.clickfix.vehicleservice.model.VehicleDto;



import com.cts.clickfix.vehicleservice.service.VehicleService;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/vehicle-api")
//@CrossOrigin(origins = "http://localhost:5173") // remove when API gateway is ready
public class VehicleController {
	@Autowired
	private VehicleService vehicleService;
	
	@PostMapping("/vehicle")
	public ResponseEntity<VehicleDto> addVehicles(@RequestBody VehicleDto vehicleDto) {
		
		VehicleDto vehicledto =  vehicleService.addVehicles(vehicleDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(vehicledto);
	}
	
	@GetMapping("/vehicle/{vehicleId}")
	public  ResponseEntity<VehicleDto> getVehicles(@PathVariable int vehicleId ) {
		VehicleDto vehicle = vehicleService.getVehicle(vehicleId);
	    if (vehicle == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	    return ResponseEntity.ok(vehicle);
	}
	
	@GetMapping("/allvehicles/{userId}")
	public ResponseEntity<List<VehicleDto>> getAllVehicles(@PathVariable int userId) {
	    List<VehicleDto> vehicles = vehicleService.getAllVehiclesByUserId(userId);
	    if (vehicles.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	    return ResponseEntity.ok(vehicles);
	}

	@PutMapping("/vehicle")
	public ResponseEntity<VehicleDto> updateVehicle(@RequestBody VehicleDto vehicleDto) {
		VehicleDto updatedVehicle = vehicleService.updateVehicle(vehicleDto);
	    if (updatedVehicle == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	    return ResponseEntity.ok(updatedVehicle);
	}
	
	@DeleteMapping("/vehicle/{vehicleId}")
	public ResponseEntity<String> deleteVehicleById(@PathVariable int vehicleId) {
		String result = vehicleService.deleteVehicle(vehicleId);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile file) {
        String imageUrl = vehicleService.storeImage(file);
        return ResponseEntity.ok(Map.of("url", imageUrl));
	}
	
	@GetMapping("/getvehicleid/{registration-number}")
	public int getVehicleIdFromName(@PathVariable("registration-number") String regNo) {
		return vehicleService.getIdFromRegNo(regNo);
	}
	
	@GetMapping("/admin/vehicle")
	public ResponseEntity<List<AdminVehicleDto>> getAllVehiclesAdmin(){
		List<AdminVehicleDto> superList = vehicleService.getAllVehiclesAdmin();
		return ResponseEntity.ok(superList);
	}
}
