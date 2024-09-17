package com.minho.backend.api.auth.domain.mapper;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-17T22:05:59+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthDomainMapperImpl implements AuthDomainMapper {

    @Override
    public AuthInfo.SignupInfo toInfo(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;

        id = user.getId();

        AuthInfo.SignupInfo signupInfo = new AuthInfo.SignupInfo( id );

        return signupInfo;
    }
}
