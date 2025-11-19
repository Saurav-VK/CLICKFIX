package com.cts.ServiceType.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.cts.ServiceType.entity.ServiceType;
import com.cts.ServiceType.model.ServiceTypeDto;
 
@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType , Integer> {
       public ServiceType findByServiceName(String serviceName);
}
