package com.minho.backend.api.auth.domain.port;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import com.minho.backend.exception.AuthException;
import com.minho.backend.exception.ServerException;

public interface AuthServicePort {

    AuthInfo signup(AuthCommand.Signup command) throws AuthException;

    AuthInfo signin(AuthCommand.Signin command) throws AuthException;

    AuthInfo modifyMe(AuthCommand.ModifyMe command) throws AuthException, ServerException;

    AuthInfo readMe(AuthQuery.ReadMe query) throws AuthException;

}
