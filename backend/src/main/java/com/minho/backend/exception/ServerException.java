package com.minho.backend.exception;

import com.minho.backend.constant.ErrorCode;
import lombok.Getter;

@Getter
public class ServerException extends Exception {

    private final String code;

    public ServerException(ErrorCode.Server errorCode) {
        super(errorCode.getDescription());
        this.code = errorCode.name();
    }

}
