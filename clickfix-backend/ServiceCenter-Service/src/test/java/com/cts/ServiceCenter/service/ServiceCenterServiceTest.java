package com.cts.ServiceCenter.service;

import com.cts.ServiceCenter.entity.ServiceCenter;
import com.cts.ServiceCenter.exception.ServiceCenterNotFoundException;
import com.cts.ServiceCenter.model.ServiceCenterDto;
import com.cts.ServiceCenter.repository.ServiceCenterRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ServiceCenterServiceTest {

    private ServiceCenterRepository serviceCenterRepository;
    private ModelMapper modelMapper;
    private ServiceCenterService serviceCenterService;

    private ServiceCenter entity;
    private ServiceCenterDto dto;

    @BeforeEach
    void setup() {
        serviceCenterRepository = mock(ServiceCenterRepository.class);
        modelMapper = mock(ModelMapper.class);
        serviceCenterService = new ServiceCenterService();
        serviceCenterService.serviceCenterRepository = serviceCenterRepository;
        serviceCenterService.modelMapper = modelMapper;

        entity = new ServiceCenter();
        entity.setServiceCenterId(1);
        entity.setName("FixPro");
        entity.setLocation("Bangalore");

        dto = new ServiceCenterDto();
        dto.setServiceCenterId(1);
        dto.setName("FixPro");
        dto.setLocation("Bangalore");
    }

    @Test
    void testAddServiceCenter_NewEntry() {
        when(serviceCenterRepository.existsById(1)).thenReturn(false);
        when(modelMapper.map(dto, ServiceCenter.class)).thenReturn(entity);
        when(serviceCenterRepository.save(entity)).thenReturn(entity);
        when(modelMapper.map(entity, ServiceCenterDto.class)).thenReturn(dto);

        ServiceCenterDto result = serviceCenterService.addServiceCenter(dto);

        assertEquals("FixPro", result.getName());
    }

    @Test
    void testAddServiceCenter_Duplicate_ThrowsException() {
        when(serviceCenterRepository.existsById(1)).thenReturn(true);
        assertThrows(ServiceCenterNotFoundException.class, () -> serviceCenterService.addServiceCenter(dto));
    }

    @Test
    void testGetServiceCenterById_Success() {
        when(serviceCenterRepository.findById(1)).thenReturn(Optional.of(entity));
        when(modelMapper.map(entity, ServiceCenterDto.class)).thenReturn(dto);

        ServiceCenterDto result = serviceCenterService.getServiceCenterById(1);

        assertNotNull(result);
        assertEquals("FixPro", result.getName());
    }

    @Test
    void testGetServiceCenterById_NotFound() {
        when(serviceCenterRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(ServiceCenterNotFoundException.class, () -> serviceCenterService.getServiceCenterById(1));
    }

    @Test
    void testGetAllServiceCenters() {
        List<ServiceCenter> entities = List.of(entity);
        when(serviceCenterRepository.findAll()).thenReturn(entities);
        when(modelMapper.map(entity, ServiceCenterDto.class)).thenReturn(dto);

        List<ServiceCenterDto> result = serviceCenterService.getAllServiceCenters();

        assertEquals(1, result.size());
        assertEquals("FixPro", result.get(0).getName());
    }

    @Test
    void testDeleteServiceCenterById_Found() {
        when(serviceCenterRepository.findById(1)).thenReturn(Optional.of(entity));

        boolean result = serviceCenterService.deleteServiceCenterById(1);

        assertTrue(result);
        verify(serviceCenterRepository).deleteById(1);
    }

    @Test
    void testDeleteServiceCenterById_NotFound() {
        when(serviceCenterRepository.findById(1)).thenReturn(Optional.empty());

        boolean result = serviceCenterService.deleteServiceCenterById(1);

        assertFalse(result);
        verify(serviceCenterRepository, never()).deleteById(anyInt());
    }

    @Test
    void testUpdateServiceCenter_Success() {
        when(serviceCenterRepository.findById(1)).thenReturn(Optional.of(entity));
        when(modelMapper.map(dto, ServiceCenter.class)).thenReturn(entity);

        ServiceCenterDto result = serviceCenterService.updateServiceCenter(dto);

        assertEquals("FixPro", result.getName());
    }

    @Test
    void testUpdateServiceCenter_NotFound() {
        when(serviceCenterRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(ServiceCenterNotFoundException.class, () -> serviceCenterService.updateServiceCenter(dto));
    }
}
