package com.minho.backend.exception;

import com.minho.backend.constant.ErrorCode;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
public class ServerException extends Exception {

    private final String code;

    private final Exception exception;

    public ServerException(ErrorCode.Server errorCode, Exception exception) {
        super(errorCode.getDescription());
        this.code = errorCode.name();
        this.exception = exception;
    }

}
