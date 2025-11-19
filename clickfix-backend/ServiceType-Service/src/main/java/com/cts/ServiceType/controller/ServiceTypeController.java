package com.cts.ServiceType.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cts.ServiceType.model.ServiceTypeDetails;
import com.cts.ServiceType.model.ServiceTypeDto;
//import com.cts.ServiceType.service.ServiceCenterService;
import com.cts.ServiceType.service.ServiceTypeService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/servicetype")
public class ServiceTypeController {

	@Autowired
	private ServiceTypeService serviceTypeService;
	
	
    @PostMapping("/add")
    public ResponseEntity<ServiceTypeDto> addServiceType(@RequestBody ServiceTypeDto serviceTypeDto) {
        ServiceTypeDto savedDto = serviceTypeService.addServiceType(serviceTypeDto);
        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);
    }

    @GetMapping("/get/id/{serviceTypeId}")
    public ResponseEntity<ServiceTypeDto> getServiceTypeById(@PathVariable int serviceTypeId) {
        ServiceTypeDto dto = serviceTypeService.getServiceTypeById(serviceTypeId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<ServiceTypeDto>> getAllServiceTypes() {
        List<ServiceTypeDto> list = serviceTypeService.getAllServiceTypes();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @DeleteMapping("/delete/id/{serviceTypeId}")
    public ResponseEntity<String> deleteServiceTypeById(@PathVariable int serviceTypeId) {
        boolean deleted = serviceTypeService.deleteServiceTypeById(serviceTypeId);
        if (deleted) {
            return new ResponseEntity<>("Service Type " + serviceTypeId + " deleted!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Service Type " + serviceTypeId + " not found!", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ServiceTypeDto> updateServiceType(@Valid @RequestBody ServiceTypeDto serviceTypeDto) {
        ServiceTypeDto updatedDto = serviceTypeService.updateServiceType(serviceTypeDto);
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }
    
    @GetMapping("/getserviceid/{serviceName}")
    public ServiceTypeDetails serviceIdByName(@PathVariable("serviceName") String serviceName) {
    	return serviceTypeService.serviceIdByName(serviceName);
    }
}
