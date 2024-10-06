package com.minho.backend.exception;

import com.minho.backend.constant.ErrorCode;
import lombok.Getter;

@Getter
public class AuthException extends Exception {

    private final String code;

    public AuthException(ErrorCode.Auth errorCode) {
        super(errorCode.getDescription());
        this.code = errorCode.name();
    }

}
