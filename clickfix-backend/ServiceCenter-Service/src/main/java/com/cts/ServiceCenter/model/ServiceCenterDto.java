package com.cts.ServiceCenter.model;

//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceCenterDto {
	private int serviceCenterId;
	private String name;
	private String location;
	private long contact;
}
