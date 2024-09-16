package com.minho.backend.api.auth.adapter.in.http.mapper;

import com.minho.backend.api.auth.adapter.in.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-09-16T16:56:59+0900",
    comments = "version: 1.6.1, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class AuthAdapterMapperImpl implements AuthAdapterMapper {

    @Override
    public AuthCommand.SignupCommand toCommand(AuthDto.Signup.RequestBody requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        AuthDto.Signup.RequestBody requestBody1 = null;

        requestBody1 = requestBody;

        AuthCommand.SignupCommand signupCommand = new AuthCommand.SignupCommand( requestBody1 );

        return signupCommand;
    }

    @Override
    public AuthDto.Signup.Data toData(AuthInfo.SignupInfo info) {
        if ( info == null ) {
            return null;
        }

        Long userId = null;

        userId = info.getUserId();

        AuthDto.Signup.Data data = new AuthDto.Signup.Data( userId );

        return data;
    }
}
