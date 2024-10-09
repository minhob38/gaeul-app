package com.minho.backend.config.security;

import com.minho.backend.constant.ErrorCode;
import com.minho.backend.exception.AuthException;
import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

@Getter
public class JwtAuthenticationException extends AuthenticationException {

    private final String code;

    public JwtAuthenticationException(AuthException exception) {
        super(exception.getMessage(), exception);
        this.code = exception.getCode();
    }

}
