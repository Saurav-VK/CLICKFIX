package com.cts.clickfix.appconfig;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.clickfix.model.ServiceTypeDto;

@FeignClient(name = "SERVICETYPE-SERVICE")
public interface ServiceTypeFeignClient {
     
	@GetMapping("/get/id/{serviceTypeId}")
	public ResponseEntity<ServiceTypeDto> getServiceById(@PathVariable ("serviceTypeId") int serviceId);
	
}
