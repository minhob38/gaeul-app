package com.minho.backend.api.auth.adapter.http.mapper;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.dto.AuthQuery;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface AuthAdapterMapper {

    // signup
    AuthCommand.Signup toSignupCommand(AuthDto.Signup.RequestBody requestBody);

    @Mapping(target = "accessToken", ignore = true)
    AuthDto.Data toSignupData(AuthInfo info);

    // removeme
    AuthCommand.RemoveMe toRemoveMeCommand(Long userId);

    @Mappings({ @Mapping(target = "key", source = "key"),
            // @Mapping(target = "delete_at", source = "delete_at?")
    })
    AuthDto.Data toRemoveMeData(AuthInfo info);

    // signin
    AuthCommand.Signin toSigninCommand(AuthDto.Signin.RequestBody requestBody);

    AuthDto.Data toSigninData(AuthInfo info);

    // signout
    AuthCommand.Signout toSignoutCommand(Long userId);

    @Mappings({ @Mapping(target = "key", source = "key"), @Mapping(target = "signedoutAt", source = "signedoutAt") })
    AuthDto.Data toSignoutData(AuthInfo info);

    // readme
    AuthQuery.ReadMe toReadMeQuery(Long userId);

    @Mapping(target = "accessToken", ignore = true)
    AuthDto.Data toReadMeData(AuthInfo info);

    // modifyme
    AuthCommand.ModifyMe toModifyMeCommand(AuthDto.ModifyMe.RequestBody requestBody, Long userId);

    @Mapping(target = "accessToken", ignore = true)
    AuthDto.Data toModifyMeData(AuthInfo info);

}
