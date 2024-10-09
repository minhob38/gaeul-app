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

    public AuthInfo signup(AuthCommand.Signup command) throws AuthException {
        AuthInfo info = this.authService.signup(command);
        return info;
    }

    public AuthInfo removeMe(AuthCommand.RemoveMe command) throws AuthException, ServerException {
        AuthInfo info = this.authService.removeMe(command);
        return info;
    }

    public AuthInfo signin(AuthCommand.Signin command) throws AuthException, ServerException {
        AuthInfo info = this.authService.signin(command);
        return info;
    }

    public AuthInfo signout(AuthCommand.Signout command) throws AuthException, ServerException {
        AuthInfo info = this.authService.signout(command);
        return info;
    }

    public AuthInfo modifyMe(AuthCommand.ModifyMe command) throws AuthException, ServerException {
        AuthInfo info = this.authService.modifyMe(command);
        return info;
    }

    public AuthInfo readMe(AuthQuery.ReadMe query) throws AuthException {
        AuthInfo info = this.authService.readMe(query);
        return info;
    }

}
