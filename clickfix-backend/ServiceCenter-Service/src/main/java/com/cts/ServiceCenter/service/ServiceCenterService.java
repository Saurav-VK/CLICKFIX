package com.cts.ServiceCenter.service;

import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.ServiceCenter.entity.ServiceCenter;
import com.cts.ServiceCenter.exception.ServiceCenterNotFoundException;
import com.cts.ServiceCenter.model.ServiceCenterDto;
import com.cts.ServiceCenter.repository.ServiceCenterRepository;

import jakarta.validation.Valid;

@Service
public class ServiceCenterService {

    @Autowired 
    ServiceCenterRepository serviceCenterRepository;

    @Autowired 
    ModelMapper modelMapper;

    public ServiceCenterDto addServiceCenter(@Valid ServiceCenterDto serviceCenterDto) {
        if (serviceCenterRepository.existsById(serviceCenterDto.getServiceCenterId())) {
            throw new ServiceCenterNotFoundException("Service Center already exists");
        }

        ServiceCenter serviceCenter = modelMapper.map(serviceCenterDto, ServiceCenter.class);
        ServiceCenter saved = serviceCenterRepository.save(serviceCenter);
        return modelMapper.map(saved, ServiceCenterDto.class);
    }

    public ServiceCenterDto getServiceCenterById(int serviceCenterId) {
        Optional<ServiceCenter> result = serviceCenterRepository.findById(serviceCenterId);
        if (result.isPresent()) {
            return modelMapper.map(result.get(), ServiceCenterDto.class);
        } else {
            throw new ServiceCenterNotFoundException("Service Center not found");
        }
    }

    public List<ServiceCenterDto> getAllServiceCenters() {
        List<ServiceCenter> centers = serviceCenterRepository.findAll();
        return centers.stream()
                .map(center -> modelMapper.map(center, ServiceCenterDto.class))
                .collect(Collectors.toList());
    }

    public boolean deleteServiceCenterById(int serviceCenterId) {
        Optional<ServiceCenter> result = serviceCenterRepository.findById(serviceCenterId);
        if (result.isPresent()) {
            serviceCenterRepository.deleteById(serviceCenterId);
            return true;
        } else {
            return false;
        }
    }

    public ServiceCenterDto updateServiceCenter(@Valid ServiceCenterDto serviceCenterDto) {
        Optional<ServiceCenter> result = serviceCenterRepository.findById(serviceCenterDto.getServiceCenterId());
        if (result.isPresent()) {
            ServiceCenter updated = modelMapper.map(serviceCenterDto, ServiceCenter.class);
            serviceCenterRepository.save(updated);
            return serviceCenterDto;
        } else {
            throw new ServiceCenterNotFoundException("Service Center not found");
        }
    }
    
    public List<ServiceCenterDto> getAllCenters() {
    	List<ServiceCenter> centers = serviceCenterRepository.findAll();
    	return centers.stream().map(center -> modelMapper.map(center, ServiceCenterDto.class)).collect(Collectors.toList());
    }
    
    public int getServiceCenterIdFromName(String center) {
    	List<ServiceCenterDto> centers = getAllCenters();
    	int scid = 0;
        for(ServiceCenterDto s_center : centers) {
        	if(s_center.getName().equals(center)) {
        		scid = s_center.getServiceCenterId();
        	}
        }
    	return scid;
    }
}

