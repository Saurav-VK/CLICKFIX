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
public class ServiceCenterDto {
	@NotNull
	@Positive(message = "serviceCenterId needs to be a positive integer!")
	private int serviceCenterId;
	private String name;
	private String location;
	private long contact;
}
