package com.cts.Mechanic.service;

import java.util.List;


import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;


import com.cts.Mechanic.entity.Mechanic;
import com.cts.Mechanic.exception.MechanicNotFoundException;
import com.cts.Mechanic.exception.ServiceCenterNotFoundException;
import com.cts.Mechanic.model.MechanicDto;
import com.cts.Mechanic.repository.MechanicRepository;

import jakarta.validation.Valid;

@Service
public class MechanicService {
	
	@Autowired
	MechanicRepository mechanicRepository;
	
	@Autowired
	ModelMapper modelMapper;
	
	public MechanicDto addMechanic(@Valid MechanicDto mechanicDto) {

			System.out.println(mechanicDto);
			Mechanic m1 = modelMapper.map(mechanicDto, Mechanic.class);
			Mechanic result = mechanicRepository.save(m1);
			
			MechanicDto mdto = modelMapper.map(result, MechanicDto.class);
			return mdto ;
	}
	
	
	public MechanicDto getMechanicById(@Validated int mechanicId) {
		Optional<Mechanic> resEnt = mechanicRepository.findById(mechanicId);
		if (resEnt.isPresent()) {
			MechanicDto mechanicDto = modelMapper.map(resEnt.get(), MechanicDto.class);
				System.out.println("Mechanic found!");
				System.out.println(mechanicDto);		
			return mechanicDto;
		} else {
			System.out.println("Mechanic not found!");
			throw new MechanicNotFoundException("Mechanic doesn't exists");
			}
		}
	
	public List<MechanicDto> getAllMechanics() {
        List<Mechanic> mechanics = mechanicRepository.findAll();
        return mechanics.stream()
                .map(mechanic -> modelMapper.map(mechanic, MechanicDto.class))
                .collect(Collectors.toList());
    }
	
	public List<MechanicDto> getMechanicByServiceCenterId(int serviceCenterId) {
		List<Mechanic> resEnt = mechanicRepository.findByServiceCenterId(serviceCenterId);
		if (resEnt.size() > 0) {
//			MechanicDto mechanicDto = modelMapper.map(resEnt.get(), MechanicDto.class);
//				System.out.println("Mechanic found!");
//				System.out.println(mechanicDto);
//			return mechanicDto;
			
			
			List<MechanicDto> resList = resEnt.stream().map( mdto -> modelMapper.map(mdto, MechanicDto.class)).collect(Collectors.toList());
			return resList;
		} else {
			System.out.println("Service Center not found!");
			throw new ServiceCenterNotFoundException("Service Center doesn't exist / no mechanic in the service center");
		}	
	}
	
	
	public  boolean deleteMechanicById(int mechanicId) {
		Optional<Mechanic> resEnt = mechanicRepository.findById(mechanicId);
		if(resEnt.isPresent()) {
				System.out.println("Mechanic found!");
			mechanicRepository.deleteById(mechanicId);
				System.out.println("Mechanic "+ mechanicId +" Deleted! ");
			return true;
		 }
		else {
			System.out.println("Mechanic not found!");
			return false;
		}
	}
	
	
	public MechanicDto updateMechanic(@Valid MechanicDto mechanicDto ) {
		Optional<Mechanic> mechanic = mechanicRepository.findById(mechanicDto.getMechanicId());
		if(mechanic.isPresent()) {
			Mechanic dispObj = modelMapper.map(mechanicDto, Mechanic.class);
			mechanicRepository.save(dispObj);		
            return mechanicDto;
		}else {
			throw new MechanicNotFoundException("Mechanic doesn't exist");
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
