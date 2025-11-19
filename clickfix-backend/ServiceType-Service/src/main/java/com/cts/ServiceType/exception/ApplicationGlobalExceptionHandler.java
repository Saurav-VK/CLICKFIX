package com.cts.ServiceType.exception;

import java.util.Date;

import java.util.List;

import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cts.ServiceType.model.ApiException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class ApplicationGlobalExceptionHandler {
	
//	@ExceptionHandler(exception = MechanicNotFoundException.class)
//	public ApiException handleMechanicNotFoundException(MechanicNotFoundException e, HttpServletRequest request, HttpServletResponse response) {
//		ApiException apiException= new ApiException();
//		apiException.setCode(response.getStatus());
//		apiException.setMessage(e.getMessage());
//		apiException.setPath(request.getRequestURI());
//		apiException.setDate(new Date());
//		
//		return apiException;
//	}
	
	
//	@ExceptionHandler(exception = ServiceCenterNotFoundException.class)
//	public ApiException handleServiceCenterNotFoundException(ServiceCenterNotFoundException e, HttpServletRequest request, HttpServletResponse response) {
//		ApiException apiException= ApiException.builder().code(response.getStatus()).message(e.getMessage())
//									.path(request.getRequestURI()).date(new Date()).build();
//		return apiException;
//	}
	
	
	
	
	
	@ExceptionHandler(exception = MethodArgumentNotValidException.class)
	public ApiException handleMethodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request, HttpServletResponse response) {
		List<FieldError> fieldError = e.getFieldErrors();
		StringBuilder stringBuilder = new StringBuilder();
		for (FieldError fE : fieldError) {
			stringBuilder.append(fE.getField() + " : " + fE.getDefaultMessage() + System.lineSeparator());
		}
		ApiException apiException = ApiException.builder().code(response.getStatus()).message(stringBuilder.toString())
				.path(request.getRequestURI()).date(new Date()).build();
		
		return apiException;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}	






