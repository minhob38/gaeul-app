package com.minho.backend.exception;

import com.minho.backend.response.ApiResponse;
import com.minho.backend.response.ServerErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class Advice {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ServerErrorResponse exceptionHandler(Exception e) {
        System.out.println("controller advice - Exception");
        System.out.println(e);
        ServerErrorResponse serverErrorResponse = new ServerErrorResponse();
        serverErrorResponse.setMessage(e.getMessage());
        return serverErrorResponse;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthException.class)
    public ApiResponse authExceptionHandler(AuthException e) {
        ServerErrorResponse serverErrorResponse = new ServerErrorResponse();
        serverErrorResponse.setMessage(e.getMessage());
        return ApiResponse.error(e.getCode(), e.getMessage());
    }

    // @ResponseStatus(HttpStatus.BAD_REQUEST)
    // @ExceptionHandler(BoardException.class)
    // public ErrorResponse boardExceptionHandler(BoardException e) {
    // ErrorResponse errorResponse = new ErrorResponse();
    // errorResponse.setMessage(e.getMessage());
    // return errorResponse;
    // }

    // @ResponseStatus(HttpStatus.BAD_REQUEST)
    // @ExceptionHandler(MethodArgumentNotValidException.class)
    // public ErrorResponse
    // methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
    // System.out.println("controller advice - MethodArgumentNotValidException");
    // BindingResult bindingResult = e.getBindingResult();
    // ErrorResponse errorResponse = new ErrorResponse();
    // FieldError fieldError = bindingResult.getFieldError();
    //
    // if (fieldError != null) {
    // String message = fieldError.getField() + " = " + fieldError.getDefaultMessage();
    // errorResponse.setMessage(message);
    // return errorResponse;
    // }
    //
    // errorResponse.setMessage(e.getMessage());
    // return errorResponse;
    // }
    //
    // @ResponseStatus(HttpStatus.BAD_REQUEST)
    // @ExceptionHandler(ConstraintViolationException.class)
    // public ErrorResponse
    // constraintViolationExceptionHandler(ConstraintViolationException e) {
    // System.out.println("controller advice - ConstraintViolationException");
    // ErrorResponse errorResponse = new ErrorResponse();
    // errorResponse.setMessage(e.getMessage());
    // return errorResponse;
    // }
    //
    // @ResponseStatus(HttpStatus.BAD_REQUEST)
    // @ExceptionHandler(BadRequestException.class)
    // public ErrorResponse badRequestExceptionHandler(BadRequestException e) {
    // ErrorResponse errorResponse = new ErrorResponse();
    // errorResponse.setMessage(e.getMessage());
    // return errorResponse;
    // }

}
