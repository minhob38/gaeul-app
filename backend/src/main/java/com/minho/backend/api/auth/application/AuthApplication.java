package com.minho.backend.api.auth.application;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.api.auth.domain.port.AuthServicePort;
import com.minho.backend.constant.ErrorCode.Server;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthApplication {

    private final AuthServicePort authService;

    public AuthInfo.Signup signup(AuthCommand.Signup command) throws AuthException {
        AuthInfo.Signup info = this.authService.signup(command);
        return info;
    }

    public AuthInfo.Signin signin(AuthCommand.Signin command) throws AuthException {
        AuthInfo.Signin info = this.authService.signin(command);
        return info;
    }

    public AuthInfo.ModifyMe modifyMe(AuthCommand.ModifyMe command) throws AuthException, ServerException {
        AuthInfo.ModifyMe info = this.authService.modifyMe(command);
        return info;
    }

    public AuthInfo.ReadMe readMe(AuthQuery.ReadMe query) throws AuthException {
        AuthInfo.ReadMe info = this.authService.readMe(query);
        return info;
    }

}
