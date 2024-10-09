package com.minho.backend.api.auth.domain.mapper;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface AuthDomainMapper {

    @Mapping(target = "accessToken", ignore = true)
    AuthInfo toSignupInfo(User user);

    @Mapping(target = "accessToken", ignore = true)
    AuthInfo toRemoveMeInfo(User user);

    AuthInfo toSigninInfo(User user, String accessToken);

    @Mapping(target = "accessToken", ignore = true)
    AuthInfo toSignoutInfo(User user);

    @Mapping(target = "accessToken", ignore = true)
    AuthInfo toModifyMe(User user);

    @Mapping(target = "accessToken", ignore = true)
    AuthInfo toReadMeInfo(User user);

}
