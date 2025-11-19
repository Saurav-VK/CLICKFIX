package com.cts.Mechanic.service;

import com.cts.Mechanic.entity.Mechanic;
import com.cts.Mechanic.exception.MechanicNotFoundException;
import com.cts.Mechanic.exception.ServiceCenterNotFoundException;
import com.cts.Mechanic.model.MechanicDto;
import com.cts.Mechanic.repository.MechanicRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MechanicServiceTest {

    private MechanicRepository mechanicRepository;
    private ModelMapper modelMapper;
    private MechanicService mechanicService;

    private Mechanic mechanic;
    private MechanicDto mechanicDto;

    @BeforeEach
    void setup() {
        mechanicRepository = mock(MechanicRepository.class);
        modelMapper = mock(ModelMapper.class);
        mechanicService = new MechanicService();
        mechanicService.mechanicRepository = mechanicRepository;
        mechanicService.modelMapper = modelMapper;

        mechanic = new Mechanic();
        mechanic.setMechanicId(1);
        mechanic.setName("Test Mechanic");
        mechanic.setServiceCenterId(100);

        mechanicDto = new MechanicDto();
        mechanicDto.setMechanicId(1);
        mechanicDto.setName("Test Mechanic");
        mechanicDto.setServiceCenterId(100);
    }

    @Test
    void testAddMechanic_WhenNotExists() {
        when(mechanicRepository.existsById(1)).thenReturn(false);
        when(modelMapper.map(mechanicDto, Mechanic.class)).thenReturn(mechanic);
        when(mechanicRepository.save(mechanic)).thenReturn(mechanic);
        when(modelMapper.map(mechanic, MechanicDto.class)).thenReturn(mechanicDto);

        MechanicDto result = mechanicService.addMechanic(mechanicDto);

        assertEquals(mechanicDto.getName(), result.getName());
    }

    @Test
    void testAddMechanic_WhenExists_ThrowsException() {
        when(mechanicRepository.existsById(1)).thenReturn(true);
        assertThrows(MechanicNotFoundException.class, () -> mechanicService.addMechanic(mechanicDto));
    }

    @Test
    void testGetMechanicById_Success() {
        when(mechanicRepository.findById(1)).thenReturn(Optional.of(mechanic));
        when(modelMapper.map(mechanic, MechanicDto.class)).thenReturn(mechanicDto);

        MechanicDto result = mechanicService.getMechanicById(1);
        assertEquals(mechanicDto.getMechanicId(), result.getMechanicId());
    }

    @Test
    void testGetMechanicById_NotFound() {
        when(mechanicRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(MechanicNotFoundException.class, () -> mechanicService.getMechanicById(1));
    }

    @Test
    void testGetMechanicByServiceCenterId_Success() {
        List<Mechanic> mechanicList = Arrays.asList(mechanic);
        when(mechanicRepository.findByServiceCenterId(100)).thenReturn(mechanicList);
        when(modelMapper.map(mechanic, MechanicDto.class)).thenReturn(mechanicDto);

        List<MechanicDto> result = mechanicService.getMechanicByServiceCenterId(100);
        assertEquals(1, result.size());
    }

    @Test
    void testGetMechanicByServiceCenterId_NotFound() {
        when(mechanicRepository.findByServiceCenterId(100)).thenReturn(Collections.emptyList());
        assertThrows(ServiceCenterNotFoundException.class, () -> mechanicService.getMechanicByServiceCenterId(100));
    }

    @Test
    void testDeleteMechanicById_Success() {
        when(mechanicRepository.findById(1)).thenReturn(Optional.of(mechanic));

        boolean result = mechanicService.deleteMechanicById(1);
        assertTrue(result);
        verify(mechanicRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteMechanicById_NotFound() {
        when(mechanicRepository.findById(1)).thenReturn(Optional.empty());

        boolean result = mechanicService.deleteMechanicById(1);
        assertFalse(result);
    }

    @Test
    void testUpdateMechanic_Success() {
        when(mechanicRepository.findById(1)).thenReturn(Optional.of(mechanic));
        when(modelMapper.map(mechanicDto, Mechanic.class)).thenReturn(mechanic);

        MechanicDto result = mechanicService.updateMechanic(mechanicDto);
        assertEquals(mechanicDto.getName(), result.getName());
    }

    @Test
    void testUpdateMechanic_NotFound() {
        when(mechanicRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(MechanicNotFoundException.class, () -> mechanicService.updateMechanic(mechanicDto));
    }
}
