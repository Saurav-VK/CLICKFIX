package com.cts.ServiceCenter.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ServiceCenter {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "service_center_id_generator")
	@SequenceGenerator(name = "service_center_id_generator" , sequenceName = "service_center_id" , initialValue = 1 , allocationSize = 1)
	private int serviceCenterId;
	private String name;
	private String location;
	private long contact;

}
