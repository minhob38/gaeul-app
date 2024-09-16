package com.minho.backend.api.auth.domain;

import com.minho.backend.api.auth.adapter.out.persistence.AuthPersistenceAdapter;
import com.minho.backend.api.auth.adapter.out.persistence.UserJpaEntity;
import com.minho.backend.api.auth.domain.dto.AuthCommand;
import com.minho.backend.api.auth.domain.dto.AuthInfo;
import com.minho.backend.api.auth.domain.entity.User;
import com.minho.backend.api.auth.domain.mapper.AuthDomainMapper;
import com.minho.backend.exception.AuthException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final AuthPersistenceAdapter userPersistenceAdapter;
  private final AuthDomainMapper authDomainMapper;

  public AuthInfo.SignupInfo signup(AuthCommand.SignupCommand command) throws AuthException {
    String email = command.getEmail();
    String password = command.getPassword();
    Optional<User> user = this.userPersistenceAdapter.findUserByEmail(email);

    if (user.isPresent()) {
      throw new AuthException("user already exists");
    }

    UserJpaEntity userJpaEntity = this.authDomainMapper.toJpaEntity(command);
    User createdUser = this.userPersistenceAdapter.createUser(userJpaEntity);

    Long userId = createdUser.getId();

    return new AuthInfo.SignupInfo(userId);
  }
}
