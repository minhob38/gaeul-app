package com.minho.backend.api.auth.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AuthInfo {

  @RequiredArgsConstructor
  @Getter
  public static class SignupInfo {

    private final Long userId;
  }

  @RequiredArgsConstructor
  @Getter
  public static class SigninInfo {

    private final Long userId;
  }

  @RequiredArgsConstructor
  @Getter
  public static class MeInfo {

    private final Long userId;
    private final String email;
  }
}