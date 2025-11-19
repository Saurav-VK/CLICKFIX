package com.cts.Mechanic.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import com.cts.Mechanic.model.MechanicDto;

import com.cts.Mechanic.service.MechanicService;


import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/mechanic")
public class MechanicController {
	
//	@Autowired
//	private MechanicRepository mechanicRepository;
//	
//	@Autowired
//	ModelMapper modelMapper;	
	
	@Autowired
	MechanicService mechanicService;
	
	@PostMapping(value= "/add")
	public ResponseEntity<MechanicDto> addMechanic(@Valid @RequestBody MechanicDto mechanicDto) {
		 mechanicDto = mechanicService.addMechanic(mechanicDto);
		 ResponseEntity<MechanicDto> response = new ResponseEntity<>(mechanicDto,HttpStatus.CREATED);
		 return response;
	}
	
	
	@GetMapping(value= "/get/id/{mechanicId}")
	public MechanicDto getMechanicById(@PathVariable int mechanicId) {
			return mechanicService.getMechanicById(mechanicId);
		}
	
	@GetMapping(value= "/get/all")
	public ResponseEntity<List<MechanicDto>> getAllMechanics() {
		List<MechanicDto> list = mechanicService.getAllMechanics();
			return new ResponseEntity<>(list, HttpStatus.OK);
		}
	
	@GetMapping(value= "/get/servicecenterid/{serviceCenterId}")
	public List<MechanicDto> getMechanicByServiceCenterId(@PathVariable int serviceCenterId) {
		return mechanicService.getMechanicByServiceCenterId(serviceCenterId);	
		
	}
	
	@DeleteMapping(value = "/delete/id/{mechanicId}")
	public String deleteMechanicById(@PathVariable int mechanicId) {
		String result=null;
		boolean status= mechanicService.deleteMechanicById(mechanicId);
		if(status) {
			result = "Mechanic "+ mechanicId +" deleted!";
		 }
		else {
			result = "Mechanic "+ mechanicId +" not deleted";
			}
			return result;
		}
	


	@PutMapping(value = "/update")
	public MechanicDto updateMechanic(@RequestBody MechanicDto mechanicDto ) {
		return mechanicService.updateMechanic(mechanicDto);
	}
	
}
