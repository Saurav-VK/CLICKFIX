package com.cts.clickfix.vehicleservice.exception;

import com.cts.clickfix.vehicleservice.model.ApiException;

import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice 
public class ApplicationGlobalException {
	
	@ExceptionHandler(VehicleIdNotFoundException.class)
	public ResponseEntity<ApiException> handleVehicleIdNotFoundExecption (VehicleIdNotFoundException e, HttpServletRequest request, HttpServletResponse response) {
		ApiException apiException= ApiException.builder().code(response.getStatus())
		.message(e.getMessage()).path(request.getRequestURI())
		.when(new Date()).build();
		return ResponseEntity.status(response.getStatus()).body(apiException);
	}
	
	@ExceptionHandler(exception = VehicleUpdateFailureException.class)
	public ResponseEntity<ApiException> handleMecahnicIdIsNotAvailable(VehicleUpdateFailureException e,
			HttpServletRequest request,HttpServletResponse response) {
		ApiException apiException=ApiException.builder().code(response.getStatus())
				.message(e.getMessage()).path(request.getRequestURI())
				.when(new Date()).build();
		return ResponseEntity.status(response.getStatus()).body(apiException);
	}
	
	@ExceptionHandler(exception = NoVehiclesFoundException.class)
	public ResponseEntity<ApiException> handleNoVehiclesFoundException(NoVehiclesFoundException e,
			HttpServletRequest request,HttpServletResponse response) {
		ApiException apiException=ApiException.builder().code(response.getStatus())
				.message(e.getMessage()).path(request.getRequestURI())
				.when(new Date()).build();
		return ResponseEntity.status(response.getStatus()).body(apiException);
	}
	
	
	
	@ExceptionHandler(exception = MethodArgumentNotValidException.class)
	public ResponseEntity<ApiException> handleMethodArgumentNotValidException(MethodArgumentNotValidException e,
			HttpServletRequest request, HttpServletResponse response) {
			List<FieldError> listFieldErrors=e.getFieldErrors();
			StringBuilder sb=new StringBuilder();
			for (FieldError fieldError : listFieldErrors) {
				sb.append(fieldError.getField()+" : "+fieldError.getDefaultMessage());
				sb.append(System.lineSeparator());
				
			}
			ApiException apiException=ApiException.builder().code(response.getStatus())
			.path(request.getRequestURI())
			.when(new Date()).message(sb.toString()).build();
			return ResponseEntity.status(response.getStatus()).body(apiException);

	}
	
}