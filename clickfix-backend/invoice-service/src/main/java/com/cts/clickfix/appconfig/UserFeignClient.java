package com.cts.clickfix.appconfig;


import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.clickfix.model.BookingDto;


@FeignClient(name = "USERSERVICE" , configuration = FeignClientConfig.class)
public interface UserFeignClient {
	@GetMapping("/users/bookings/user/{userId}")
	public List<BookingDto> getBookingsByUserId(@PathVariable ("userId") int userId);
}

