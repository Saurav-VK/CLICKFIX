package com.cts.bookingservice.appconfig;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.bookingservice.model.VehicleDto;

@FeignClient(name = "VEHICLE-SERVICE")
public interface VehicleFeignClient {
     @GetMapping(value = "/vehicle-api/allvehicles/{userId}")
     public ResponseEntity<List<VehicleDto>> getAllVehicles(@PathVariable("userId") int userId);
     @GetMapping("/vehicle-api/getvehicleid/{registration-Number}")
     public int getIdFromRegNo(@PathVariable("registration-Number") String vehicleName);
}
