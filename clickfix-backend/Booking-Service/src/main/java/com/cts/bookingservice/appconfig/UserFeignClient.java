package com.cts.bookingservice.appconfig;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.bookingservice.model.UserDto;

@FeignClient(name = "USERSERVICE" ,configuration = FeignClientConfig.class)
public interface UserFeignClient {
     @GetMapping("/users/profile/{userId}")
     public UserDto getUserFromUserId(@PathVariable ("userId") int userId); 
     
}
