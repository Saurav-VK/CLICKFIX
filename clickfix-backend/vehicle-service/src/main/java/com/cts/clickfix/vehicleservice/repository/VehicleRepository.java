package com.cts.clickfix.vehicleservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.clickfix.vehicleservice.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
	List<Vehicle> findByUserId(int userId);
	Optional<Vehicle> findByRegistrationNumber(String registrationNumber);
}
