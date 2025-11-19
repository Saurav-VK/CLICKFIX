package com.cts.bookingservice.appconfig;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.bookingservice.model.ServiceCenterDto;
import com.cts.bookingservice.model.ServiceDetailsDto;

@FeignClient(name="SERVICECENTER-SERVICE")
public interface ServiceCenterFeignClient {
	@GetMapping(value = "/servicecenter/get/all")
	public ResponseEntity<List<ServiceCenterDto>> getAllServiceCenters(); 
	
	@GetMapping("/servicecenter/getcenter-id/{serviceCenterName}")
	public int getServiceCenterId(@PathVariable ("serviceCenterName") String serviceCenterName);
	
}



