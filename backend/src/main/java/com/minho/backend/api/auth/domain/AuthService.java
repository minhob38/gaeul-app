package com.minho.backend.api.auth.domain;

import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.mapper.AuthDomainMapper;
import com.minho.backend.exception.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final AuthPersistenceAdapter userPersistenceAdapter;
  private final AuthDomainMapper authDomainMapper;

  public AuthInfo.SignupInfo signup(AuthCommand.SignupCommand command) throws AuthException {
    User user = command.toEntity();
    System.out.println("@@@ 1");
    System.out.println(user);

    if (this.userPersistenceAdapter.findUserByEmail(user.getEmail()).isPresent()) {
      throw new AuthException("user already exists");
    }

    User createdUser = this.userPersistenceAdapter.createUser(user);

    return this.authDomainMapper.toInfo(createdUser);
  }
}
