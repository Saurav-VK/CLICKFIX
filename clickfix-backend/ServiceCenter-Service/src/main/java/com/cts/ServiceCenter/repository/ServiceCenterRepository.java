package com.cts.ServiceCenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.cts.ServiceCenter.entity.ServiceCenter;
 
@Repository
public interface ServiceCenterRepository extends JpaRepository< ServiceCenter , Integer> {

}
