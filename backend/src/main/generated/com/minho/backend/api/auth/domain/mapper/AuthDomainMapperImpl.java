package com.minho.backend.api.auth.domain.mapper;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
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
public class AuthDomainMapperImpl implements AuthDomainMapper {

    @Override
    public AuthInfo toSignupInfo(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String key = null;
        String email = null;
        String name = null;
        ZonedDateTime passwordChangedAt = null;
        ZonedDateTime signedupAt = null;
        Date signedinAt = null;
        ZonedDateTime signedoutAt = null;
        Date createdAt = null;
        Date updatedAt = null;

        id = user.getId();
        key = user.getKey();
        email = user.getEmail();
        name = user.getName();
        passwordChangedAt = user.getPasswordChangedAt();
        signedupAt = user.getSignedupAt();
        signedinAt = user.getSignedinAt();
        signedoutAt = user.getSignedoutAt();
        createdAt = user.getCreatedAt();
        updatedAt = user.getUpdatedAt();

        String accessToken = null;

        AuthInfo authInfo = new AuthInfo( id, key, email, name, passwordChangedAt, signedupAt, signedinAt, signedoutAt, createdAt, updatedAt, accessToken );

        return authInfo;
    }

    @Override
    public AuthInfo toSigninInfo(User user, String accessToken) {
        if ( user == null && accessToken == null ) {
            return null;
        }

        Long id = null;
        String key = null;
        String email = null;
        String name = null;
        ZonedDateTime passwordChangedAt = null;
        ZonedDateTime signedupAt = null;
        Date signedinAt = null;
        ZonedDateTime signedoutAt = null;
        Date createdAt = null;
        Date updatedAt = null;
        if ( user != null ) {
            id = user.getId();
            key = user.getKey();
            email = user.getEmail();
            name = user.getName();
            passwordChangedAt = user.getPasswordChangedAt();
            signedupAt = user.getSignedupAt();
            signedinAt = user.getSignedinAt();
            signedoutAt = user.getSignedoutAt();
            createdAt = user.getCreatedAt();
            updatedAt = user.getUpdatedAt();
        }
        String accessToken1 = null;
        accessToken1 = accessToken;

        AuthInfo authInfo = new AuthInfo( id, key, email, name, passwordChangedAt, signedupAt, signedinAt, signedoutAt, createdAt, updatedAt, accessToken1 );

        return authInfo;
    }

    @Override
    public AuthInfo toModifyMe(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String key = null;
        String email = null;
        String name = null;
        ZonedDateTime passwordChangedAt = null;
        ZonedDateTime signedupAt = null;
        Date signedinAt = null;
        ZonedDateTime signedoutAt = null;
        Date createdAt = null;
        Date updatedAt = null;

        id = user.getId();
        key = user.getKey();
        email = user.getEmail();
        name = user.getName();
        passwordChangedAt = user.getPasswordChangedAt();
        signedupAt = user.getSignedupAt();
        signedinAt = user.getSignedinAt();
        signedoutAt = user.getSignedoutAt();
        createdAt = user.getCreatedAt();
        updatedAt = user.getUpdatedAt();

        String accessToken = null;

        AuthInfo authInfo = new AuthInfo( id, key, email, name, passwordChangedAt, signedupAt, signedinAt, signedoutAt, createdAt, updatedAt, accessToken );

        return authInfo;
    }

    @Override
    public AuthInfo toReadMeInfo(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String key = null;
        String email = null;
        String name = null;
        ZonedDateTime passwordChangedAt = null;
        ZonedDateTime signedupAt = null;
        Date signedinAt = null;
        ZonedDateTime signedoutAt = null;
        Date createdAt = null;
        Date updatedAt = null;

        id = user.getId();
        key = user.getKey();
        email = user.getEmail();
        name = user.getName();
        passwordChangedAt = user.getPasswordChangedAt();
        signedupAt = user.getSignedupAt();
        signedinAt = user.getSignedinAt();
        signedoutAt = user.getSignedoutAt();
        createdAt = user.getCreatedAt();
        updatedAt = user.getUpdatedAt();

        String accessToken = null;

        AuthInfo authInfo = new AuthInfo( id, key, email, name, passwordChangedAt, signedupAt, signedinAt, signedoutAt, createdAt, updatedAt, accessToken );

        return authInfo;
    }
}
