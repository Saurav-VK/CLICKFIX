package com.cts.bookingservice.appconfig;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.cts.bookingservice.model.ServiceTypeDto;


@FeignClient(name = "SERVICETYPE-SERVICE")
public interface ServiceTypeFeignClient {
	    @GetMapping("/servicetype/get/all")
		public ResponseEntity<List<ServiceTypeDto>>  getAllServiceTypes();
			
		
}
