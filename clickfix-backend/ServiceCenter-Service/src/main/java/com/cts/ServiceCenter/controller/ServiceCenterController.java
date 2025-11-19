package com.cts.ServiceCenter.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cts.ServiceCenter.model.ServiceCenterDto;
import com.cts.ServiceCenter.service.ServiceCenterService;
import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/servicecenter")
public class ServiceCenterController {

    @Autowired
    private ServiceCenterService serviceCenterService;

    @PostMapping("/add")
    public ResponseEntity<ServiceCenterDto> addServiceCenter(@Valid @RequestBody ServiceCenterDto serviceCenterDto) {
        ServiceCenterDto savedDto = serviceCenterService.addServiceCenter(serviceCenterDto);
        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);
    }

    @GetMapping("/get/{serviceCenterId}")
    public ResponseEntity<ServiceCenterDto> getServiceCenterById(@PathVariable int serviceCenterId) {
        ServiceCenterDto dto = serviceCenterService.getServiceCenterById(serviceCenterId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<ServiceCenterDto>> getAllServiceCenters() {
        List<ServiceCenterDto> list = serviceCenterService.getAllServiceCenters();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{serviceCenterId}")
    public ResponseEntity<String> deleteServiceCenterById(@PathVariable int serviceCenterId) {
        boolean deleted = serviceCenterService.deleteServiceCenterById(serviceCenterId);
        if (deleted) {
            return new ResponseEntity<>("Service Center " + serviceCenterId + " deleted!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Service Center " + serviceCenterId + " not found!", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ServiceCenterDto> updateServiceCenter(@Valid @RequestBody ServiceCenterDto serviceCenterDto) {
        ServiceCenterDto updatedDto = serviceCenterService.updateServiceCenter(serviceCenterDto);
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }
    
    @GetMapping("/getcenter-id/{serviceCenterName}")
    public int getServiceCenterId(@PathVariable("serviceCenterName") String name) {
    	return serviceCenterService.getServiceCenterIdFromName(name);
    }
}
