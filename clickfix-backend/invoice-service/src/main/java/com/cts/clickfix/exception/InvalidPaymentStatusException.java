package com.cts.clickfix.exception;

public class InvalidPaymentStatusException extends RuntimeException{
	
	public InvalidPaymentStatusException(String message) {
		super(message);
	}

}
