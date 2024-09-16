package com.minho.backend.api.auth.application;

import com.minho.backend.api.auth.domain.AuthService;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.exception.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthApplication {
  private final AuthService authService;

  public AuthInfo.SignupInfo signup(AuthCommand.SignupCommand command) throws AuthException {
    AuthInfo.SignupInfo info = this.authService.signup(command);
    return info;
  }
}
