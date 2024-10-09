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
    @Mapping(target = "accessToken", ignore = true)
    AuthDto.Data toSignupData(AuthInfo info);

    AuthCommand.Signin toSigninCommand(AuthDto.Signin.RequestBody requestBody);

    AuthDto.Data toSigninData(AuthInfo info);

    AuthQuery.ReadMe toReadMeQuery(Long userId);

    @Mapping(target = "accessToken", ignore = true)
    AuthDto.Data toReadMeData(AuthInfo info);

    AuthCommand.ModifyMe toModifyMeCommand(AuthDto.ModifyMe.RequestBody requestBody, Long userId);

    @Mapping(target = "accessToken", ignore = true)
    AuthDto.Data toModifyMeData(AuthInfo info);

}
