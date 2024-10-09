package com.minho.backend.api.auth.adapter.http.mapper;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-09T18:43:11+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthAdapterMapperImpl implements AuthAdapterMapper {

    @Override
    public AuthCommand.Signup toSignupCommand(AuthDto.Signup.RequestBody requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        String email = null;
        String password = null;

        email = requestBody.getEmail();
        password = requestBody.getPassword();

        AuthCommand.Signup signup = new AuthCommand.Signup( email, password );

        return signup;
    }

    @Override
    public AuthDto.Signup.Data toSignupData(AuthInfo.Signup info) {
        if ( info == null ) {
            return null;
        }

        String key = null;

        key = info.getKey();

        AuthDto.Signup.Data data = new AuthDto.Signup.Data( key );

        return data;
    }

    @Override
    public AuthCommand.Signin toSigninCommand(AuthDto.Signin.RequestBody requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        String email = null;
        String password = null;

        email = requestBody.getEmail();
        password = requestBody.getPassword();

        AuthCommand.Signin signin = new AuthCommand.Signin( email, password );

        return signin;
    }

    @Override
    public AuthDto.Signin.Data toSigninData(AuthInfo.Signin info) {
        if ( info == null ) {
            return null;
        }

        String key = null;
        String accessToken = null;

        key = info.getKey();
        accessToken = info.getAccessToken();

        AuthDto.Signin.Data data = new AuthDto.Signin.Data( key, accessToken );

        return data;
    }

    @Override
    public AuthQuery.ReadMe toReadMeQuery(Long userId) {
        if ( userId == null ) {
            return null;
        }

        Long userId1 = null;

        userId1 = userId;

        AuthQuery.ReadMe readMe = new AuthQuery.ReadMe( userId1 );

        return readMe;
    }

    @Override
    public AuthDto.ReadMe.Data toReadMeData(AuthInfo.ReadMe info) {
        if ( info == null ) {
            return null;
        }

        String key = null;
        String email = null;

        key = info.getKey();
        email = info.getEmail();

        AuthDto.ReadMe.Data data = new AuthDto.ReadMe.Data( key, email );

        return data;
    }
}
