package com.cts.userservice.exception;

import java.util.Date;
import java.util.List;

import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cts.userservice.model.ApiException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class ApplicationGlobalException {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ApiException handleUserAlreadyExistsException(UserAlreadyExistsException e, HttpServletRequest request, HttpServletResponse response) {
        return ApiException.builder()
                .code(response.getStatus())
                .message(e.getMessage())
                .path(request.getRequestURI())
                .when(new Date())
                .build();
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ApiException handleUserNotFoundException(UserNotFoundException e, HttpServletRequest request, HttpServletResponse response) {
        return ApiException.builder()
                .code(response.getStatus())
                .message(e.getMessage())
                .path(request.getRequestURI())
                .when(new Date())
                .build();
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ApiException handleInvalidCredentialsException(InvalidCredentialsException e, HttpServletRequest request, HttpServletResponse response) {
        return ApiException.builder()
                .code(response.getStatus())
                .message(e.getMessage())
                .path(request.getRequestURI())
                .when(new Date())
                .build();
    }

    @ExceptionHandler(ProfileUpdateException.class)
    public ApiException handleProfileUpdateException(ProfileUpdateException e, HttpServletRequest request, HttpServletResponse response) {
        return ApiException.builder()
                .code(response.getStatus())
                .message(e.getMessage())
                .path(request.getRequestURI())
                .when(new Date())
                .build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiException handleMethodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request, HttpServletResponse response) {
        List<FieldError> listOfFieldErrors = e.getFieldErrors();
        StringBuilder sb = new StringBuilder();
        for (FieldError fieldError : listOfFieldErrors) {
            sb.append(fieldError.getField()).append(" : ").append(fieldError.getDefaultMessage()).append(System.lineSeparator());
        }

        return ApiException.builder()
                .code(response.getStatus())
                .message(sb.toString())
                .path(request.getRequestURI())
                .when(new Date())
                .build();
    }
}
