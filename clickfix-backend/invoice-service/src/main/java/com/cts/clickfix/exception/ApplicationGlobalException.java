package com.cts.clickfix.exception;

import java.util.Date;
import java.util.List;

import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cts.clickfix.model.ApiException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class ApplicationGlobalException {
	
	@ExceptionHandler(exception = InvoiceNotFoundException.class)
	public ApiException handleInvoiceIdNotFoundException(InvoiceNotFoundException e , HttpServletRequest request , HttpServletResponse response) {
		
		ApiException apiException = new ApiException();
		apiException.setCode(response.getStatus());
		apiException.setMessage(e.getMessage());
		apiException.setPath(request.getRequestURI());
		apiException.setWhen(new Date());
		
		return apiException;
	}
	
    
	@ExceptionHandler(exception = InvalidPaymentStatusException.class)
    public ApiException handleInvalidPaymentStatusException(InvalidPaymentStatusException e , HttpServletRequest request , HttpServletResponse response) {
    	
    	ApiException apiException = ApiException.builder().code(response.getStatus()).message(e.getMessage()).path(request.getRequestURI()).when(new Date()).build();
    	return apiException;
    }
	
	
	@ExceptionHandler(exception = InvoiceAlreadyExistsException.class)
	public ApiException handleInvoiceAlreadyExistsException(InvoiceAlreadyExistsException e , HttpServletRequest request , HttpServletResponse response) {
		ApiException apiException = ApiException.builder().code(response.getStatus()).message(e.getMessage()).path(request.getRequestURI()).when(new Date()).build();
		return apiException;
	}
	
	@ExceptionHandler(exception = MethodArgumentNotValidException.class)
	public ApiException handleMethodArgumentNotValidException(MethodArgumentNotValidException e , HttpServletRequest request , HttpServletResponse response) {
		
		List<FieldError> listOfFieldErrors = e.getFieldErrors();
		StringBuilder sb = new StringBuilder();
		
		for(FieldError fieldError : listOfFieldErrors) {
			sb.append(fieldError.getField() + " : " + fieldError.getDefaultMessage() + System.lineSeparator());
		}
		
		ApiException apiException = ApiException.builder().code(response.getStatus()).message(sb.toString()).path(request.getRequestURI()).when(new Date()).build();
		return apiException;
		 
	}
}
        
