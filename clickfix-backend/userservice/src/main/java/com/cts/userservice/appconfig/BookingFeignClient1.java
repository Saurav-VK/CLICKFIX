package com.cts.userservice.appconfig;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.userservice.model.BookingDto;

@FeignClient(name = "BOOKING-SERVICE")
public interface BookingFeignClient1 {
	
	@GetMapping
	("/booking-api/bookings/user/{userId}")
	public List<BookingDto> getBookingsByUserId(@PathVariable ("userId") int userId);

}
