package com.minho.backend.api.auth.domain.mapper;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-06T21:01:26+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthDomainMapperImpl implements AuthDomainMapper {

    @Override
    public AuthInfo.SignupInfo toSignupInfo(User user) {
        if ( user == null ) {
            return null;
        }

        String key = null;

        key = user.getKey();

        AuthInfo.SignupInfo signupInfo = new AuthInfo.SignupInfo( key );

        return signupInfo;
    }

    @Override
    public AuthInfo.SigninInfo toSigninInfo(String key, String accessToken) {
        if ( key == null && accessToken == null ) {
            return null;
        }

        String key1 = null;
        key1 = key;
        String accessToken1 = null;
        accessToken1 = accessToken;

        AuthInfo.SigninInfo signinInfo = new AuthInfo.SigninInfo( key1, accessToken1 );

        return signinInfo;
    }
}
