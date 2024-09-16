package com.minho.backend.api.auth.adapter.out.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    injectionStrategy = InjectionStrategy.CONSTRUCTOR,
    unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface AuthPersistenceMapper {
  User toEntity(UserJpaEntity userJpaEntity); // 이상하게 동작하는 중
}
