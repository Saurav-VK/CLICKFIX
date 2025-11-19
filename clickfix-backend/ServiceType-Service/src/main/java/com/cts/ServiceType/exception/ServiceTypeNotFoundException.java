package com.cts.ServiceType.exception;

public class ServiceTypeNotFoundException extends RuntimeException {
	public ServiceTypeNotFoundException(String message){
		super(message);
	}
}
