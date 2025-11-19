package com.cts.bookingservice.model;

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
	@Id
	@NotNull(message = "Vehicle ID cannot be null")
	private int vehicleId;
	@NotNull(message = "User ID cannot be null")
	private int userId;
	@NotBlank(message = "Make is required")
	private String make;
	@NotBlank(message = "Make is required")
	private String model;
	@NotBlank(message = "Year is required")
	private String year;
	@NotBlank(message = "Registration number is required")
	private String registrationNumber;
}
