package com.minho.backend.api.auth.domain;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.mapper.AuthDomainMapper;
import com.minho.backend.api.auth.domain.port.AuthPersistencePort;
import com.minho.backend.api.auth.domain.port.AuthServicePort;
import com.minho.backend.exception.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthServicePort {

  private final AuthPersistencePort userPersistenceAdapter;
  private final AuthDomainMapper authDomainMapper;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public AuthInfo.SignupInfo signup(AuthCommand.SignupCommand command) throws AuthException {
    User user = command.toEntity();

    if (this.userPersistenceAdapter.findUserByEmail(user.getEmail()).isPresent()) {
      throw new AuthException("user already exists");
    }

    String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
    user.setPassword(encodedPassword);

    User createdUser = this.userPersistenceAdapter.createUser(user);

    return this.authDomainMapper.toInfo(createdUser);
  }
}
