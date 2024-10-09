package com.minho.backend.api.auth.domain.port;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.exception.AuthException;

public interface AuthServicePort {

    AuthInfo.Signup signup(AuthCommand.Signup command) throws AuthException;

    AuthInfo.Signin signin(AuthCommand.Signin command) throws AuthException;

    AuthInfo.ReadMe readMe(AuthQuery.ReadMe query) throws AuthException;

}
