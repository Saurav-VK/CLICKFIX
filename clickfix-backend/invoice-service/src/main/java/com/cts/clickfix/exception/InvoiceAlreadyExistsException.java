package com.cts.clickfix.exception;

public class InvoiceAlreadyExistsException extends RuntimeException{
      public InvoiceAlreadyExistsException(String message) {
    	  super(message);
      }
}
