package com.minho.backend.config.security.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minho.backend.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

// Spring Security 예외처리는 Advice가 아닌 Check Entry Point에서 처리
@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationCheckEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authenticationException) throws IOException, ServletException {

        ApiResponse apiResponse;

        if (authenticationException instanceof JwtAuthenticationException) {
            String errorCode = ((JwtAuthenticationException) authenticationException).getCode();
            String errorMessage = authenticationException.getMessage();
            String logMessage = errorMessage;

            log.debug("[Jwt Exception Check Entry Point] {} ", errorCode + ": " + logMessage);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());

            apiResponse = ApiResponse.error(((JwtAuthenticationException) authenticationException).getCode(),
                    authenticationException.getMessage());
        }
        else {
            String errorCode = ((ServerAuthenticationException) authenticationException).getCode();
            String errorMessage = ((ServerAuthenticationException) authenticationException).getException().getMessage();
            String logMessage = authenticationException.getMessage() + " -> " + errorMessage;

            log.error("[Server Exception Check Entry Point] " + errorCode + ": " + logMessage);

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

            apiResponse = ApiResponse.error(errorCode, errorMessage);
        }

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        String responseBody = objectMapper.writeValueAsString(apiResponse);
        response.getWriter().write(responseBody);
    }

}
