package com.minho.backend.api.auth.application;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.port.AuthServicePort;
import com.minho.backend.exception.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthApplication {

    private final AuthServicePort authService;

    public AuthInfo.SignupInfo signup(AuthCommand.SignupCommand command) throws AuthException {
        AuthInfo.SignupInfo info = this.authService.signup(command);
        return info;
    }

    public AuthInfo.SigninInfo signin(AuthCommand.SigninCommand command) throws AuthException {
        AuthInfo.SigninInfo info = this.authService.signin(command);
        return info;
    }

}
