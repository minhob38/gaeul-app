package com.minho.backend.config.security.exception;

import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

@Getter
public class ServerAuthenticationException extends AuthenticationException {

    private final String code;

    private final Exception exception;

    public ServerAuthenticationException(ServerException serverException) {
        super(serverException.getMessage(), serverException);
        this.code = serverException.getCode();
        this.exception = serverException.getException();
    }

}
