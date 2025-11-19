package com.cts.clickfix.vehicleservice.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminVehicleDto {
	@Positive(message = "Id cannot be negative")
	private Integer userId;
	@NotNull(message = "Name cannot be null")
	@Pattern(regexp = "^[A-Za-z ]{2,50}$",message = "Name must contain only letters and spaces (2–50 characters)")
	private String name;
	
	@Email(message = "email is not valid", regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    @Column(unique = true, nullable = false)
	private String email;
	@Pattern(regexp = "^[6-9]\\d{9}$",message = "Phone number must be a valid 10-digit number")
	private String phone;
	
	private List<VehicleDto>  userVehicleList;
}
