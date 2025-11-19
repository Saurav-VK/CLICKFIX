package com.cts.ServiceCenter.contoller;

import com.cts.ServiceCenter.controller.ServiceCenterController;
import com.cts.ServiceCenter.model.ServiceCenterDto;
import com.cts.ServiceCenter.service.ServiceCenterService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ServiceCenterControllerTest {

    @Mock
    private ServiceCenterService serviceCenterService;

    @InjectMocks
    private ServiceCenterController serviceCenterController;

    private ServiceCenterDto sampleDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        sampleDto = new ServiceCenterDto();
        sampleDto.setServiceCenterId(1);
        sampleDto.setName("TurboFix");
        sampleDto.setLocation("Chennai");
    }

    @Test
    void testAddServiceCenter() {
        when(serviceCenterService.addServiceCenter(any())).thenReturn(sampleDto);

        ResponseEntity<ServiceCenterDto> response = serviceCenterController.addServiceCenter(sampleDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("TurboFix", response.getBody().getName());
    }

    @Test
    void testGetServiceCenterById() {
        when(serviceCenterService.getServiceCenterById(1)).thenReturn(sampleDto);

        ResponseEntity<ServiceCenterDto> response = serviceCenterController.getServiceCenterById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().getServiceCenterId());
    }

    @Test
    void testGetAllServiceCenters() {
        when(serviceCenterService.getAllServiceCenters()).thenReturn(List.of(sampleDto));

        ResponseEntity<List<ServiceCenterDto>> response = serviceCenterController.getAllServiceCenters();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void testDeleteServiceCenterById_Deleted() {
        when(serviceCenterService.deleteServiceCenterById(1)).thenReturn(true);

        ResponseEntity<String> response = serviceCenterController.deleteServiceCenterById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().contains("deleted"));
    }

    @Test
    void testDeleteServiceCenterById_NotFound() {
        when(serviceCenterService.deleteServiceCenterById(1)).thenReturn(false);

        ResponseEntity<String> response = serviceCenterController.deleteServiceCenterById(1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().contains("not found"));
    }

    @Test
    void testUpdateServiceCenter() {
        when(serviceCenterService.updateServiceCenter(sampleDto)).thenReturn(sampleDto);

        ResponseEntity<ServiceCenterDto> response = serviceCenterController.updateServiceCenter(sampleDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("TurboFix", response.getBody().getName());
    }
}

