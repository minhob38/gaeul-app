package com.minho.backend.api.auth.domain.mapper;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-09T18:12:55+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthDomainMapperImpl implements AuthDomainMapper {

    @Override
    public AuthInfo.Signup toSignupInfo(User user) {
        if ( user == null ) {
            return null;
        }

        String key = null;

        key = user.getKey();

        AuthInfo.Signup signup = new AuthInfo.Signup( key );

        return signup;
    }

    @Override
    public AuthInfo.Signin toSigninInfo(String key, String accessToken) {
        if ( key == null && accessToken == null ) {
            return null;
        }

        String key1 = null;
        key1 = key;
        String accessToken1 = null;
        accessToken1 = accessToken;

        AuthInfo.Signin signin = new AuthInfo.Signin( key1, accessToken1 );

        return signin;
    }

    @Override
    public AuthInfo.ReadMe toReadMeInfo(User user) {
        if ( user == null ) {
            return null;
        }

        String key = null;
        String email = null;

        key = user.getKey();
        email = user.getEmail();

        AuthInfo.ReadMe readMe = new AuthInfo.ReadMe( key, email );

        return readMe;
    }
}
