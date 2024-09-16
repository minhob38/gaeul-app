package com.minho.backend.api.auth.domain.mapper;

import com.minho.backend.api.auth.adapter.out.persistence.UserJpaEntity;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-16T16:56:59+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthDomainMapperImpl implements AuthDomainMapper {

    @Override
    public UserJpaEntity toJpaEntity(AuthCommand.SignupCommand command) {
        if ( command == null ) {
            return null;
        }

        UserJpaEntity userJpaEntity = new UserJpaEntity();

        userJpaEntity.setEmail( command.getEmail() );
        userJpaEntity.setPassword( command.getPassword() );

        return userJpaEntity;
    }
}
