package com.minho.backend.api.auth.adapter.http.mapper;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface AuthAdapterMapper {

    AuthCommand.Signup toSignupCommand(AuthDto.Signup.RequestBody requestBody);

    // @Mapping(source = "id", target = "userId")
    AuthDto.Signup.Data toSignupData(AuthInfo.Signup info);

    AuthCommand.Signin toSigninCommand(AuthDto.Signin.RequestBody requestBody);

    AuthDto.Signin.Data toSigninData(AuthInfo.Signin info);

    AuthQuery.ReadMe toReadMeQuery(Long userId);

    AuthDto.ReadMe.Data toReadMeData(AuthInfo.ReadMe info);

}
