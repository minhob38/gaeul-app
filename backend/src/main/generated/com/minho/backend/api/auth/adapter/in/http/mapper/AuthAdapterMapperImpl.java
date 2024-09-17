package com.minho.backend.api.auth.adapter.in.http.mapper;

import com.minho.backend.api.auth.adapter.in.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-17T21:07:53+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthAdapterMapperImpl implements AuthAdapterMapper {

    @Override
    public AuthCommand.SignupCommand toCommand(AuthDto.Signup.RequestBody requestBody) {
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
    public AuthDto.Signup.Data toData(AuthInfo.SignupInfo info) {
        if ( info == null ) {
            return null;
        }

        Long userId = null;

        userId = info.getId();

        AuthDto.Signup.Data data = new AuthDto.Signup.Data( userId );

        return data;
    }
}
