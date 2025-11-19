package com.cts.Mechanic.contoller;

import com.cts.Mechanic.controller.MechanicController;
import com.cts.Mechanic.model.MechanicDto;
import com.cts.Mechanic.service.MechanicService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class MechanicControllerTest {

    @Mock
    private MechanicService mechanicService;

    @InjectMocks
    private MechanicController mechanicController;

    private MechanicDto mechanicDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mechanicDto = new MechanicDto();
        mechanicDto.setMechanicId(1);
        mechanicDto.setName("John Doe");
        mechanicDto.setServiceCenterId(10);
    }

    @Test
    void testAddMechanic() {
        when(mechanicService.addMechanic(any(MechanicDto.class))).thenReturn(mechanicDto);

        ResponseEntity<MechanicDto> response = mechanicController.addMechanic(mechanicDto);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals("John Doe", response.getBody().getName());
    }

    @Test
    void testGetMechanicById() {
        when(mechanicService.getMechanicById(1)).thenReturn(mechanicDto);

        MechanicDto response = mechanicController.getMechanicById(1);

        assertNotNull(response);
        assertEquals(1, response.getMechanicId());
    }

    @Test
    void testGetMechanicByServiceCenterId() {
        when(mechanicService.getMechanicByServiceCenterId(10)).thenReturn(Arrays.asList(mechanicDto));

        List<MechanicDto> list = mechanicController.getMechanicByServiceCenterId(10);

        assertEquals(1, list.size());
        assertEquals(10, list.get(0).getServiceCenterId());
    }

    @Test
    void testDeleteMechanicByIdSuccess() {
        when(mechanicService.deleteMechanicById(1)).thenReturn(true);

        String result = mechanicController.deleteMechanicById(1);

        assertTrue(result.contains("deleted"));
    }

    @Test
    void testDeleteMechanicByIdFail() {
        when(mechanicService.deleteMechanicById(1)).thenReturn(false);

        String result = mechanicController.deleteMechanicById(1);

        assertTrue(result.contains("not deleted"));
    }

    @Test
    void testUpdateMechanic() {
        when(mechanicService.updateMechanic(any(MechanicDto.class))).thenReturn(mechanicDto);

        MechanicDto updated = mechanicController.updateMechanic(mechanicDto);

        assertEquals("John Doe", updated.getName());
    }
}
