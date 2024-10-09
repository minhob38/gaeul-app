package com.minho.backend.api.auth.domain.mapper;

import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface AuthDomainMapper {

    AuthInfo.Signup toSignupInfo(User user);

    AuthInfo.Signin toSigninInfo(User user, String accessToken);

    AuthInfo.ModifyMe toModifyMe(User user);

    AuthInfo.ReadMe toReadMeInfo(User user);

}
