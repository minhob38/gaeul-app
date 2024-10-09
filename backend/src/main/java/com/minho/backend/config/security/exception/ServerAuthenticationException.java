package com.minho.backend.config.security.exception;

import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

@Getter
public class ServerAuthenticationException extends AuthenticationException {

    private final String code;

    public ServerAuthenticationException(ServerException exception) {
        super(exception.getMessage(), exception);
        this.code = exception.getCode();
    }

}
