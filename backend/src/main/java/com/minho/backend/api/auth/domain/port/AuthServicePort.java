package com.minho.backend.api.auth.domain.port;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.exception.AuthException;

public interface AuthServicePort {

	AuthInfo.SignupInfo signup(AuthCommand.SignupCommand command) throws AuthException;

	AuthInfo.SigninInfo signin(AuthCommand.SigninCommand command) throws AuthException;
}
