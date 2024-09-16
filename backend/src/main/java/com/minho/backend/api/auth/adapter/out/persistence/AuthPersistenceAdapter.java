package com.minho.backend.api.auth.adapter.out.persistence;

import com.minho.backend.api.auth.domain.entity.User;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AuthPersistenceAdapter {

  private final UserJpaRepository userRepository;
  private final AuthPersistenceMapper authPersistenceMapper;

  public Optional<User> findUserByEmail(String email) {
    UserJpaEntity userJpaEntity = this.userRepository.findUserJpaEntityByEmail(email);
    User user = this.authPersistenceMapper.toEntity(userJpaEntity);
    return Optional.ofNullable(user);
  }

  public User createUser(UserJpaEntity userJpaEntity) {
    UserJpaEntity savedUserJpaEntity = this.userRepository.save(userJpaEntity);
    System.out.println(savedUserJpaEntity);
    User user = this.authPersistenceMapper.toEntity(savedUserJpaEntity);
    System.out.println(user);
    return user;
  }
}
