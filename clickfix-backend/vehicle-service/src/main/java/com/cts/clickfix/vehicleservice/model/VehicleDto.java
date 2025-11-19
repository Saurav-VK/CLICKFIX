package com.cts.clickfix.vehicleservice.model;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleDto {
	
	private Integer vehicleId;
	
	@NotNull(message = "User ID cannot be null")
	private int userId;
	@NotBlank(message = "Make is required")
	private String make;
	@NotBlank(message = "model is required")
	private String model;
	@NotBlank(message = "Year is required")
	private String year;
	@NotBlank(message = "Registration number is required")
	private String registrationNumber;
	@NotBlank(message = "An image url is required")
	private String url;
}