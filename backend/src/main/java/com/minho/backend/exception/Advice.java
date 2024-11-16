package com.minho.backend.exception;

import com.minho.backend.constant.ErrorCode;
import com.minho.backend.response.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.NoHandlerFoundException;

// Spring Security 예외처리는 Advice가 아닌 Check Entry Point에서 처리
@Slf4j
@RestControllerAdvice
public class Advice {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ApiResponse exceptionHandler(Exception e) {
        System.out.println(e.getClass());
        String errorCode = ErrorCode.Server.SERVER_0000.name();
        String errorMessage = ErrorCode.Server.SERVER_0000.getDescription();
        String message = ErrorCode.Server.SERVER_0000.getDescription() + " -> " + e.getMessage();

        log.error("[Exception Advice] " + errorCode + ": " + message);
        return ApiResponse.error(errorCode, errorMessage);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({ NoHandlerFoundException.class, HttpRequestMethodNotSupportedException.class })
    public ApiResponse notFoundExceptionHandler(Exception e) {
        String errorCode = ErrorCode.Client.CLIENT_0001.name();
        String errorMessage = ErrorCode.Client.CLIENT_0001.getDescription();
        String logMessage = ErrorCode.Client.CLIENT_0001.getDescription() + " -> " + e.getMessage();

        log.warn("[Not Found Exception Advice] " + errorCode + ": " + logMessage);
        return ApiResponse.error(errorCode, errorMessage);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ServerException.class)
    public ApiResponse serverExceptionHandler(ServerException e) {
        String errorCode = e.getCode();
        String errorMessage = e.getMessage();
        String logMessage = errorMessage + " -> " + e.getException().getMessage();

        if (e.getException() != null) {
            log.error("[Server Exception Advice] " + e.getCode() + ": " + logMessage);
        }

        return ApiResponse.error(errorCode, errorMessage);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(AuthException.class)
    public ApiResponse authExceptionHandler(AuthException e) {
        String errorCode = e.getCode();
        String errorMessage = e.getMessage();
        String logMessage = errorMessage;

        log.warn("[Auth Exception Advice] " + errorCode + ": " + logMessage);
        return ApiResponse.error(errorCode, errorMessage);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        System.out.println("controller advice - MethodArgumentNotValidException");
        BindingResult bindingResult = e.getBindingResult();
        FieldError fieldError = bindingResult.getFieldError();
        String errorCode = ErrorCode.Client.CLIENT_0002.name();
        String errorMessage = ErrorCode.Client.CLIENT_0002.getDescription();

        if (fieldError != null) {
            String logMessage = errorMessage + " -> " + fieldError.getField() + "(" + fieldError.getDefaultMessage()
                    + ")";
            log.warn("[Argument Exception Advice] " + errorCode + ": " + logMessage);
            return ApiResponse.error(errorCode, logMessage);
        }

        String logMessage = errorMessage;

        log.warn("[Argument Exception Advice] " + ErrorCode.Client.CLIENT_0002 + ": " + logMessage);
        return ApiResponse.error(errorCode, e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public ApiResponse constraintViolationExceptionHandler(ConstraintViolationException e) {
        String errorCode = ErrorCode.Client.CLIENT_0002.name();
        String errorMessage = ErrorCode.Client.CLIENT_0002.getDescription();
        String logMessage = errorMessage + " -> " + e.getMessage();

        log.warn("[Constraint Exception advice] " + errorCode + ": " + logMessage);
        return ApiResponse.error(errorCode, logMessage);
    }

    /**
     * @description 아래 예외들을 처리 - @RequestParam 예외 - @Pattern
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ApiResponse handlerMethodValidationExceptionHandler(HandlerMethodValidationException e) {
        String errorCode = ErrorCode.Client.CLIENT_0002.name();
        String errorMessage = ErrorCode.Client.CLIENT_0002.getDescription();
        String logMessage = errorMessage + " -> "
                + e.getAllValidationResults().get(0).getResolvableErrors().get(0).getDefaultMessage();

        log.warn("[Method Validation Exception advice] " + errorCode + ": " + logMessage);
        return ApiResponse.error(errorCode, logMessage);
    }

    /**
     * @description 아래 예외들을 처리 - @RequestParam인데, request에 없을때
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ApiResponse missingServletRequestParameterExceptionHandler(MissingServletRequestParameterException e) {
        String errorCode = ErrorCode.Client.CLIENT_0002.name();
        String errorMessage = ErrorCode.Client.CLIENT_0002.getDescription();
        String logMessage = errorMessage + " -> " + e.getParameterName() + " is required";

        log.warn("[Missing Parameter Exception advice] " + errorCode + ": " + logMessage);
        return ApiResponse.error(errorCode, logMessage);
    }

    // @ResponseStatus(HttpStatus.BAD_REQUEST)
    // @ExceptionHandler(BadRequestException.class)
    // public ApiResponse badRequestExceptionHandler(BadRequestException e) {
    // String errorCode = e.getCode();
    // String errorMessage = e.getMessage();
    // String message = errorMessage;
    // log.warn("[Auth Exception Advice] " + errorCode + ": " + errorMessage);
    //
    // return ApiResponse.error(errorCode, message);
    // }

}
