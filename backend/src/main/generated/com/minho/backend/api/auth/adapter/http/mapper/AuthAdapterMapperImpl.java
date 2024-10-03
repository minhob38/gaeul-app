package com.minho.backend.api.auth.adapter.http.mapper;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-03T21:22:56+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthAdapterMapperImpl implements AuthAdapterMapper {

    @Override
    public AuthCommand.SignupCommand toSignupCommand(AuthDto.Signup.RequestBody requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        String email = null;
        String password = null;

        email = requestBody.getEmail();
        password = requestBody.getPassword();

        AuthCommand.SignupCommand signupCommand = new AuthCommand.SignupCommand( email, password );

        return signupCommand;
    }

    @Override
    public AuthCommand.SigninCommand toSigninCommand(AuthDto.Signin.RequestBody requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        String email = null;
        String password = null;

        email = requestBody.getEmail();
        password = requestBody.getPassword();

        AuthCommand.SigninCommand signinCommand = new AuthCommand.SigninCommand( email, password );

        return signinCommand;
    }

    @Override
    public AuthDto.Signup.Data toSignupData(AuthInfo.SignupInfo info) {
        if ( info == null ) {
            return null;
        }

        Long userId = null;

        userId = info.getId();

        AuthDto.Signup.Data data = new AuthDto.Signup.Data( userId );

        return data;
    }

    @Override
    public AuthDto.Signin.Data toSigninData(AuthInfo.SigninInfo info) {
        if ( info == null ) {
            return null;
        }

        Long userId = null;
        String accessToken = null;

        userId = info.getId();
        accessToken = info.getAccessToken();

        AuthDto.Signin.Data data = new AuthDto.Signin.Data( userId, accessToken );

        return data;
    }
}