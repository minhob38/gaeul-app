package com.minho.backend.api.auth.adapter.out.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-16T16:56:59+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthPersistenceMapperImpl implements AuthPersistenceMapper {

    @Override
    public User toEntity(UserJpaEntity userJpaEntity) {
        if ( userJpaEntity == null ) {
            return null;
        }

        User user = new User();

        return user;
    }
}