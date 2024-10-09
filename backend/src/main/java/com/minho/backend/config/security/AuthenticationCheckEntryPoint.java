package com.minho.backend.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minho.backend.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationCheckEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authenticationException) throws IOException, ServletException {

        ApiResponse apiResponse;

        if (authenticationException instanceof JwtAuthenticationException) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());

            apiResponse = ApiResponse.error(((JwtAuthenticationException) authenticationException).getCode(),
                    authenticationException.getMessage());

        }
        else {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

            apiResponse = ApiResponse.error(((ServerAuthenticationException) authenticationException).getCode(),
                    authenticationException.getMessage());
        }

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        String responseBody = objectMapper.writeValueAsString(apiResponse);
        response.getWriter().write(responseBody);
    }

}
