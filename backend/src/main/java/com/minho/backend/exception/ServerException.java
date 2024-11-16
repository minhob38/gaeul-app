package com.minho.backend.exception;

import com.minho.backend.constant.ErrorCode;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
public class ServerException extends Exception {

    private final String code;

    private final Exception exception;

    /**
     * @description server exception 같은 경우는, 정확히 exception을 알수 없는 상황이 있기에 exception을 매개변수로
     * 받음
     */
    public ServerException(ErrorCode.Server errorCode, Exception exception) {
        super(errorCode.getDescription());
        this.code = errorCode.name();
        this.exception = exception;
    }

}
