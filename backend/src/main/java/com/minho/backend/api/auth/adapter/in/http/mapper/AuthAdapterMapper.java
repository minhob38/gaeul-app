package com.minho.backend.api.auth.adapter.in.http.mapper;

import com.minho.backend.api.auth.adapter.in.http.dto.AuthDto;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    injectionStrategy = InjectionStrategy.CONSTRUCTOR,
    unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface AuthAdapterMapper {

  AuthCommand.SignupCommand toCommand(AuthDto.Signup.RequestBody requestBody);
  AuthDto.Signup.Data toData(AuthInfo.SignupInfo info);

}
