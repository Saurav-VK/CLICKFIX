package com.cts.Mechanic.model;

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
public class MechanicDto {
	private Integer mechanicId;
	@NotNull
	@Positive
	private int serviceCenterId;
	private String name;
	private String expertise;
}
