package com.cts.bookingservice.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceTypeDto {
	@NotNull
	@Positive(message = "serviceCenterId needs to be a positive integer!")
	private int serviceTypeId;
	private String description;
	private int price;
	@NotNull(message = "Please enter a Service")
	private String serviceName;
}
