package com.minho.backend.exception;

import com.minho.backend.config.security.exception.ServerAuthenticationException;
import com.minho.backend.constant.ErrorCode;
import com.minho.backend.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Spring Security 예외처리는 Advice가 아닌 Check Entry Point에서 처리
@Slf4j
@RestControllerAdvice
public class Advice {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ApiResponse exceptionHandler(Exception e) {
        log.error("[Exception Advice] " + e.getMessage() + " -> " + e.getMessage());
        return ApiResponse.error(ErrorCode.Server.SERVER_0000.name(), e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ServerException.class)
    public ApiResponse serverExceptionHandler(ServerException e) {
        if (e.getException() != null) {
            log.error("[Server Exception Advice] " + e.getCode() + ": " + e.getMessage() + " -> "
                    + e.getException().getMessage());
        }

        return ApiResponse.error(e.getCode(), e.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthException.class)
    public ApiResponse authExceptionHandler(AuthException e) {
        log.error("[Auth Exception Advice] " + e.getCode() + ": " + e.getMessage());

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
