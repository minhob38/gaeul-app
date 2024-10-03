package com.minho.backend.api.auth.adapter.http.mapper;

import com.minho.backend.api.auth.adapter.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
		componentModel = "spring",
		injectionStrategy = InjectionStrategy.CONSTRUCTOR,
		unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface AuthAdapterMapper {

	AuthCommand.SignupCommand toSignupCommand(AuthDto.Signup.RequestBody requestBody);

	AuthCommand.SigninCommand toSigninCommand(AuthDto.Signin.RequestBody requestBody);

//	@Mapping(source = "id", target = "userId")
  AuthDto.Signup.Data toSignupData(AuthInfo.SignupInfo info);

	AuthDto.Signin.Data toSigninData(AuthInfo.SigninInfo info);
}

