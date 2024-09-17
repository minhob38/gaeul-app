package com.minho.backend.api.auth.domain.entity;

import com.minho.backend.api.auth.adapter.out.persistence.UserJpaEntity;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@ToString
@Getter
public class User {

  private final Long id;
  private final String email;
  private final String password;
  private final Date createdAt;
  private final Date updatedAt;

  // hash 처리는 여기서
  public UserJpaEntity toJpaEntity() {
    return UserJpaEntity
        .builder()
        .email(this.email)
        .password(this.password)
        .build();
  }
}