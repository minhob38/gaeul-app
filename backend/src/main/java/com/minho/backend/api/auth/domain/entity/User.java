package com.minho.backend.api.auth.domain.entity;

import java.util.Date;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class User {

  private Long id;
  private String email;
  private String password;
  private Date createdAt;
  private Date updatedAt;
}