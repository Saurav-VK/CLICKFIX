package com.cts.userservice.entity;

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
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "user_id_generator")
	@SequenceGenerator(name = "user_id_generator" , sequenceName = "user_id" , initialValue = 1876 , allocationSize = 10)
	private int userId;
	private String name;
	private String email;
	private String phone;
	private String address;
	private String passwordHash;

}
