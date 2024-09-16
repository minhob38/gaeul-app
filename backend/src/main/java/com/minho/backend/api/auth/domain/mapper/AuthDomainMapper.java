package com.minho.backend.api.auth.domain.mapper;

import com.minho.backend.api.auth.adapter.out.persistence.UserJpaEntity;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    injectionStrategy = InjectionStrategy.CONSTRUCTOR,
    unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface AuthDomainMapper {


  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  UserJpaEntity toJpaEntity(AuthCommand.SignupCommand command);
}
