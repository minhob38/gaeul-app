package com.minho.backend.api.auth.domain.dto;

import com.minho.backend.api.auth.adapter.in.http.dto.AuthDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AuthCommand {

  @Getter
  public static class SignupCommand {

    private final String email;
    private final String password;

    public SignupCommand(AuthDto.Signup.RequestBody requestBody) {
      this.email = requestBody.getEmail();
      this.password = requestBody.getPassword();
    }
  }

  @Getter
  @RequiredArgsConstructor
  public static class SigninCommand {

    private final String email;
    private final String password;
  }

  @Getter
  @RequiredArgsConstructor
  public static class ModifyPasswordCommand {

    private final Long userId;
    private final String newPassword;
    private final String currentPassword;
  }

  @Getter
  @RequiredArgsConstructor
  public static class SignoutCommand {

    private final Long userId;
  }
}
