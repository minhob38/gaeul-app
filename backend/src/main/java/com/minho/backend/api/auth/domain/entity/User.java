package com.minho.backend.api.auth.domain.entity;

import com.minho.backend.api.auth.adapter.persistence.UserJpaEntity;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
public class User {

  private Long id;
  private String email;

  @Setter
  private String password;

  private Date createdAt;

  private Date updatedAt;

  @Builder
  public User(Long id, String email, String password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  public UserJpaEntity toJpaEntity() {
    return UserJpaEntity
        .builder()
        .email(this.email)
        .password(this.password)
        .build();
  }
}