package com.cts.ServiceType.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.ServiceType.entity.ServiceType;
import com.cts.ServiceType.exception.ServiceTypeNotFoundException;
import com.cts.ServiceType.model.ServiceTypeDetails;
import com.cts.ServiceType.model.ServiceTypeDto;
import com.cts.ServiceType.repository.ServiceTypeRepository;

import jakarta.validation.Valid;

@Service
public class ServiceTypeService {

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private ModelMapper modelMapper;

    public ServiceTypeDto addServiceType(@Valid ServiceTypeDto serviceTypeDto) {
        if (serviceTypeRepository.existsById(serviceTypeDto.getServiceTypeId())) {
            throw new ServiceTypeNotFoundException("Service Type already exists");
        }

        ServiceType serviceType = modelMapper.map(serviceTypeDto, ServiceType.class);
        ServiceType saved = serviceTypeRepository.save(serviceType);
        return modelMapper.map(saved, ServiceTypeDto.class);
    }

    public ServiceTypeDto getServiceTypeById(int serviceTypeId) {
        Optional<ServiceType> result = serviceTypeRepository.findById(serviceTypeId);
        if (result.isPresent()) {
            return modelMapper.map(result.get(), ServiceTypeDto.class);
        } else {
            throw new ServiceTypeNotFoundException("Service Type not found");
        }
    }

    public List<ServiceTypeDto> getAllServiceTypes() {
        List<ServiceType> types = serviceTypeRepository.findAll();
        return types.stream()
                .map(type -> modelMapper.map(type, ServiceTypeDto.class))
                .collect(Collectors.toList());
    }

    public boolean deleteServiceTypeById(int serviceTypeId) {
        Optional<ServiceType> result = serviceTypeRepository.findById(serviceTypeId);
        if (result.isPresent()) {
            serviceTypeRepository.deleteById(serviceTypeId);
            return true;
        } else {
            return false;
        }
    }

    public ServiceTypeDto updateServiceType(@Valid ServiceTypeDto serviceTypeDto) {
        Optional<ServiceType> result = serviceTypeRepository.findById(serviceTypeDto.getServiceTypeId());
        if (result.isPresent()) {
            ServiceType updated = modelMapper.map(serviceTypeDto, ServiceType.class);
            serviceTypeRepository.save(updated);
            return serviceTypeDto;
        } else {
            throw new ServiceTypeNotFoundException("Service Type not found");
        }
    }
    
    public ServiceTypeDetails serviceIdByName(String serviceName) {
    	Optional<ServiceType> serviceType = Optional.of(serviceTypeRepository.findByServiceName(serviceName));
    	ServiceTypeDetails details = null;
    	if(serviceType.isPresent()) {
    		ServiceType service = serviceType.get();
    		ServiceTypeDto serviceDto = modelMapper.map(service, ServiceTypeDto.class);
    		details = ServiceTypeDetails.builder().serviceTypeId(serviceDto.getServiceTypeId()).price(serviceDto.getPrice()).build();
    	}
    	return details;
    }
}
