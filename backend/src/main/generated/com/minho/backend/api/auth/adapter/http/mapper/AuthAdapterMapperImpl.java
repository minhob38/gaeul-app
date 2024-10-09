package com.minho.backend.api.auth.adapter.http.mapper;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import java.time.ZonedDateTime;
import java.util.Date;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-09T21:09:08+0900",
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
    public AuthDto.Data toSignupData(AuthInfo info) {
        if ( info == null ) {
            return null;
        }

        String key = null;
        String email = null;
        String name = null;
        ZonedDateTime passwordChangedAt = null;
        ZonedDateTime signedupAt = null;
        Date signedinAt = null;
        ZonedDateTime signedoutAt = null;
        Date createdAt = null;
        Date updatedAt = null;

        key = info.getKey();
        email = info.getEmail();
        name = info.getName();
        passwordChangedAt = info.getPasswordChangedAt();
        signedupAt = info.getSignedupAt();
        signedinAt = info.getSignedinAt();
        signedoutAt = info.getSignedoutAt();
        createdAt = info.getCreatedAt();
        updatedAt = info.getUpdatedAt();

        String accessToken = null;

        AuthDto.Data data = new AuthDto.Data( key, email, name, passwordChangedAt, signedupAt, signedinAt, signedoutAt, createdAt, updatedAt, accessToken );

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
    public AuthDto.Data toSigninData(AuthInfo info) {
        if ( info == null ) {
            return null;
        }

        String key = null;
        String email = null;
        String name = null;
        ZonedDateTime passwordChangedAt = null;
        ZonedDateTime signedupAt = null;
        Date signedinAt = null;
        ZonedDateTime signedoutAt = null;
        Date createdAt = null;
        Date updatedAt = null;
        String accessToken = null;

        key = info.getKey();
        email = info.getEmail();
        name = info.getName();
        passwordChangedAt = info.getPasswordChangedAt();
        signedupAt = info.getSignedupAt();
        signedinAt = info.getSignedinAt();
        signedoutAt = info.getSignedoutAt();
        createdAt = info.getCreatedAt();
        updatedAt = info.getUpdatedAt();
        accessToken = info.getAccessToken();

        AuthDto.Data data = new AuthDto.Data( key, email, name, passwordChangedAt, signedupAt, signedinAt, signedoutAt, createdAt, updatedAt, accessToken );

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
    public AuthDto.Data toReadMeData(AuthInfo info) {
        if ( info == null ) {
            return null;
        }

        String key = null;
        String email = null;
        String name = null;
        ZonedDateTime passwordChangedAt = null;
        ZonedDateTime signedupAt = null;
        Date signedinAt = null;
        ZonedDateTime signedoutAt = null;
        Date createdAt = null;
        Date updatedAt = null;

        key = info.getKey();
        email = info.getEmail();
        name = info.getName();
        passwordChangedAt = info.getPasswordChangedAt();
        signedupAt = info.getSignedupAt();
        signedinAt = info.getSignedinAt();
        signedoutAt = info.getSignedoutAt();
        createdAt = info.getCreatedAt();
        updatedAt = info.getUpdatedAt();

        String accessToken = null;

        AuthDto.Data data = new AuthDto.Data( key, email, name, passwordChangedAt, signedupAt, signedinAt, signedoutAt, createdAt, updatedAt, accessToken );

        return data;
    }

    @Override
    public AuthCommand.ModifyMe toModifyMeCommand(AuthDto.ModifyMe.RequestBody requestBody, Long userId) {
        if ( requestBody == null && userId == null ) {
            return null;
        }

        String email = null;
        String currentPassword = null;
        String newPassword = null;
        if ( requestBody != null ) {
            email = requestBody.getEmail();
            currentPassword = requestBody.getCurrentPassword();
            newPassword = requestBody.getNewPassword();
        }
        Long userId1 = null;
        userId1 = userId;

        AuthCommand.ModifyMe modifyMe = new AuthCommand.ModifyMe( userId1, email, currentPassword, newPassword );

        return modifyMe;
    }

    @Override
    public AuthDto.Data toModifyMeData(AuthInfo info) {
        if ( info == null ) {
            return null;
        }

        String key = null;
        String email = null;
        String name = null;
        ZonedDateTime passwordChangedAt = null;
        ZonedDateTime signedupAt = null;
        Date signedinAt = null;
        ZonedDateTime signedoutAt = null;
        Date createdAt = null;
        Date updatedAt = null;

        key = info.getKey();
        email = info.getEmail();
        name = info.getName();
        passwordChangedAt = info.getPasswordChangedAt();
        signedupAt = info.getSignedupAt();
        signedinAt = info.getSignedinAt();
        signedoutAt = info.getSignedoutAt();
        createdAt = info.getCreatedAt();
        updatedAt = info.getUpdatedAt();

        String accessToken = null;

        AuthDto.Data data = new AuthDto.Data( key, email, name, passwordChangedAt, signedupAt, signedinAt, signedoutAt, createdAt, updatedAt, accessToken );

        return data;
    }
}
